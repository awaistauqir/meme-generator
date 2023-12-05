import React, { useEffect } from 'react';
import RegisterForm from '../Components/RegisterForm';
import { selectUser } from '../features/counter/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
const RegisterPage = () => {
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate('/', { replace: true });
		}
	}, [user]);

	return (
		<div className="flex w-full h-screen">
			<div className="w-1/2 bg-[url('/public/login-bg.jpg')] bg-center h-full">
				/
			</div>
			<div className="w-1/2">
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
