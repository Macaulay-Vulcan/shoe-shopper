import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../store/users";

const Users = () => {
	const { users } = useSelector((state) => state);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
		setLoading(false);
	}, []);

	if (loading)
		return (
			<div>
				<h3 className="users-title">Loading</h3>
			</div>
		);
	return (
		<div className="users-container">
			{users.map((user) => (
				<div key={user.id} className="user-tile">
					<h4>Username: {user.username}</h4>
					<p>User ID: {user.id}</p>
					<p>Email: {user.email}</p>
					<p>Address: {user.address}</p>
					<p className="user-tile-bottom">
					<Link to={`/users/${user.id}`}>
						<button>See Details</button>
					</Link>
					</p>
					<hr />
				</div>
			))}
		</div>
	);
};

export default Users;
