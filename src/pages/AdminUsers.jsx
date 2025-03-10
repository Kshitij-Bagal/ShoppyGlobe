import React, { useState, useEffect } from 'react';
import '../styles/AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          throw new Error(data.message || 'Failed to fetch users');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCurrentUser(data);
        } else {
          throw new Error(data.message || 'Failed to fetch current user');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
    fetchCurrentUser();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete user');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleModifyRole = (user) => {
    if (currentUser?.username !== 'admin@123') {
      alert('You do not have permission to modify user roles. Please contact the super admin (admin@123).');
      return;
    }

    const newRole = prompt(`Enter new role for ${user.firstName} ${user.lastName}:`);
    if (!newRole) return;

    updateRole(user._id, newRole);
  };

  const updateRole = async (id, newRole) => {
    try {
        const response = await fetch(`http://localhost:8000/api/users/${id}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ role: newRole }),
        });

        if (response.ok) {
            setUsers((prev) =>
                prev.map((user) => (user._id === id ? { ...user, role: newRole } : user))
            );
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to update role');
        }
    } catch (err) {
        setError(err.message);
    }
};


  return (
    <div className="admin-users">
      <h2>Manage Users</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="user-list">
        <h3>User List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  <button onClick={() => handleModifyRole(user)}>Modify Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
