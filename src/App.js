// import logo from "./logo.svg";
import { ColorSchemeProvider, MantineProvider, Paper } from "@mantine/core";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllVendorsPage from "./components/allVendorsPage/AllVendorsPage";
import AllVenuesPage from "./components/allVenuesPage/AllVenuesPage";
import CustomerCardEditor from "./components/customerCardEditor/CustomerCardEditor";
import ShahrukhsDevTest from "./components/devTestFolder/ShahrukhsDevTest";
import LandingPageMain from "./components/landingPage/LandingPageMain";
import BottomNavbar from "./components/navigation/bottomNavbar/BottomNavbar";
import CustomerBookings from "./components/navigation/sideNavbar/bookings/CustomerBookings";
import TopNavbar from "./components/navigation/topNavbar/TopNavbar";
import NewBookingFile from "./components/NewBookingFile/NewBookingFile";
import NewVendorBookingFile from "./components/NewVendorBooking/NewVendorBooking";
import SpecificVendorBusinessDetails from "./components/SpecificVendorBusinessDetails/SpecificVendorBusinessDetails";
import SpecificVenueDetails from "./components/SpecificVenueDetails/SpecificVenueDetails";
import SignIn from "./components/userProfiling/SignIn";
import SignUp from "./components/userProfiling/SignUp";

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
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/venueBooking/:eventType/:date/:time/:guests/:venueId"
              element={<NewBookingFile />}
            />
            <Route
              path="/updatevendorBooking/:eventType/:date/:time/:guests/:venueId/:subVenueId/:bookingId"
              element={<NewBookingFile />}
            />
            <Route
              path="/vendorBooking/:eventType/:date/:time/:vendorId"
              element={<NewVendorBookingFile />}
            />
            <Route path="/" element={<LandingPageMain />} />
            <Route path="/cardEditor" element={<CustomerCardEditor />} />
            <Route path="/allVendors" element={<AllVendorsPage />} />
            <Route path="/allVenues" element={<AllVenuesPage />} />
            <Route path="/allVenues/:date" element={<AllVenuesPage />} />
            <Route path="/allVenues/:date/:time" element={<AllVenuesPage />} />
            <Route
              path="/allVenues/:date/:time/:city"
              element={<AllVenuesPage />}
            />
            <Route path="/allVenues//:time/:city" element={<AllVenuesPage />} />
            <Route path="/allVenues/:date//:city" element={<AllVenuesPage />} />
            <Route path="/allVenues/:date/:time/" element={<AllVenuesPage />} />
            <Route path="/allVenues/:date//" element={<AllVenuesPage />} />
            <Route path="/allVenues//:time" element={<AllVenuesPage />} />

            <Route path="/allVenues///:city" element={<AllVenuesPage />} />
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
            <Route path="/shahrukhTest" element={<ShahrukhsDevTest />}>
              <Route path="bookings" element={<CustomerBookings />} />
            </Route>
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
