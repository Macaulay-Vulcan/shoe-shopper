import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchUsers } from "../store/users";
import { me } from "../store";

const Users = () => {
	const { auth, users } = useSelector((state) => state);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(fetchUsers());
		setLoading(false);
	}, []);

  if (loading) return <div><h3 className="users-title">Loading</h3></div>;
  return (
    <div>
      <h3 className="users-title">USERS</h3>
      <div className="users-container">
        {users.map((user) => (
          <div key={user.id} className="user-tile">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <p>{user.address}</p>
            <p>{user.phone}</p>
            <p>{user.birthday}</p>
            <Link to={`/users/${user.id}`}>
              <p>
                <button>See Details</button>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
