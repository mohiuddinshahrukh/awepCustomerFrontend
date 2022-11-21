// import logo from "./logo.svg";
import { ColorSchemeProvider, MantineProvider, Paper } from "@mantine/core";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPageMain from "./components/landingPage/LandingPageMain";
import BottomNavbar from "./components/navigation/bottomNavbar/BottomNavbar";
import TopNavbar from "./components/navigation/topNavbar/TopNavbar";
import SpecificVendorBusinessDetails from "./components/SpecificVendorBusinessDetails/SpecificVendorBusinessDetails";
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
            <Route
              path="/specificVendor"
              element={<SpecificVendorBusinessDetails />}
            />
            <Route path="/" element={<LandingPageMain />} />
            <Route path="/allVenues" element={<></>} />
          </Routes>
        </Paper>
        <BottomNavbar />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
