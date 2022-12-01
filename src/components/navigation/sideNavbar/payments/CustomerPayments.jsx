import { Tabs } from "@mantine/core";
import {
  IconBrandStripe,
  IconBuildingFortress,
  IconBuildingStore,
} from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import MakePaymentScreen from "./MakePaymentScreen";
import VendorPayments from "./VendorPayments";
import VenuePayments from "./VenuePayments";

const fetchAllVenuePayments = async () => {
  try {
    const apiResponse = await axios({
      method: "get",
      url: "https://a-wep.herokuapp.com/customer/getMyPayments",
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log("API RESPONSE: ", apiResponse.data);

    if (apiResponse.data.status === "success") {
      console.log(
        "@Successfully fetched all venue payemnts:",
        apiResponse.data.data
      );
      return apiResponse.data.data;
    } else if (apiResponse.data.status === "error") {
      console.log("Error while fetching all venues");
    } else {
      console.log("Failed to fetch all venues, dont know this error");
    }
  } catch (e) {
    console.log("ERROR in fetching all venues:", e);
  }
};
const CustomerPayments = () => {
  const [venueBookings, setVenueBookings] = useState([]);
  const [visible, setVisible] = useState(true);
  // <CustomeLoadingOverlay visible={visible} />
  // FETCH ALL VENUES
  useEffect(() => {
    fetchAllVenuePayments().then(setVenueBookings).then(setVisible(false));
  }, []);
  return (
    <Tabs
      mt={"lg"}
      defaultValue="subvenuePayments"
      variant="default"
      style={{
        width: "100%",
      }}
    >
      <Tabs.List>
        <Tabs.Tab
          value="subvenuePayments"
          icon={<IconBuildingFortress size={14} />}
        >
          Sub Venue Payments
        </Tabs.Tab>
        <Tabs.Tab value="vendorPayments" icon={<IconBuildingStore size={14} />}>
          Vendor Payments
        </Tabs.Tab>
        {/*        <Tabs.Tab value="makePayment" icon={<IconBrandStripe size={14} />}>
          Make Payment
        </Tabs.Tab>*/}
      </Tabs.List>

      <Tabs.Panel value="subvenuePayments" pt="xs">
        <VenuePayments venueBookings={venueBookings.subVenueBookingPayments} />
      </Tabs.Panel>

      <Tabs.Panel value="vendorPayments" pt="xs">
        <VendorPayments vendorBookings={venueBookings.vendorPayments} />
      </Tabs.Panel>
      {/*      <Tabs.Panel value="makePayment" pt="xs">
        <MakePaymentScreen />
      </Tabs.Panel>*/}
    </Tabs>
  );
};

export default CustomerPayments;
