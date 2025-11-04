import React, { useState, useEffect } from "react";

function App() {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (selectedUser) {
    return (
      <div>
        <button
          onClick={() => {
            setSelectedUser(null);
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
                setLoading(true); // ✅ Set loading before fetching details
                fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
                  .then((res) => res.json())
                  .then((data) => {
                    setSelectedUser(data);
                    setLoading(false);
                  });
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


