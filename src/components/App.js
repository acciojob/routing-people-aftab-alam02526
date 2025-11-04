import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => { 
          setUsers(data);
          setLoading(false);
        }, 1000);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (selectedUser) {
    return (
      <div className="user-details">
        <button onClick={() => setSelectedUser(null)}>Back</button>
        <h1>{selectedUser.name}</h1>
        <p><strong>Email:</strong> {selectedUser.email}</p>
        <p><strong>Phone:</strong> {selectedUser.phone}</p>
        <p><strong>Website:</strong> {selectedUser.website}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {/* Cypress expects <a> elements */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedUser(user);
              }}
            >
              {user.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


