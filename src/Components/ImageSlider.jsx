import React from 'react';

const ImageSlider = ({ images, selected, handleSelectImage }) => {
	return (
		<div className="w-full overflow-scroll flex space-x-2 py-4">
			{images?.map((image) => {
				const selectedStyle =
					selected === image.id ? 'border border-green-400' : '';
				return (
					<img
						key={image.id}
						src={image.url}
						alt={image.name && 'Not found'}
						className={`object-contain h-[60px] ${selectedStyle}`}
						onClick={() => {
							handleSelectImage(image);
						}}
					/>
				);
			})}
		</div>
	);
};

export default ImageSlider;
