
import React from "react";
import './../styles/App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "../components/UserList";
import UserDetails from "../components/UserDetails";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>User Profiles</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
