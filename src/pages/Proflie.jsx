import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';
import { changeName, selectUser } from '../features/counter/userSlice';
import { BsPencil, BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlinePassword } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getAuth, updateProfile, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const Proflie = () => {
	const [updateName, setUpdateName] = useState(false);
	const [fullName, setFullName] = useState('');
	const [passwordState, setPasswrodState] = useState('');
	const dispatch = useDispatch();

	const handleUpdateName = () => {
		setUpdateName(!updateName);
	};
	const updateFullName = async () => {
		if (fullName.length === 0) {
			window.alert("Name can't be empty!");
			return;
		}
		const auth = getAuth();
		updateProfile(auth.currentUser, {
			displayName: fullName,
		})
			.then(() => {
				dispatch(dispatch(changeName(auth.currentUser.displayName)));
				setUpdateName(false);
				setFullName('');
				window.alert('Name update Successfully');
			})
			.catch((error) => {
				window.alert(error.message);
			});
	};

	const handleUpdatePassword = async () => {
		const auth = getAuth();

		const user = auth.currentUser;

		updatePassword(user, passwordState)
			.then(() => {
				// Update successful.
				setPasswrodState('');
				window.alert('Password Updated successfully');
			})
			.catch((error) => {
				window.alert(error.message);
			});
	};
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate('/');
		}
	}, []);
	if (!user) {
		return <></>;
	}
	return (
		<div>
			<Navbar />
			<div className="max-w-7xl mx-auto px-2 py-3 space-y-4">
				<h2 className="text-2xl font-semibold">Update Profile</h2>
				<div className=" max-w-4xl space-y-4">
					<div className="flex flex-grow justify-between">
						<div className="flex items-center space-x-4">
							<span>
								<BsFillPersonFill className="profile__icon" />
							</span>
							{!updateName && (
								<span className="text-lg font-semibold">
									{user?.displayName}
								</span>
							)}
							{updateName && (
								<div className="flex space-x-4">
									<input
										type="text"
										className="meme_text__input w-80
                                    "
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
									/>
									<button
										className="profile__icon rounded-full"
										onClick={updateFullName}
									>
										Update
									</button>
								</div>
							)}
						</div>
						<button
							className="profile__icon rounded-full"
							onClick={handleUpdateName}
						>
							{updateName ? <AiOutlineClose /> : <BsPencil />}
						</button>
					</div>
					<div className="flex flex-grow justify-between">
						<div className="flex items-center space-x-4">
							<span>
								<MdOutlinePassword className="profile__icon" />
							</span>

							<input
								type="password"
								className="meme_text__input w-80"
								value={passwordState}
								onChange={(e) => setPasswrodState(e.target.value)}
							/>
						</div>
						<button
							className="profile__icon rounded-full"
							onClick={handleUpdatePassword}
						>
							Update
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Proflie;
