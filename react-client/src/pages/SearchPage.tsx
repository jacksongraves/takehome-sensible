import React, { useState } from "react";
import Header from "components/Header";
import { Container, Stack, Typography } from "@mui/material";
import { MainContainer } from "./searchPageStyles";
import SearchLocations from "components/SearchLocations";
import LocationResult from "components/LocationResult";

import { IPlace } from "express-server-nearby-places";
const SearchPage = (): JSX.Element => {
	const [results, setResults] = useState<IPlace[]>([]);

	return (
		<>
			<Header />
			<Container maxWidth="sm">
				<MainContainer>
					<SearchLocations setResults={setResults} />
					<Stack spacing={2} margin={2}>
						{results.length ? (
							results.map((result: IPlace, index: number) => (
								<LocationResult key={index} {...result} />
							))
						) : (
							<Typography variant="h4">No Locations Found</Typography>
						)}
					</Stack>
				</MainContainer>
			</Container>
		</>
	);
};

export default SearchPage;
