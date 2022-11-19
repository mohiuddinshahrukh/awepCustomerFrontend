// import logo from "./logo.svg";
import { ColorSchemeProvider, MantineProvider, Paper } from "@mantine/core";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNavbar from "./components/navigation/topNavbar/TopNavbar";
import SpecificVenueDetails from "./components/SpecificVenueDetails/SpecificVenueDetails";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Paper className="App">
          <TopNavbar />
          <Routes>
            <Route path="/specificVenue" element={<SpecificVenueDetails />} />
          </Routes>
        </Paper>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
