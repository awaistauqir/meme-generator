import React, { useEffect } from 'react';
import LoginForm from '../Components/LoginForm';
import { selectUser } from '../features/counter/userSlice';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	// useEffect(() => {
	// 	if (user) {
	// 		navigate('/', { replace: true });
	// 	}
	// }, [user]);
	return (
		<div className="flex h-screen">
			<div className="w-1/2 bg-[url('/public/login-bg.jpg')] bg-center">/</div>
			<div className="w-1/2">
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
