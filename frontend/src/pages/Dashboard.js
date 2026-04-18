import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStats(res.data);
      })
      .catch(() => {
        alert("Unauthorized ❌");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Dashboard 📊</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Total Users</h5>
            <h3>{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Active Users</h5>
            <h3>{stats.activeUsers}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;