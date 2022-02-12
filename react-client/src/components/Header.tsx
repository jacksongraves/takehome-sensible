import React from "react";
import { Box, Typography } from "@mui/material";
import { HeaderBar } from "./headerStyles";
import { IProps } from "Header";

const Header = ({}: IProps): JSX.Element => (
	<Box sx={{ flexGrow: 1 }}>
		<HeaderBar position="static">
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				Take Home Assessment for Sensible
			</Typography>
		</HeaderBar>
	</Box>
);

export default Header;
