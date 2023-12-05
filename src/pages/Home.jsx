import React, { useState, useEffect, useRef } from 'react';
import { FiDownload, FiSave } from 'react-icons/fi';
import { GoLinkExternal } from 'react-icons/go';
import { CompactPicker } from 'react-color';
import ImageSlider from '../Components/ImageSlider';
import { toJpeg } from 'html-to-image';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Navbar from '../Components/Navbar';
import uniqid from 'uniqid';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
	changeBottomColor,
	changeBottomText,
	changeBottomXPosition,
	changeBottomYPosition,
	changeleftColor,
	changeLeftText,
	changeLeftXPosition,
	changeLeftYPosition,
	changeRightColor,
	changeRightText,
	changeRightXPosition,
	changeRightYPosition,
	changeTopColor,
	changeTopText,
	changeTopXPosition,
	changeTopYPosition,
	resetMeme,
} from '../features/counter/memeSlice';
import ChakraSlider from '../Components/ui/ChakraSlider';
import { selectUser } from '../features/counter/userSlice';
import { db } from '../firebase';
import BackdropLoader from '../Components/ui/BackdropLoader';

const Home = () => {
	const dispatch = useDispatch();
	const meme = useSelector((state) => state.meme);
	const user = useSelector(selectUser);
	const [images, setImages] = useState([]);
	const [libraryImage, setLibraryImage] = useState(null);
	const [pcImage, setPcImage] = useState(null);
	const [selectFromLibrary, setSelectFromLibrary] = useState(false);
	const [selecFromPC, setSelectFromPC] = useState(false);
	const [loading, setLoading] = useState(false);

	const memeRef = useRef();

	const handleSelectImage = (memeImage) => {
		setLibraryImage(memeImage);
	};
	const handleLibrary = () => {
		setSelectFromPC(false);
		setSelectFromLibrary(true);
		setPcImage(null);
	};
	const handlePC = () => {
		setSelectFromPC(true);
		setSelectFromLibrary(false);
		setLibraryImage(null);
	};
	const handlePCImageChange = (e) => {
		const [file] = e.target.files;
		setPcImage(URL.createObjectURL(file));
	};

	const handleDownloadImage = async () => {
		toJpeg(memeRef.current, { quality: 0.95 }).then(function (dataUrl) {
			console.log(dataUrl);
			const link = document.createElement('a');
			link.download = 'my-image-name.jpeg';
			link.href = dataUrl;
			link.click();
		});
	};

	const handleViewImage = async () => {
		toJpeg(memeRef.current, { quality: 0.95 }).then(function (dataUrl) {
			const newTab = window.open();
			setTimeout(function () {
				newTab.document.body.innerHTML = `<img src='${dataUrl}'>`;
			}, 500);
		});
	};
	const handlaUpload = async () => {
		setLoading(true);
		function dataURLtoBlob(dataurl) {
			let arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], { type: mime });
		}
		toJpeg(memeRef.current, { quality: 0.95 }).then(function (dataUrl) {
			const storage = getStorage();
			const memeId = `${uniqid()}.jpeg`;
			const storageRef = ref(storage, `images/${memeId}`);

			const uploadTask = uploadBytesResumable(
				storageRef,
				dataURLtoBlob(dataUrl)
			);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
				},
				(error) => {
					window.alert(error);
					setLoading(false);
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) => {
							console.log('File available at', downloadURL);
							return downloadURL;
						})
						.then((url) => {
							setDoc(doc(db, 'memes', memeId), {
								uid: user.uid,
								memeId,
								memeURL: url,
								timeStamp: serverTimestamp(),
							});
							dispatch(resetMeme);
							setLoading(false);
							window.alert('Meme  Uploaded Successfully!');
						})
						.catch((error) => {
							setLoading(false);
							window.alert(error);
						});
				}
			);
		});
	};

	useEffect(() => {
		const getImage = async () => {
			setLoading(true);
			const response = await fetch('https://api.imgflip.com/get_memes');
			const data = await response.json();
			setImages(data.data.memes);
			setLoading(false);
		};
		getImage();
	}, []);

	return (
		<div>
			<Navbar />
			{loading && <BackdropLoader />}
			<div className="max-w-7xl mx-auto py-4 px-2 flex h-screen space-x-5 relative">
				<div className="w-[60%] space-y-4">
					<div className="flex space-x-4">
						<button className="home_page__button" onClick={handleLibrary}>
							Select from Library
						</button>
						<button className="home_page__button" onClick={handlePC}>
							Select from PC
						</button>
					</div>
					{selectFromLibrary && (
						<>
							<ImageSlider
								images={images}
								handleSelectImage={handleSelectImage}
							/>
						</>
					)}
					{selecFromPC && (
						<>
							<input
								type="file"
								id="img"
								name="img"
								accept="image/*"
								className="image__input"
								onChange={handlePCImageChange}
							/>
						</>
					)}
					{(libraryImage || pcImage) && (
						<>
							<div className="relative py-4 overflow-hidden" ref={memeRef}>
								<span
									className="meme__Text"
									style={{
										color: `${meme.top.color}`,
										top: `${meme.top.y}%`,
										left: `${meme.top.x}%`,
									}}
								>
									{meme.top.text}
								</span>
								<span
									className="meme__Text"
									style={{
										color: `${meme.bottom.color}`,
										top: `${meme.bottom.y}%`,
										left: `${meme.bottom.x}%`,
									}}
								>
									{meme.bottom.text}
								</span>
								<span
									className="meme__Text"
									style={{
										color: `${meme.left.color}`,
										top: `${meme.left.y}%`,
										left: `${meme.left.x}%`,
									}}
								>
									{meme.left.text}
								</span>
								<span
									className="meme__Text"
									style={{
										color: `${meme.right.color}`,
										top: `${meme.right.y}%`,
										left: `${meme.right.x}%`,
									}}
								>
									{meme.right.text}
								</span>
								<img
									src={libraryImage?.url || pcImage || null}
									alt={libraryImage?.name || 'meme'}
									className="w-full object-contain"
								/>
							</div>
						</>
					)}
				</div>
				<div className="w-[40%] space-y-3">
					{(pcImage || libraryImage) && (
						<>
							<div className="space-y-3">
								<h1 className="text-2xl font-semibold text-slate-600-500">
									Add Text to image
								</h1>
								<input
									type="text"
									name="top"
									className="meme_text__input"
									placeholder="Top Text"
									onChange={(e) => {
										dispatch(changeTopText(e.target.value));
									}}
									value={meme.top.text}
								/>
								<CompactPicker
									color={meme.top.color}
									onChange={(event, color) => {
										dispatch(changeTopColor(event.hex));
									}}
								/>
								<div>
									<p>x-axis</p>
									<ChakraSlider
										value={meme.top.x}
										onChange={(event, value) => {
											dispatch(changeTopXPosition(value));
										}}
									/>
									<p>y-axis</p>
									<ChakraSlider
										value={meme.top.y}
										onChange={(event, value) => {
											dispatch(changeTopYPosition(value));
										}}
									/>
								</div>

								<input
									type="text"
									name="bottom"
									className="meme_text__input"
									placeholder="Bottom Text"
									onChange={(e) => {
										dispatch(changeBottomText(e.target.value));
									}}
									value={meme.bottom.text}
								/>
								<CompactPicker
									color={meme.bottom.color}
									onChange={(event, color) => {
										dispatch(changeBottomColor(event.hex));
									}}
								/>
								<div>
									<p>x-axis</p>
									<ChakraSlider
										value={meme.bottom.x}
										onChange={(event, value) => {
											dispatch(changeBottomXPosition(value));
										}}
									/>
									<p>y-axis</p>
									<ChakraSlider
										value={meme.bottom.y}
										onChange={(event, value) => {
											dispatch(changeBottomYPosition(value));
										}}
									/>
								</div>
								<input
									type="text"
									name="left"
									className="meme_text__input"
									placeholder="Left Text"
									onChange={(e) => {
										dispatch(changeLeftText(e.target.value));
									}}
									value={meme.left.text}
								/>
								<CompactPicker
									color={meme.left.text}
									onChange={(event, color) => {
										dispatch(changeleftColor(event.hex));
									}}
								/>
								<div>
									<p>x-axis</p>
									<ChakraSlider
										value={meme.left.x}
										onChange={(event, value) => {
											dispatch(changeLeftXPosition(value));
										}}
									/>
									<p>y-axis</p>
									<ChakraSlider
										value={meme.left.y}
										onChange={(event, value) => {
											dispatch(changeLeftYPosition(value));
										}}
									/>
								</div>
								<input
									type="text"
									name="right"
									className="meme_text__input"
									placeholder="Right Text"
									onChange={(e) => {
										dispatch(changeRightText(e.target.value));
									}}
									value={meme.right.text}
								/>
								<CompactPicker
									color={meme.right.color}
									onChange={(event, color) => {
										dispatch(changeRightColor(event.hex));
									}}
								/>
								<div>
									<p>x-axis</p>
									<ChakraSlider
										value={meme.right.x}
										onChange={(event, value) => {
											dispatch(changeRightXPosition(value));
										}}
									/>
									<p>y-axis</p>
									<ChakraSlider
										value={meme.right.y}
										onChange={(event, value) => {
											dispatch(changeRightYPosition(value));
										}}
									/>
								</div>
							</div>
							<div className="space-x-4 float-right flex mb-5">
								<button
									className="home_page__button"
									onClick={handleDownloadImage}
								>
									<FiDownload />
									<span>Download</span>
								</button>
								<button className="home_page__button" onClick={handlaUpload}>
									<FiSave />
									<span>Save to Account</span>
								</button>
								<button className="home_page__button" onClick={handleViewImage}>
									<GoLinkExternal />
									<span>View</span>
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
