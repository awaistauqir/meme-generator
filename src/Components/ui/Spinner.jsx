import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
const Spinner = () => {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<ClipLoader color="#e22123" loading={true} size={50} />
		</div>
	);
};

export default Spinner;
