import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { login, logout, selectUser } from './features/counter/userSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Components/ui/Spinner';
import MemesPage from './pages/MemesPage';
import Proflie from './pages/Proflie';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const authentication = async () => {
			setLoading(true);
			const auth = getAuth();
			auth.onAuthStateChanged((userAuth) => {
				console.log('use effect ran');
				if (userAuth) {
					dispatch(
						login({
							email: userAuth.email,
							uid: userAuth.uid,
							displayName: userAuth.displayName,
						})
					);
					setLoading(false);
				} else {
					dispatch(logout());
					setLoading(false);
				}
			});
		};
		authentication();
	}, []);
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<Routes>
						<Route path="/" element={user ? <Home /> : <Login />}></Route>
						{/* <Route path="/login" element={<Login />} /> */}
						<Route path="/signup" element={<RegisterPage />} />
						<Route path="/memes" element={<MemesPage />} />
						<Route path="/profile" element={<Proflie />} />
					</Routes>
				</>
			)}
		</>
	);
}

export default App;
