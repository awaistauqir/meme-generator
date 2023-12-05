import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
			console.log(state.user);
		},
		logout: (state) => {
			state.user = null;
		},
		changeEmail: (state, action) => {
			if (!state.user) {
				return;
			}
			state.user.email = action.payload;
		},
		changeName: (state, action) => {
			if (!state.user) {
				return;
			}
			state.user.displayName = action.payload;
		},
	},
});

export const selectUser = (state) => state.user.user;
export const { login, logout, changeEmail, changeName } = userSlice.actions;

export default userSlice.reducer;
