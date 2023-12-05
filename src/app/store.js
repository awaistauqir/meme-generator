import { configureStore } from '@reduxjs/toolkit';
import memeSlice from '../features/counter/memeSlice';
import userSlice from '../features/counter/userSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		meme: memeSlice,
	},
});
