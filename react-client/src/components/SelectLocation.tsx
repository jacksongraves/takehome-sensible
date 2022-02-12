import React, { useState } from "react";
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	Slider,
	TextField,
	Typography,
} from "@mui/material";
import locations from "constants/locations";
import { searchNearbyPlacesAPI } from "api/expressServerAPI";

const SelectLocation = (): JSX.Element => {
	const [locationIndex, setLocationIndex] = useState<number>(0);
	const [keyword, setKeyword] = useState<string>("");
	const [km, setKm] = useState(10);

	const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocationIndex(Number(event.target.value));
	};

	const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	const handleChangeKm = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === "number") {
			setKm(newValue);
		}
	};
	const updateSearch = async () => {
		try {
			const { results } = await searchNearbyPlacesAPI({
				latitude: locations[locationIndex].latitude,
				longitude: locations[locationIndex].longitude,
				keyword,
				radius: km * 1000,
			});

			console.log(results);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Grid>
			<Typography variant="h4">Select a Location</Typography>
			<FormControl>
				<FormLabel>Select a Location</FormLabel>
				<RadioGroup
					defaultValue="female"
					value={locationIndex}
					name="radio-buttons-group"
					onChange={handleChangeLocation}
				>
					{locations.map(({ name, latitude, longitude }, index) => (
						<FormControlLabel key={index} value={index} control={<Radio />} label={name} />
					))}
				</RadioGroup>
			</FormControl>

			<TextField
				label="Keyword"
				value={keyword}
				onChange={handleChangeKeyword}
				fullWidth
				variant="outlined"
			/>

			<Slider
				defaultValue={10}
				min={1}
				max={50}
				value={km}
				onChange={handleChangeKm}
				aria-label="Default"
				valueLabelDisplay="auto"
			/>
			<Button variant="contained" onClick={updateSearch}>
				Search
			</Button>
		</Grid>
	);
};

export default SelectLocation;
