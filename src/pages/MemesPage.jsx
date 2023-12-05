import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import BackdropLoader from '../Components/ui/BackdropLoader';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { useNavigate } from 'react-router-dom';
import MemeItem from '../Components/MemeItem';
const MemesPage = () => {
	const [loading, setLoading] = useState(true);
	const [memes, setMemes] = useState([]);
	const user = useSelector(selectUser);
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate('/', { replace: true });
		}

		const getMemes = async function () {
			onSnapshot(
				query(
					collection(db, 'memes'),
					// where('uid', '==', user.uid),
					orderBy('timeStamp', 'desc')
				),
				(snapShot) => {
					// console.log(snapShot.docs);
					const fetchedMemes = snapShot.docs.map((doc) => {
						return {
							...doc.data(),
						};
					});
					console.log(fetchedMemes);
					setMemes(fetchedMemes.filter((meme) => meme.uid === user.uid));
					console.log(fetchedMemes.filter((meme) => meme.uid === user.uid));

					setLoading(false);
				}
			);
			console.log(memes);
		};
		getMemes();
		setLoading(false);
	}, []);

	if (!user) {
		return <></>;
	}

	return (
		<div>
			<Navbar />
			{loading && <BackdropLoader />}
			{/* <BackdropLoader /> */}
			<div className="max-w-7xl px-2 py-4 mx-auto">
				<div className="space-y-4">
					<h1 className="text-3xl text-slate-700">Created Memes</h1>
					<div className="flex flex-col">
						{memes.map(({ memeId, memeURL, timeStamp }) => {
							return (
								<MemeItem
									key={memeId}
									memeId={memeId}
									timeStamp={timeStamp}
									memeURL={memeURL}
									setLoading={setLoading}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MemesPage;
