import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  style from  "./ViewUser.module.css";
function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
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
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className={style.h1}>User Details</h1>
      <table className={style.table}>
        <tbody >
          <tr className={style.tr}>
            <td  className={style.td}>ID:</td>
            <td className={style.td}>{user._id}</td>
          </tr>
          <tr className={style.tr}>
            <td  className={style.td}>Name:</td>
            <td  className={style.td}>{user.name}</td>
          </tr>
          <tr className={style.tr}>
            <td className={style.td}>Email:</td>
            <td  className={style.td}>{user.email}</td>
          </tr>
          <tr className={style.tr}>
            <td  className={style.td}>Phone:</td>
            <td  className={style.td}>{user.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewUser;
