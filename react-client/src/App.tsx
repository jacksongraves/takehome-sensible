import React from "react";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import SearchPage from "pages/SearchPage";

function App() {
	const theme = createTheme({});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SearchPage />
		</ThemeProvider>
	);
}

export default App;
