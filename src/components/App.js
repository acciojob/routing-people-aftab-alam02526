import React, { useEffect, useState } from "react";

function App() {
  const [page, setPage] = useState("list");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (page === "details" && selectedUser) {
    return (
      <div className="user-details">
        <button onClick={() => setPage("list")}>⬅ Back</button>
        <h2>{selectedUser.name}</h2>
        <p><strong>Email:</strong> {selectedUser.email}</p>
        <p><strong>Phone:</strong> {selectedUser.phone}</p>
        <p><strong>Website:</strong> {selectedUser.website}</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h1>User Profiles</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => {
                setSelectedUser(user);
                setPage("details");
              }}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

