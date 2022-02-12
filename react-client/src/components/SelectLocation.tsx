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
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import locations from "constants/locations";
import { searchNearbyPlacesAPI } from "api/expressServerAPI";

/** Manages state for search parameters, interrogates the API, and displays the results */
const SelectLocation = (): JSX.Element => {
	/** index in the preset locations array */
	const [locationIndex, setLocationIndex] = useState<number | null>(0);

	/** universal latitude, this is what is sent to the API */
	const [latitude, setLatitude] = useState<number | null>(locations[0].latitude);

	/** universal longitude, this is what is sent to the API */
	const [longitude, setLongitude] = useState<number | null>(locations[0].longitude);

	/** user defined alternative latitude to override a preset location */
	const [altLatitude, setAltLatitude] = useState<number | null>(null);

	/** user defined alternative longitude to override a preset location */
	const [altLongitude, setAltLongitude] = useState<number | null>(null);

	/** Required search keyword that is sent to the API */
	const [keyword, setKeyword] = useState<string>("");

	/** Required search radius, in km, which is cast to meters and sent to the API */
	const [km, setKm] = useState(10);

	/** Controlled handler for radio button for location index */
	const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocationIndex(Number(event.target.value));
		setLatitude(locations[Number(event.target.value)].latitude);
		setLongitude(locations[Number(event.target.value)].longitude);
	};

	/** Controlled handler for keyword search */
	const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	/** An alternate latitude should override any radio latitudes if they apply */
	const handleChangeAltLatitude = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			setAltLatitude(null);
			setLatitude(null);
			if (altLongitude === null) {
				setLatitude(locationIndex !== null ? locations[locationIndex].latitude : null);
				setLongitude(locationIndex !== null ? locations[locationIndex].longitude : null);
			}
		} else {
			setAltLatitude(Number(event.target.value));
			setLatitude(Number(event.target.value));
			if (altLongitude === null) {
				setLongitude(null);
			}
		}
	};

	/** An alternate longitude should override any radio longitudes if they apply */
	const handleChangeAltLongitude = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			setAltLongitude(null);
			setLongitude(null);
			if (altLatitude === null) {
				setLatitude(locationIndex !== null ? locations[locationIndex].latitude : null);
				setLongitude(locationIndex !== null ? locations[locationIndex].longitude : null);
			}
		} else {
			setAltLongitude(Number(event.target.value));
			setLongitude(Number(event.target.value));
			if (altLatitude === null) {
				setLatitude(null);
			}
		}
	};

	/** Controlled handler for search radius slider */
	const handleChangeKm = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === "number") {
			setKm(newValue);
		}
	};

	/** Helper method to retrieve API results */
	const updateSearch = async () => {
		try {
			if (typeof latitude === "number" && typeof longitude === "number") {
				const { results } = await searchNearbyPlacesAPI({
					latitude,
					longitude,
					keyword,
					radius: km * 1000,
				});

				console.log(results);
			} else {
				throw Error("Latitude and longitude must be numeric");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Stack spacing={4}>
			<Typography variant="h4">Search for Nearby Places</Typography>
			<FormControl>
				<FormLabel>Select a Location</FormLabel>
				<RadioGroup value={locationIndex} onChange={handleChangeLocation}>
					{locations.map(({ name }, index) => (
						<FormControlLabel
							key={index}
							value={index}
							control={<Radio disabled={altLatitude !== null || altLongitude !== null} />}
							label={name}
						/>
					))}
				</RadioGroup>
			</FormControl>

			<FormControl>
				<FormLabel>...Or Specify Coordinates</FormLabel>
				<Grid
					container
					direction="row"
					justifyContent="space-evenly"
					alignItems="stretch"
					spacing={2}
				>
					<Grid item xs={6}>
						<TextField
							label="Latitude"
							value={altLatitude ? altLatitude : ""}
							onChange={handleChangeAltLatitude}
							fullWidth
							variant="filled"
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Longitude"
							value={altLongitude ? altLongitude : ""}
							onChange={handleChangeAltLongitude}
							fullWidth
							variant="filled"
						/>
					</Grid>
				</Grid>
			</FormControl>

			<FormControl>
				<FormLabel>Enter a Search Term</FormLabel>
				<TextField
					label="Keyword"
					value={keyword ? keyword : ""}
					onChange={handleChangeKeyword}
					fullWidth
					required
					variant="filled"
				/>
			</FormControl>

			<FormControl>
				<FormLabel>Set the Search Radius (km)</FormLabel>
				<Slider
					defaultValue={10}
					min={1}
					max={50}
					value={km}
					onChange={handleChangeKm}
					aria-label="Default"
					valueLabelDisplay="auto"
				/>
			</FormControl>

			<Button
				variant="contained"
				disabled={
					!(!!keyword.length && typeof latitude === "number" && typeof longitude === "number")
				}
				onClick={updateSearch}
			>
				Search
			</Button>
		</Stack>
	);
};

export default SelectLocation;
