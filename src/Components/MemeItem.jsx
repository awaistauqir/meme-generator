import React from 'react';
import { db } from '../firebase';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';

const MemeItem = (props) => {
	const handleDownload = async (url, name = 'download', type = 'jpeg') => {
		const link = document.createElement('a');
		link.style = 'position: fixed; left -10000px;';
		link.href = url;
		link.download = `${name}.${type}`;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	const handleDelete = async () => {
		if (window.confirm('Do you want to delete this meme?') === true) {
			props.setLoading(true);
			const storage = getStorage();

			// Create a reference to the file to delete
			const imageRef = ref(storage, `images/${props.memeId}`);

			// Delete the file

			deleteObject(imageRef)
				.then(() => {
					deleteDoc(doc(db, 'memes', props.memeId));
					props.setLoading(false);
					window.alert('Meme Deleted Successfully!');
				})
				.catch((error) => {
					console.log(error);
					props.setLoading(false);
				});
		}
	};
	return (
		<div className="border border-gray-500 p-4 rounded-lg my-3 max-w-fit">
			<div className=" space-y-4">
				<div className="space-x-4 flex">
					<button
						className="home_page__button"
						onClick={() => {
							handleDownload(props.memeURL);
						}}
					>
						download
					</button>
					<button className="home_page__button" onClick={handleDelete}>
						Delete
					</button>
				</div>
				<img
					src={props.memeURL}
					alt={props.memeID}
					className="object-contain"
					width={'500px'}
				/>
				<div className="text-md text-gray-500"></div>
			</div>
		</div>
	);
};

export default MemeItem;
