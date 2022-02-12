import React from "react";
import Header from "components/Header";
import { Container } from "@mui/material";
import { MainContainer } from "./searchPageStyles";
import SelectLocation from "components/SelectLocation";

const SearchPage = (): JSX.Element => {
	return (
		<>
			<Header />
			<Container maxWidth="sm">
				<MainContainer>
					<SelectLocation />
				</MainContainer>
			</Container>
		</>
	);
};

export default SearchPage;
