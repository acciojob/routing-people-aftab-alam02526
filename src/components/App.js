import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user list on mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // ✅ Always render Loading when loading === true
  if (loading) {
    return <div>Loading...</div>;
  }

  // User details view
  if (selectedUser) {
    return (
      <div>
        <button
          onClick={() => {
            setLoading(true);
            // simulate loading when going back
            setTimeout(() => {
              setSelectedUser(null);
              setLoading(false);
            }, 100);
          }}
        >
          Back
        </button>

        <p>Username: {selectedUser.username}</p>
        <p>Name: {selectedUser.name}</p>
        <p>Email: {selectedUser.email}</p>
        <p>Phone: {selectedUser.phone}</p>
        <p>Website: {selectedUser.website}</p>
      </div>
    );
  }

  // Default user list view
  return (
    <div className="app">
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <a
              href={`/users/${user.id}`}
              onClick={(e) => {
                e.preventDefault();
                // ✅ setLoading and force re-render before fetching
                setLoading(true);
                setTimeout(() => {
                  fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
                    .then((res) => res.json())
                    .then((data) => {
                      setSelectedUser(data);
                      setLoading(false);
                    });
                }, 100);
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



