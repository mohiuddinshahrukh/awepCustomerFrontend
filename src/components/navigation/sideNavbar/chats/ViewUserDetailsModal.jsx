import {
  ActionIcon,
  Avatar,
  Button,
  HoverCard,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
// import { IconCheck } from "@material-ui/icons";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons";
const ViewUserDetailsModal = ({ userDetails, opened1, setOpened1 }) => {
  const matches1200 = useMediaQuery("(min-width: 1200px)");

  return (
    <div>
      <Modal
        styles={{
          close: {
            color: "black",
            backgroundColor: "#EAEAEA",
            borderRadius: "50%",
            "&:hover": {
              transition: "50ms",
              color: "white",
              backgroundColor: "red",
            },
          },
        }}
        title={<Title>User Details</Title>}
        opened={opened1}
        onClose={() => setOpened1(false)}
        // variant="transparent"
        size={matches1200 ? "xl" : "md"}
        radius="md"
        centered
        shadow={0}
        padding="xl"
      >
        <Avatar
          src={userDetails?.profileImage}
          size={300}
          radius="lg"
          mx="auto"
        />
        <Text align="center" size={25} weight={500} mt="md">
          {userDetails?.name}
        </Text>
        <Text size={20} weight={500} align="center" color="dimmed">
          {userDetails?.userType === "customer"
            ? "Customer"
            : userDetails?.userType === "vendor"
            ? "Vendor"
            : userDetails?.userType === "venueOwner"
            ? "Venue Owner"
            : "Super Admin"}
        </Text>
        <Text size={20} align="center">
          Member Since{" "}
          {userDetails?.createdAt
            ? userDetails?.createdAt.split("T")[0]
            : "N/A"}
        </Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {userDetails?.isEmailVerified ? (
            <HoverCard closeDelay={10} shadow="md">
              <HoverCard.Target>
                <ActionIcon size="md" color="green">
                  <IconCheck />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="md" color="green">
                  Verified Email
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          ) : (
            <HoverCard closeDelay={10} shadow="md">
              <HoverCard.Target>
                <ActionIcon size="md" color="red">
                  <IconCheck />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size="md" color="red">
                  Unverified Email
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          )}
          <a href={"mailto:" + userDetails?.email} target="_blank">
            {userDetails?.email}
          </a>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {userDetails?.isPhoneVerified ? (
            <HoverCard closeDelay={10} shadow="md">
              <HoverCard.Target>
                <ActionIcon color="green">
                  <IconCheck />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text size={25} color="green">
                  Verified Phone
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          ) : (
            <HoverCard closeDelay={10} shadow="md">
              <HoverCard.Target>
                <ActionIcon color="red">
                  <IconCheck />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text color="red" size="sm">
                  Unverified Phone
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          )}
          {userDetails?.phone}
        </div>
        <Text align="center">
          {userDetails?.isEnabled ? (
            <Button size="md" compact color="green" ml="md">
              Active
            </Button>
          ) : (
            <Button size="md" compact color="red" ml="md">
              Blocked
            </Button>
          )}{" "}
        </Text>
      </Modal>
    </div>
  );
};

export default ViewUserDetailsModal;
