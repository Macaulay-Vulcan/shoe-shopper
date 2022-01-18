import axios from "axios";
const TOKEN = 'token';

const SET_USERS = "SET_USERS";

const setUsers = (users) => ({ type: SET_USERS, users });

export const fetchUsers = () => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		return async (dispatch) => {
			try {
				const { data: users } = await axios.get("/api/users", {
					headers: {
						authorization: token,
					},
				});
				dispatch(setUsers(users));
			} catch (error) {
				console.log(error);
			}
		};
	}
};

export default (state = [], action) => {
	switch (action.type) {
		case SET_USERS:
			return action.users;
		default:
			return state;
	}
}
