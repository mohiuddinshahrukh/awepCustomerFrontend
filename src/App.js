// import logo from "./logo.svg";
import { ColorSchemeProvider, MantineProvider, Paper } from "@mantine/core";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllVendorsPage from "./components/allVendorsPage/AllVendorsPage";
import AllVenuesPage from "./components/allVenuesPage/AllVenuesPage";
import CustomerCardEditor from "./components/customerCardEditor/CustomerCardEditor";
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
            <Route path="/" element={<LandingPageMain />} />
            <Route path="/cardEditor" element={<CustomerCardEditor />} />
            <Route path="/allVendors" element={<AllVendorsPage />} />
            <Route path="/allVenues" element={<AllVenuesPage />} />
            <Route
              path="/specificVendor"
              element={<SpecificVendorBusinessDetails />}
            />
            <Route
              path="/specificVendor:id"
              element={<SpecificVendorBusinessDetails />}
            />
            <Route
              path="/specificVenue:id"
              element={<SpecificVenueDetails />}
            />
            {/* <Route
                path="/venueBooking/:eventType/:date/:time/:guests/:venueId"
                element={<NewBookingFile />}
              /> */}
          </Routes>
        </Paper>
        <BottomNavbar />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
