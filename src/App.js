// import logo from "./logo.svg";
import { ColorSchemeProvider, MantineProvider, Paper } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddReview from "./components/AddReview/AddReview";
import AllVendorsPage from "./components/allVendorsPage/AllVendorsPage";
import AllVenuesPage from "./components/allVenuesPage/AllVenuesPage";
import InvalidRoutePage from "./components/brokenRoutesAndPages/404Page/InvalidRoutePage";
import CustomerCardEditor from "./components/customerCardEditor/CustomerCardEditor";
import CustomerDashboard from "./components/customerDashbaord/CustomerDashboard";
// import ShahrukhsDevTest from "./components/devTestFolder/ShahrukhsDevTest";
import LandingPageMain from "./components/landingPage/LandingPageMain";
import BottomNavbar from "./components/navigation/bottomNavbar/BottomNavbar";
import CustomerBookings from "./components/navigation/sideNavbar/bookings/CustomerBookings";
import ChatScreen from "./components/navigation/sideNavbar/chats/ChatScreen";
import Complaints from "./components/navigation/sideNavbar/complaints/Complaints";
import CustomerProfile from "./components/navigation/sideNavbar/customerProfile/CustomerProfile";
import CustomerPayments from "./components/navigation/sideNavbar/payments/CustomerPayments";
import TopNavbar from "./components/navigation/topNavbar/TopNavbar";
import NewBookingFile from "./components/NewBookingFile/NewBookingFile";
import NewVendorBookingFile from "./components/NewVendorBooking/NewVendorBooking";
import SpecificVendorBusinessDetails from "./components/SpecificVendorBusinessDetails/SpecificVendorBusinessDetails";
import SpecificVenueDetails from "./components/SpecificVenueDetails/SpecificVenueDetails";
import SignIn from "./components/userProfiling/SignIn";
import SignUp from "./components/userProfiling/SignUp";
import {
  socket,
  socketContext as SocketContext,
} from "./components/Socket/Socket";
import Feedbacks from "./components/navigation/sideNavbar/feedbacks/Feedbacks";
import ContactUs from "./components/contactUs/ContactUs.jsx";
import AboutUs from "./components/aboutUs/AboutUs";
import FiveCardsSkeleton from "./components/skeletons/SixCardsSkeleton";
import CustomerBookingWEddingCards from "./components/navigation/sideNavbar/customerBookingWeddingCards/CustomerBookingWeddingCards";
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
        theme={{
          colorScheme,
          fontFamily: "Poppins, sans-serif",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <SocketContext.Provider value={socket}>
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
                  path="/updateVenueBooking/:eventType/:date/:time/:guests/:venueId/:subVenueId/:bookingId"
                  element={<NewBookingFile />}
                />
                <Route
                  path="/updateVendorBooking/:eventType/:date/:time/:vendorId/:vendorPackageId/:bookingId"
                  element={<NewVendorBookingFile />}
                />
                <Route
                  path="/addreview/:provider/:bookingId"
                  element={<AddReview />}
                />
                <Route
                  path="/updateReview/:provider/:feedbackId"
                  element={<AddReview />}
                />

                <Route
                  path="/vendorBooking/:eventType/:date/:time/:vendorId"
                  element={<NewVendorBookingFile />}
                />
                <Route path="/" element={<LandingPageMain />} />
                <Route path="/cardEditor" element={<CustomerCardEditor />} />
                <Route path="/allVendors" element={<AllVendorsPage />} />
                {/* <Route path="/allVenues/date/:date" element={<AllVenuesPage />} /> */}
                {/* <Route path="/allVenues/date/:date/time/:time" element={<AllVenuesPage />} /> */}
                <Route path="/allVenues" element={<AllVenuesPage />} />
                <Route
                  path="/allVenues/date/:date/time/:time/city/:city"
                  element={<AllVenuesPage />}
                />
                <Route
                  path="/allVenues/time/:time/city/:city"
                  element={<AllVenuesPage />}
                />
                <Route
                  path="/allVenues/date/:date/city/:city"
                  element={<AllVenuesPage />}
                />
                <Route
                  path="/allVenues/date/:date/time/:time"
                  element={<AllVenuesPage />}
                />
                <Route
                  path="/allVenues/date/:date"
                  element={<AllVenuesPage />}
                />
                <Route
                  path="/allVenues/time/:time"
                  element={<AllVenuesPage />}
                />
                <Route
                  path="/allVenues/city/:city"
                  element={<AllVenuesPage />}
                />
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

                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/skeletontest" element={<FiveCardsSkeleton />} />

                <Route path="/dashboard" element={<CustomerDashboard />}>
                  <Route path="bookings" element={<CustomerBookings />} />
                  <Route path="chats" element={<ChatScreen />} />
                  <Route
                    path="weddingCards"
                    element={<CustomerBookingWEddingCards />}
                  />
                  <Route path="complaints" element={<Complaints />} />
                  <Route path="feedbacks" element={<Feedbacks />} />
                  <Route path="payments" element={<CustomerPayments />} />
                  {/*<Route path="FAQsAndHelp" element={<>FAQ & HELP</>} />
             <Route path="invite" element={<>INVITE</>} />*/}
                  <Route path="profile" element={<CustomerProfile />} />
                </Route>
                {/* <Route
                path="/venueBooking/:eventType/:date/:time/:guests/:venueId"
                element={<NewBookingFile />}
              /> */}
                <Route path="*" element={<InvalidRoutePage />} />
              </Routes>
            </Paper>
            <BottomNavbar />
          </SocketContext.Provider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
