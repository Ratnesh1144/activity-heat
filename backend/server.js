const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Activity = require("./models/activity");

require("dotenv").config();

const app = express();

app.use(express.json());


app.use(cors());
app.use(express.json());

app.get("/api/activities", async (req, res) => {
    try {
        const activities = await Activity.find();

        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch activities" });
    }
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error.message);
    });

    app.post("/api/activities", async (req, res) => {
    try {
       const activity = new Activity({
    name: req.body.name,
    color: req.body.color
});
        await activity.save();

        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: "Failed to create activity" });
    }
});

app.get("/api/activities", async (req, res) => {
    try {
        const activities = await Activity.find();

        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch activities" });
    }
});

app.put("/api/activities/:id", async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(
            req.params.id,
            {
                days: req.body.days
            },
            { new: true }
        );

        res.json(activity);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update activity"
        });
    }
});
app.delete("/api/activities/:id", async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);

        res.json({
            message: "Activity deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete activity"
        });
    }
});