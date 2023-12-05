import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Alert from './ui/Alert';
import { login } from '../features/counter/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = (data) => {
		console.log(data);
		const { email, password } = data;
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const { email, uid, displayName } = userCredential.user;
				dispatch(
					login({
						displayName,
						email,
						uid,
					})
				);
				navigate('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				window.alert(errorCode, errorMessage);
			});
	};
	return (
		<div className="flex flex-col p-12">
			<div className="flex flex-col space-y-5">
				<h2 className="text-4xl font-semibold">Login</h2>
				<p className="text-base text-neutral-400 font-normal">
					Login with the data you entered during your registration.
				</p>
			</div>
			<div className="mt-14">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
					<div className="flex flex-col mb-6">
						<label
							htmlFor="email"
							className="text-slate-800 font-semibold text-base mb-3"
						>
							Email
						</label>
						<input
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
							type="text"
							className="border border-slate-400 rounded-lg outline-none h-12 p-2 placeholder:text-slate-400 placeholder:text-base focus:border-blue-600"
							placeholder="john.doe@gmail.com"
							name="email"
							required
						/>
						{errors.email && <Alert message={errors?.email?.message} />}
					</div>
					<div className="flex flex-col mb-6">
						<label
							htmlFor="password"
							className="text-slate-800 font-semibold text-base mb-3"
						>
							Password
						</label>
						<input
							{...register('password', {
								required: { value: true, message: 'Please enter psasword.' },
							})}
							type="password"
							className="border border-slate-400 rounded-lg outline-none h-12 p-2 placeholder:text-slate-400 placeholder:text-base focus:border-blue-600"
							placeholder="*********"
							name="password"
						/>
						{errors.password && <Alert message={errors?.password?.message} />}
					</div>
					<button
						className="bg-blue-600 text-white py-4 w-full rounded-md hover:bg-blue-700 active:scale-105 transition duration-150 ease-out"
						type="submit"
					>
						Log in
					</button>
					<button className="text-neutral-600 self-end py-4 hover:underline">
						Did you forget your password?
					</button>
				</form>
			</div>
			<div className="border border-slate-400 rounded-md py-6 px-4 flex flex-col gap-6">
				<div className="space-y-2">
					<h3 className="text-2xl">Sign up</h3>
					<p className="font-normal text-neutral-600">
						Sign up by registering your account.
					</p>
				</div>
				<Link to={'/signup'}>
					<button className="bg-violet-100 text-blue-600 w-full py-2 self-center px-2 rounded-md hover:bg-violet-200 active:scale-105 transition duration-150 ease-out">
						Create Account
					</button>
				</Link>
			</div>
		</div>
	);
};

export default LoginForm;
