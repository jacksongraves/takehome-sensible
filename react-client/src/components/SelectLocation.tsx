import React, { useState } from "react";
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import locations from "constants/locations";
import { searchNearbyPlacesAPI } from "api/expressServerAPI";

const SelectLocation = (): JSX.Element => {
	const [locationIndex, setLocationIndex] = useState<number>(0);
	const [keyword, setKeyword] = useState<string>("");

	const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocationIndex(Number(event.target.value));
	};

	const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	const updateSearch = async () => {
		try {
			const nearbyPlaces = await searchNearbyPlacesAPI({
				latitude: locations[locationIndex].latitude,
				longitude: locations[locationIndex].longitude,
				keyword,
			});

			console.log(nearbyPlaces);
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

			<Button variant="contained" onClick={updateSearch}>
				Search
			</Button>
		</Grid>
	);
};

export default SelectLocation;
