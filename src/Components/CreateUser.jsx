import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateUser.css'; // Import the CSS file for styling

function CreateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:4000/users/${id}`);
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            throw new Error('Failed to fetch user');
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `http://localhost:4000/users/${id}` : 'http://localhost:4000/users/createuser'; // Update the URL based on your backend endpoint
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        navigate('/');
      } else {
        throw new Error(id ? 'Failed to update user' : 'Failed to create user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-user-container">
      <div className="card">
        <h1 className="form-title">{id ? 'Edit User' : 'Add User'}</h1>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={user.name} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={user.email} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" value={user.phone} onChange={handleChange} className="form-input" />
          </div>
          <button type="submit" className="submit-button">
            {id ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
