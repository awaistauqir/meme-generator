import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
const BackdropLoader = () => {
	return (
		<>
			<div className="h-screen w-screen flex justify-center items-center bg-black/50 fixed z-50 top-0 left-0 right-0 bottom-0">
				<div className="z-index-1 flex justify-center items-center">
					<ClipLoader color="#e22123" loading={true} size={50} />
				</div>
			</div>
		</>
	);
};

export default BackdropLoader;
