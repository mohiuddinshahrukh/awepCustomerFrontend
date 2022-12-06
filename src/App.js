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
import TopNavbarStrip from "./components/navigation/topNavbarStrip/TopNavbarStrip";
import VenueComplaints from "./components/navigation/sideNavbar/complaints/VenueComplaints";
import VendorComplaints from "./components/navigation/sideNavbar/complaints/VendorComplaints";
import CustomerVenueBookings from "./components/navigation/sideNavbar/bookings/CustomerVenueBookings";
import CustomerVendorBookings from "./components/navigation/sideNavbar/bookings/CustomerVendorBookings";
import VenuePayments from "./components/navigation/sideNavbar/payments/VenuePayments";
import VendorPayments from "./components/navigation/sideNavbar/payments/VendorPayments";
import VendorFeedbacks from "./components/navigation/sideNavbar/feedbacks/VendorFeedbacks";
import VenueFeedbacks from "./components/navigation/sideNavbar/feedbacks/VenueFeedbacks";
import AddComplaint from "./components/AddComplaint/AddComplaint";
function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const [signedIn, setSignedIn] = useState(false);
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  //

  //
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          components: {
            Text: {
              styles: {
                root: {},
              },
            },
          },
          // fontSize: "var(--mantine-font-size-md-1)",
          colorScheme,
          fontFamily: "Poppins, sans-serif",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <SocketContext.Provider value={socket}>
            <Paper className="App">
              <TopNavbarStrip />
              <TopNavbar signedIn={signedIn} setSignedIn={setSignedIn} />
              <Routes>
                <Route
                  path="/signIn"
                  element={
                    <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
                  }
                />
                <Route path="/signUp" element={<SignUp />} />
                <Route
                  path="/venueBooking/:eventType/:date/:time/:guests/:venueId"
                  element={<NewBookingFile />}
                />
                <Route
                  path="/venueBooking/:date/:time/:venueId"
                  element={<NewBookingFile />}
                />
                <Route
                  path="/venueBooking/:date/:venueId"
                  element={<NewBookingFile />}
                />
                <Route
                  path="/venueBooking/:time/:venueId"
                  element={<NewBookingFile />}
                />
                <Route
                  path="/venueBooking/:venueId"
                  element={<NewBookingFile />}
                />
                <Route
                  path="/updateVenueBooking/:eventType/:date/:time/:guests/:venueId/:subVenueId/:bookingId"
                  element={<NewBookingFile />}
                />

                <Route
                  path="/vendorBooking/:eventType/:date/:time/:guests/:vendorId"
                  element={<NewVendorBookingFile />}
                />
                <Route
                  path="/vendorBooking/:date/:time/:vendorId"
                  element={<NewVendorBookingFile />}
                />
                <Route
                  path="/vendorBooking/:date/:vendorId"
                  element={<NewVendorBookingFile />}
                />
                <Route
                  path="/vendorBooking/:time/:vendorId"
                  element={<NewVendorBookingFile />}
                />
                <Route
                  path="/vendorBooking/:vendorId"
                  element={<NewVendorBookingFile />}
                />

                <Route
                  path="/updateVendorBooking/:eventType/:date/:time/:vendorId/:vendorPackageId/:bookingId"
                  element={<NewVendorBookingFile />}
                />
                <Route
                  path="/addreview/:provider/:bookingId"
                  element={<AddReview />}
                />
                <Route path="/addreview/:provider" element={<AddReview />} />
                <Route
                  path="/updateReview/:provider/:feedbackId"
                  element={<AddReview />}
                />
                <Route
                  path="/addcomplaint/:provider/:bookingId"
                  element={<AddComplaint />}
                />
                <Route
                  path="/addcomplaint/:provider"
                  element={<AddComplaint />}
                />
                <Route
                  path="/updatecomplaint/:provider/:complaintId"
                  element={<AddComplaint />}
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
                  path="/allVendors/date/:date/time/:time/city/:city"
                  element={<AllVendorsPage />}
                />
                <Route
                  path="/allVendors/time/:time/city/:city"
                  element={<AllVendorsPage />}
                />
                <Route
                  path="/allVendors/date/:date/city/:city"
                  element={<AllVendorsPage />}
                />
                <Route
                  path="/allVendors/date/:date/time/:time"
                  element={<AllVendorsPage />}
                />
                <Route
                  path="/allVendors/date/:date"
                  element={<AllVendorsPage />}
                />
                <Route
                  path="/allVendors/time/:time"
                  element={<AllVendorsPage />}
                />
                <Route
                  path="/allVendors/city/:city"
                  element={<AllVendorsPage />}
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
                  path="/specificVenue/:id"
                  element={<SpecificVenueDetails />}
                />
                <Route
                  path="/specificVenue/:id/:time"
                  element={<SpecificVenueDetails />}
                />

                <Route
                  path="/specificVenue/:id/:date/:time"
                  element={<SpecificVenueDetails />}
                />

                <Route
                  path="/specificVenue/:id/:date"
                  element={<SpecificVenueDetails />}
                />

                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/skeletontest" element={<FiveCardsSkeleton />} />

                <Route path="/dashboard" element={<CustomerDashboard />}>
                  <Route
                    path="venueBookings"
                    element={<CustomerVenueBookings />}
                  />
                  <Route
                    path="vendorBookings"
                    element={<CustomerVendorBookings />}
                  />
                  <Route path="chats" element={<ChatScreen />} />
                  <Route
                    path="weddingCards"
                    element={<CustomerBookingWEddingCards />}
                  />
                  {/* <Route path="complaints" element={<Complaints />} /> */}
                  <Route path="venueComplaints" element={<VenueComplaints />} />
                  <Route
                    path="vendorComplaints"
                    element={<VendorComplaints />}
                  />
                  <Route path="vendorFeedbacks" element={<VendorFeedbacks />} />
                  <Route path="venueFeedbacks" element={<VenueFeedbacks />} />
                  <Route path="venuePayments" element={<VenuePayments />} />
                  <Route path="vendorPayments" element={<VendorPayments />} />
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
