import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { BiUserCircle } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { login } from '../features/counter/userSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Alert from './ui/Alert';
import { db } from '../firebase';

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const navigate = useNavigate();

	const dispatch = useDispatch();

	useEffect(() => {});

	const onSubmit = async (data) => {
		console.log('clicked');
		console.log(data);
		if (Object.keys(errors).length !== 0) {
			return;
		}
		const auth = getAuth();
		const { email, password, fullName, phone } = data;
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.then(() => {
				updateProfile(auth.currentUser, { displayName: fullName });
			})
			.then(() => {
				// setDoc(doc(db, 'users', auth.currentUser.uid), {
				// 	memes: [],
				// });
				return auth.currentUser;
			})
			.then((user) => {
				setTimeout(() => {
					console.log(user.displayName);
					dispatch(
						login({
							displayName: user.displayName,
							email: user.email,
							uid: user.uid,
						})
					);
					navigate('/');
				}, 500);
			})

			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				window.alert(errorMessage, errorCode);
			});
	};

	return (
		<div className="flex flex-col space-y-6 w-full h-full justify-center px-20">
			<h1 className="text-teal-900 text-3xl font-semibold">Create Account</h1>
			<form
				className="flex flex-col space-y-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="border border-teal-900/50 rounded-md flex py-2 px-1">
					<span className="text-2xl flex content-center mr-3 text-teal-900/50">
						<BiUserCircle />
					</span>
					<input
						className="flex-grow outline-none"
						type="text"
						name="fullname"
						placeholder="Full Name"
						{...register('fullName', {
							required: {
								value: true,
								message: 'Please enter your full name',
							},
							pattern: {
								value:
									/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
								message: 'Enter a valid name',
							},
						})}
					/>
					{errors.fullName && <Alert message={errors?.fullName?.message} />}
				</div>
				<div className="border border-teal-900/50 rounded-md flex py-2 px-1">
					<span className="text-2xl flex content-center mr-3 text-teal-900/50">
						<MdAlternateEmail />
					</span>
					<input
						className="flex-grow outline-none"
						type="email"
						name="email"
						placeholder="Email"
						{...register('email', {
							required: {
								value: true,
								message: 'Please enter email',
							},
							pattern: {
								value: emailRegex,
								message: 'Invalid Email Entered',
							},
						})}
					/>
					{errors.email && <Alert message={errors?.email?.message} />}
				</div>

				<div className="border border-teal-900/50 rounded-md flex py-2 px-1">
					<span className="text-2xl flex content-center mr-3 text-teal-900/50">
						<RiLockPasswordFill />
					</span>
					<input
						className="flex-grow outline-none"
						type="password"
						name="password"
						placeholder="Password"
						{...register('password', {
							required: {
								value: true,
								message: 'Please enter password',
							},
							pattern: {
								value: /^.{8,}$/,
								message: 'Password must be 8 characters long atleast.',
							},
						})}
					/>
					{errors.password && <Alert message={errors?.password?.message} />}
				</div>
				<button
					className="text-white py-2 rounded-md bg-emerald-400 active:scale-105 transition duration-150 ease-out hover:bg-emerald-600"
					type="submit"
				>
					Create Account
				</button>
				<p className='text-sm text-slate-400"'>
					Already have an account?{' '}
					<Link to={'/'}>
						<button className="text-emerald-500 hover:underline">Login</button>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default RegisterForm;
