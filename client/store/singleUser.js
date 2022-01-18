import axios from "axios";
const TOKEN = "token";

const SET_SINGLE_USER = "SET_SINGLE_USER";

const setSingleUser = (user) => ({ type: SET_SINGLE_USER, user });

export const fetchSingleUser = (userId) => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		return async (dispatch) => {
			try {
				const { data: user } = await axios.get(`/api/users/${userId}`, {
					headers: {
						authorization: token,
					},
				});
				dispatch(setSingleUser(user));
			} catch (error) {
				console.log(error);
			}
		};
	}
};

export default (state = {}, action) => {
	switch (action.type) {
		case SET_SINGLE_USER:
			return action.user;
		default:
			return state;
	}
};
