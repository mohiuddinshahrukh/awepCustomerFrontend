import { Tabs } from "@mantine/core";
import { IconBuildingFortress, IconBuildingStore } from "@tabler/icons";
import VendorComplaints from "./VendorComplaints";
import VenueComplaints from "./VenueComplaints";

const Complaints = () => {
  // FETCH ALL VENUES

  return (
    <Tabs
      mt={"lg"}
      defaultValue="venueComplaints"
      variant="default"
      style={{
        width: "100%",
      }}
    >
      <Tabs.List>
        <Tabs.Tab
          value="venueComplaints"
          icon={<IconBuildingFortress size={14} />}
        >
          Sub Venue Complaints
        </Tabs.Tab>
        <Tabs.Tab
          value="vendorComplaints"
          icon={<IconBuildingStore size={14} />}
        >
          Vendor Complaints
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="venueComplaints" pt="xs">
        {" "}
        <VenueComplaints />
      </Tabs.Panel>

      <Tabs.Panel value="vendorComplaints" pt="xs">
        <VendorComplaints />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Complaints;
