import { Tabs } from "@mantine/core";
import { IconBuildingFortress, IconBuildingStore } from "@tabler/icons";
import VendorPayments from "./VendorPayments";
import VenuePayments from "./VenuePayments";

const CustomerPayments = () => {
  // FETCH ALL VENUES

  return (
    <Tabs mt={"lg"} defaultValue="subvenuePayments" variant="default">
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
      </Tabs.List>

      <Tabs.Panel value="subvenuePayments" pt="xs">
        <VenuePayments />
      </Tabs.Panel>

      <Tabs.Panel value="vendorPayments" pt="xs">
        <VendorPayments />
      </Tabs.Panel>
    </Tabs>
  );
};

export default CustomerPayments;
