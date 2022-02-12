import React from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { IProps } from "LocationResult";
/** Displays a location result in a cleanly formatted grid */
const LocationResult = ({ name, vicinity, formatted_address, rating }: IProps): JSX.Element => {
	return (
		<Paper>
			<Grid
				container
				direction="row"
				justifyContent="space-between"
				alignItems="stretch"
				padding={1}
				spacing={1}
			>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<Typography variant="h5">{name}</Typography>
						<Typography variant="subtitle2">
							{vicinity || formatted_address || "Address Unavailable"}
						</Typography>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={1}>
						<Typography variant="h6">Rating</Typography>
						<Typography variant="subtitle2">{rating} Stars</Typography>
					</Stack>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default LocationResult;
