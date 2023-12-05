import React from 'react';

const Alert = ({ message }) => {
	return (
		<div
			role="alert"
			className="fixed top-7 left-1/2 translate-x-[-50%] w-1/4 left-"
		>
			<div
				className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<span className="block sm:inline">{message}</span>
			</div>
		</div>
	);
};

export default Alert;
