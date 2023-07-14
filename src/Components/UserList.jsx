// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function UserList() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/users/alluser');
//         const usersData = response.data;
//         setUsers(usersData); // Set the state with the retrieved users
//       } catch (error) {
//         // Handle error
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h1>User List</h1>
//       <Link to="/add">Add User</Link>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>Actions</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UserList;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserList.css'; // Import the CSS file for styling

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/users/alluser');
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted user from the list
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error(error);
      // Handle the error here (e.g., display an error message to the user)
    }
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <Link to="/add-user" className="add-user-button">
        Add User
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/* <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <Link to={`users/${user.id}`} className="action-link">
                  View
                </Link>
                <Link to={`/edit-user/${user.id}`} className="action-link">
                  Edit
                </Link>
                <button onClick={() => deleteUser(user.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td> {/* Display the correct property for the user ID */}
              <td>{user.name}</td>
              <td> <Link to={`users/${user._id}`} className="action-link">
                View
              </Link></td>
              <td> <Link to={`/${user._id}`} className="action-link">
                Edit
              </Link></td>
              <td> <button onClick={() => deleteUser(user._id)} className="delete-button">
                Delete
              </button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

