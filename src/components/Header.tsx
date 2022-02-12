import React from "react";
import { Box, Typography } from "@mui/material";
import { HeaderBar } from "./headerStyles";

const Header = (): JSX.Element => (
	<Box sx={{ flexGrow: 1 }}>
		<HeaderBar position="static">
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				Take Home Assessment for Sensible
			</Typography>
		</HeaderBar>
	</Box>
);

export default Header;
