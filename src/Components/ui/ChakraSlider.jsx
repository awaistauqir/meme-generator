import { Slider } from '@mui/material';
import React from 'react';

const ChakraSlider = (props) => {
	return (
		<Slider
			aria-label="Temperature"
			defaultValue={30}
			value={props.value}
			valueLabelDisplay="auto"
			step={5}
			marks
			min={5}
			max={85}
			onChange={props.onChange}
		/>
	);
};

export default ChakraSlider;
