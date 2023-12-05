import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { logout, selectUser } from '../features/counter/userSlice';
import { resetMeme } from '../features/counter/memeSlice';
import { useSelector } from 'react-redux';
const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	const handleLogout = async () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				dispatch(logout());
				dispatch(resetMeme());
				navigate('/');
			})
			.catch((error) => {
				window.alert(error);
			});
	};

	return (
		<nav className="bg-amber-700 text-white ">
			<div className="max-w-7xl px-2 py-3 mx-auto flex justify-between items-center">
				<Link to="/">
					<button className="text-3xl hover:underline">Meme Generator</button>
				</Link>

				<div className="space-x-5 text-lg">
					<Link to="/memes">
						<button className="hover:underline">Memes</button>
					</Link>
					<Link to="/profile">
						<button className="hover:underline">Profile</button>
					</Link>
					<button
						className="hover:underline"
						type="button"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
