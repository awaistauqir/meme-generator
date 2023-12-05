import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	top: {
		text: '',
		color: '#fff',
		x: 5,
		y: 5,
	},
	left: {
		text: '',
		color: '#fff',
		x: 5,
		y: 5,
	},
	right: {
		text: '',
		color: '#fff',
		x: 5,
		y: 5,
	},
	bottom: {
		text: '',
		color: '#fff',
		x: 5,
		y: 5,
	},
};

export const memeSlice = createSlice({
	name: 'meme',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		changeTopColor: (state, action) => {
			state.top.color = action.payload;
		},
		changeBottomColor: (state, action) => {
			state.bottom.color = action.payload;
		},
		changeleftColor: (state, action) => {
			state.left.color = action.payload;
		},

		changeRightColor: (state, action) => {
			state.right.color = action.payload;
		},
		changeTopText: (state, action) => {
			state.top.text = action.payload;
		},
		changeBottomText: (state, action) => {
			state.bottom.text = action.payload;
		},
		changeLeftText: (state, action) => {
			state.left.text = action.payload;
		},
		changeRightText: (state, action) => {
			state.right.text = action.payload;
		},
		changeTopXPosition: (state, action) => {
			state.top.x = action.payload;
		},
		changeTopYPosition: (state, action) => {
			state.top.y = action.payload;
		},
		changeBottomXPosition: (state, action) => {
			state.bottom.x = action.payload;
		},
		changeBottomYPosition: (state, action) => {
			state.bottom.y = action.payload;
		},

		changeLeftXPosition: (state, action) => {
			state.left.x = action.payload;
		},
		changeLeftYPosition: (state, action) => {
			state.left.y = action.payload;
		},
		changeRightXPosition: (state, action) => {
			state.right.x = action.payload;
		},
		changeRightYPosition: (state, action) => {
			state.right.y = action.payload;
		},
		resetMeme: (state) => {
			state = initialState;
		},
	},
});

export const selectMeme = (state) => state.meme;
export const {
	changeTopColor,
	changeBottomColor,
	changeBottomText,
	changeBottomXPosition,
	changeBottomYPosition,
	changeLeftText,
	changeLeftXPosition,
	changeLeftYPosition,
	changeRightColor,
	changeRightText,
	changeRightXPosition,
	changeRightYPosition,
	changeTopText,
	changeTopXPosition,
	changeTopYPosition,
	changeleftColor,
	resetMeme,
} = memeSlice.actions;

export default memeSlice.reducer;
