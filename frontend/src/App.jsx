import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activities, setActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityColor, setActivityColor] = useState("#32d583");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();

  useEffect(() => {
    fetch("http://localhost:5000/api/activities")
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const days = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const todayDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const todayKey = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const isCurrentMonth =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function previousMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  }

  function nextMonth() {
    const next = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );

    const current = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (next > current) {
      return;
    }

    setCurrentMonth(next);
  }

  async function addActivity() {
    if (activityName.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: activityName,
            color: activityColor,
          }),
        }
      );

      const data = await response.json();

      setActivities([...activities, data]);
      setActivityName("");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteActivity(activityId) {
    try {
      await fetch(
        `http://localhost:5000/api/activities/${activityId}`,
        {
          method: "DELETE",
        }
      );

      setActivities(
        activities.filter(
          (activity) => activity._id !== activityId
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleDay(activityId, day) {
    const dateKey = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (
      isCurrentMonth &&
      dateKey > todayKey
    ) {
      return;
    }

    const activity = activities.find(
      (activity) => activity._id === activityId
    );

    if (!activity) {
      return;
    }

    const updatedDays = {
      ...activity.days,
      [dateKey]: !activity.days[dateKey],
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/activities/${activityId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            days: updatedDays,
          }),
        }
      );

      const updatedActivity = await response.json();

      setActivities(
        activities.map((activity) =>
          activity._id === activityId
            ? updatedActivity
            : activity
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  function getTotalDays(activity) {
    let total = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentMonth.getFullYear()}-${String(
        currentMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      if (activity.days[dateKey]) {
        total++;
      }
    }

    return total;
  }

  const allActivitiesCompletedToday =
    isCurrentMonth &&
    activities.length > 0 &&
    activities.every(
      (activity) => activity.days[todayKey]
    );

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          <span className="logo-fire">🔥</span>

          <span>
            Activity
            <span className="logo-highlight">Heat</span>
          </span>
        </div>

        <p>Small steps. Big progress.</p>

      </nav>

      <section className="hero">

        <div className="hero-text">

          <h1>Track Your Activities</h1>

          <h2>Visualize Your Progress</h2>

          <p>
            Add your daily activities and see your consistency
            come to life with a heatmap. Stay motivated,
            track your habits, and build a better you!
          </p>

        </div>

        <div className="add-box">

          <h2>📅 &nbsp; Add Activity</h2>

          <div className="input-row">

            <div className="activity-input">

              <input
                type="text"
                placeholder="Activity name (e.g. LeetCode, Gym, Reading)"
                value={activityName}
                onChange={(e) =>
                  setActivityName(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addActivity();
                  }
                }}
              />

              <input
                type="color"
                value={activityColor}
                onChange={(e) =>
                  setActivityColor(e.target.value)
                }
              />

            </div>

          </div>

          <button onClick={addActivity}>
            + &nbsp; Add Activity
          </button>

        </div>

      </section>

      <section className="activities-container">

        <div className="activities-header">

          <h2>Your Activities</h2>

          <div className="month-selector">

            <button onClick={previousMonth}>
              ‹
            </button>

            <span>{monthName}</span>

            <button
              onClick={nextMonth}
              disabled={isCurrentMonth}
            >
              ›
            </button>

          </div>

        </div>

        <div className="activity-list">

          {activities.map((activity) => (

            <div
              className="activity-info"
              key={activity._id}
            >

              <div
                className="activity-dot"
                style={{
                  backgroundColor: activity.color,
                }}
              ></div>

              <div className="activity-details">

                <div className="activity-name">
                  {activity.name}
                </div>

                <div className="activity-total">
                  Total: {getTotalDays(activity)} days
                </div>

              </div>

              <button
                className="delete-button"
                onClick={() =>
                  deleteActivity(activity._id)
                }
              >
                🗑
              </button>

            </div>

          ))}

        </div>

        {activities.length > 0 ? (

          <>

            <div className="heatmap">

              <div
                className="heatmap-row"
                style={{
                  gridTemplateColumns:
                    `160px repeat(${days.length}, 1fr)`,
                }}
              >

                <div className="activity-label">
                  Activity
                </div>

                {days.map((day) => (

                  <div
                    className="day-number"
                    key={day}
                  >
                    {day}
                  </div>

                ))}

              </div>

              {activities.map((activity) => (

                <div
                  className="heatmap-row"
                  key={activity._id}
                  style={{
                    gridTemplateColumns:
                      `160px repeat(${days.length}, 1fr)`,
                  }}
                >

                  <div className="activity-label activity-row-name">

                    <div
                      className="activity-dot"
                      style={{
                        backgroundColor: activity.color,
                      }}
                    ></div>

                    {activity.name}

                  </div>

                  {days.map((day) => {

                    const dateKey =
                      `${currentMonth.getFullYear()}-${String(
                        currentMonth.getMonth() + 1
                      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                    const isFuture =
                      isCurrentMonth &&
                      dateKey > todayKey;

                    return (
                      <div
                        key={day}
                        className={`heat-cell ${
                          activity.days[dateKey]
                            ? "completed"
                            : "incomplete"
                        } ${
                          dateKey === todayKey &&
                          isCurrentMonth
                            ? "today-cell"
                            : ""
                        } ${
                          isFuture
                            ? "future-cell"
                            : ""
                        }`}
                        title={
                          isFuture
                            ? `${dateKey} - Future date`
                            : `${dateKey} - ${
                                activity.days[dateKey]
                                  ? "Completed"
                                  : "Not completed"
                              }`
                        }
                        onClick={() =>
                          toggleDay(
                            activity._id,
                            day
                          )
                        }
                      ></div>
                    );

                  })}

                </div>

              ))}

            </div>

            <div className="heatmap-legend">

              <div>
                <span className="legend-box completed"></span>
                Completed
              </div>

              <div>
                <span className="legend-box incomplete"></span>
                Not completed
              </div>

            </div>

          </>

        ) : (

          <div className="empty-state">
            <div>📊</div>
            <h3>No activities yet</h3>
            <p>
              Add your first activity above to start
              tracking your progress.
            </p>
          </div>

        )}

        <div className="today">

          <div className="today-icon">
            📅
          </div>

          <div className="today-text">

            <h3>
              Today <span>({todayDate})</span>
            </h3>

            <p>
              {isCurrentMonth
                ? "Your activity status"
                : `Viewing ${monthName}`}
            </p>

          </div>

          {isCurrentMonth ? (

            <>

              <div
                className="today-status"
                style={{
                  background:
                    allActivitiesCompletedToday
                      ? "#079b68"
                      : "#ed3f5c",
                }}
              >

                {allActivitiesCompletedToday ? (
                  <>✓ &nbsp; Completed</>
                ) : (
                  <>✕ &nbsp; Not Completed</>
                )}

              </div>

              <div className="today-message">

                {allActivitiesCompletedToday
                  ? "Great job! You completed all your activities today! 🎉"
                  : "Keep going! Complete your activities for today. 💪"}

              </div>

            </>

          ) : (

            <div className="today-message">
              Today status is available when viewing
              the current month.
            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default App;
