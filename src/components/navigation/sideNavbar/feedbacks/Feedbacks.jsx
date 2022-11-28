import { Tabs } from "@mantine/core";
import { IconBuildingFortress, IconBuildingStore } from "@tabler/icons";
import VendorFeedbacks from "./VendorFeedbacks";
import VenueFeedbacks from "./VenueFeedbacks";

const Feedbacks = () => {
  // FETCH ALL VENUES

  return (
    <Tabs mt={"lg"} defaultValue="venueFeedbacks" variant="default">
      <Tabs.List>
        <Tabs.Tab
          value="venueFeedbacks"
          icon={<IconBuildingFortress size={14} />}
        >
          Sub Venue feedbacks
        </Tabs.Tab>
        <Tabs.Tab
          value="vendorFeedbacks"
          icon={<IconBuildingStore size={14} />}
        >
          Vendor Feedbacks
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="venueFeedbacks" pt="xs">
        {" "}
        {/*<VenueComplaints />*/}
        {/*<VenueFeedbacks />*/}
      </Tabs.Panel>

      <Tabs.Panel value="vendorFeedbacks" pt="xs">
        {/*<VendorComplaints />*/}
        <VendorFeedbacks />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Feedbacks;
