import "./App.css";

function App() {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);

  const colors = [
    "#8b5cf6",
    "#f59e0b",
    "#f43f5e",
    "#10b981",
    "#14b8a6",
    "#6366f1",
  ];

  const activities = [
    {
      name: "Igneak",
      color: "#10b981",
      completedDays: [1, 4, 5],
      total: 3,
      today: true,
    },
    {
      name: "Ikknga",
      color: "#f59e0b",
      completedDays: [5],
      total: 1,
      today: false,
    },
  ];

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-inner">
          <div className="logo-container">
            <div className="logo-icon">🔥</div>

            <div className="logo-text">
              Activity<span>Heat</span>
            </div>
          </div>

          <div className="navbar-actions">
            <div className="keep-going">Keep going!</div>
          </div>
        </div>
      </header>

      <main className="main-container">
        <section className="hero-section">
          <div className="hero-left">
            <div className="hero-content">
              <h1>
                Track Your Activities
                <br />
                <span>Visualize Your Progress</span>
              </h1>

              <p>
                Add your daily activities and see your consistency come to life
                with a heatmap. Stay motivated, track your activities, and build
                a better you!
              </p>

              <div className="feature-pills">
                <div className="feature-pill">
                  <div className="feature-icon purple">↗</div>

                  <span>Track Activities</span>
                </div>

                <div className="feature-pill">
                  <div className="feature-icon amber">⚡</div>

                  <span>Stay Consistent</span>
                </div>

                <div className="feature-pill">
                  <div className="feature-icon rose">✓</div>

                  <span>Achieve Goals</span>
                </div>
              </div>
            </div>
          </div>

          <div className="progress-card">
            <div className="progress-card-header">
              <div className="progress-title">
                <div className="progress-icon">🍽</div>

                <h2>Today's Progress</h2>
              </div>

              <span className="progress-badge">30% Done</span>
            </div>

            <div className="progress-content">
              <div className="progress-gauge">
                <div className="gauge-ring">
                  <div className="gauge-center">
                    <strong>3/10</strong>

                    <span>DONE</span>
                  </div>
                </div>
              </div>

              <div className="progress-stats">
                <div className="stat-box">
                  <p>Completed</p>

                  <strong>3 Activities</strong>
                </div>

                <div className="stat-box">
                  <p>Remaining</p>

                  <strong className="remaining">7 Activities</strong>
                </div>
              </div>
            </div>

            <div className="progress-date">
              <span>Wed</span>

              <strong>Oct 27 2026</strong>
            </div>
          </div>
        </section>

        <section className="activities-section">
          <div className="heatmap-card">
            <div className="heatmap-topbar">
              <div className="streak-badge">
                <span className="streak-fire">🔥</span>

                <span>Streak: 0</span>
              </div>

              <div className="month-selector">
                <button>‹</button>

                <span>October 2026</span>

                <button>›</button>
              </div>
            </div>

            <div className="heatmap-wrapper">
              <div className="heatmap-grid">
                <div className="heatmap-header-row">
                  <div className="heatmap-activity-title">Activity</div>

                  {days.map((day) => (
                    <div className="day-number" key={day}>
                      {day}
                    </div>
                  ))}
                </div>

                <div className="heatmap-rows">
                  {activities.map((activity) => (
                    <div className="heatmap-row" key={activity.name}>
                      <div className="heatmap-activity-name">
                        <span
                          className="activity-dot"
                          style={{
                            backgroundColor: activity.color,
                          }}
                        ></span>

                        <span>{activity.name}</span>
                      </div>

                      {days.map((day) => {
                        const completed = activity.completedDays.includes(day);

                        return (
                          <div
                            key={day}
                            className={
                              completed ? "heat-cell completed" : "heat-cell"
                            }
                            style={
                              completed
                                ? {
                                    backgroundColor: activity.color,
                                  }
                                : {}
                            }
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-section">
            <div className="add-activity-card">
              <div className="add-header">
                <div className="add-title">
                  <div className="add-icon">+</div>

                  <div>
                    <h2>Add Activity</h2>

                    <p>Create new activity</p>
                  </div>
                </div>
              </div>

              <div className="add-form">
                <div className="form-row">
                  <label>Activity Name</label>

                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Activity name (e.g. LeetCode, Gym)"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label>Activity Badge</label>

                  <div className="color-selector">
                    {colors.map((color, index) => (
                      <button
                        key={color}
                        type="button"
                        className={
                          index === 0 ? "color-option selected" : "color-option"
                        }
                        style={{
                          backgroundColor: color,
                        }}
                      ></button>
                    ))}

                    <div className="universal-color-wrapper">
  <input
    type="color"
    className="universal-color-selector"
    value="#7757ff"
  />
</div>
                  </div>
                </div>

                <button className="add-button">
                  <span>+</span>
                  Add Activity
                </button>
              </div>
            </div>

            <div className="your-activities">
              <div className="your-header">
                <h2>Your Activities</h2>
              </div>

              <div className="activity-list">
                {activities.map((activity) => (
                  <div className="activity-card" key={activity.name}>
                    <div className="activity-info">
                      <span
                        className="activity-dot large"
                        style={{
                          backgroundColor: activity.color,
                        }}
                      ></span>

                      <div>
                        <p className="activity-name">{activity.name}</p>

                        <p className="activity-total">
                          Total: {activity.total} days
                        </p>
                      </div>
                    </div>

                    <div className="activity-actions">
                      <button
                        className={
                          activity.today
                            ? "check-button checked"
                            : "check-button"
                        }
                      >
                        {activity.today && "✓"}
                      </button>

                      <button className="delete-button">🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        © 2026 ActivityHeat. Keep your daily consistency burning bright.
      </footer>
    </div>
  );
}

export default App;
