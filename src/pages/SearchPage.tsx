import React from "react";
import Header from "components/Header";
import { Container } from "@mui/material";
import { MainContainer } from "./searchPageStyles";

const SearchPage = (): JSX.Element => {
	return (
		<>
			<Header />
			<Container maxWidth="sm">
				<MainContainer />
			</Container>
		</>
	);
};

export default SearchPage;
