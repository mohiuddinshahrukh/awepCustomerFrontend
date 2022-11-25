import { Tabs } from "@mantine/core";
import { IconBuildingFortress, IconBuildingStore } from "@tabler/icons";
import CustomerVendorBookings from "./CustomerVendorBookings";

import CustomerVenueBookings from "./CustomerVenueBookings";

const CustomerBookings = () => {
  // FETCH ALL VENUES

  return (
    <Tabs mt={"lg"} defaultValue="subvenueBookings" variant="default">
      <Tabs.List>
        <Tabs.Tab
          value="subvenueBookings"
          icon={<IconBuildingFortress size={14} />}
        >
          Sub Venue Bookings
        </Tabs.Tab>
        <Tabs.Tab value="vendorBookings" icon={<IconBuildingStore size={14} />}>
          Vendor Bookings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="subvenueBookings" pt="xs">
        <CustomerVenueBookings />
      </Tabs.Panel>

      <Tabs.Panel value="vendorBookings" pt="xs">
        <CustomerVendorBookings />
      </Tabs.Panel>
    </Tabs>
  );
};

export default CustomerBookings;
