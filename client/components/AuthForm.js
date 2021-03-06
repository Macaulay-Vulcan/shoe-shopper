import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../store";

const AuthForm = ({ name, displayName }) => {
	const { error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => { 
		if (error) error.response = null;
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formName = e.target.name;
		const username = e.target.username.value;
		const password = e.target.password.value;
		if (formName === "login")
			dispatch(authenticate(username, password, formName));
		else {
			const email = e.target.email.value;
			const address = e.target.address.value;
			dispatch(authenticate(username, password, formName, email, address));
		}
	};

	return (
		<div className="auth-container">
			<form onSubmit={handleSubmit} name={name}>
				<div>
					<label htmlFor="username">
						<small>Username</small>
					</label>
					<input name="username" type="text" />
				</div>
				<div>
					<label htmlFor="password">
						<small>Password</small>
					</label>
					<input name="password" type="password" />
				</div>
				{name === "signup" && ( 
						<div>
							<label htmlFor="email">
								<small>Email</small>
							</label>
							<input name="email" type="email" />
						</div>
				)}
				{name === "signup" && (
						<div>
							<label htmlFor="address">
								<small>Address</small>
							</label>
							<input name="address" type="text" />
						</div>
				)}
				<div>
					<button type="submit">{displayName}</button>
				</div>
				{error && error.response && <div> {error.response.data} </div>}
			</form>
		</div>
	);
};

export const Login = <AuthForm name="login" displayName="Login" />;
export const Signup = <AuthForm name="signup" displayName="Sign Up" />;
