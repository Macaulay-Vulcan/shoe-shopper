import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
	const [loading, setLoading] = useState(true);
	const username = useSelector((state) => state.auth.username);

	useEffect(() => {
		setLoading(false);
	});

	if (loading) return <div>Loading...</div>;
	return (
		<div>
			{username ? (
				<h3>Welcome back {username}!</h3>
			) : (
				<h3>Welcome to Shoe Shopper!</h3>
			)}
		</div>
	);
};

export default Home;
