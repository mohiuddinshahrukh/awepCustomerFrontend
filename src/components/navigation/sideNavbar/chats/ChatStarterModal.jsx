import {
  Avatar,
  Box,
  Grid,
  Group,
  Modal,
  Paper,
  ScrollArea,
  SegmentedControl,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ChatStarterModal = ({
  open,
  setOpen,
  chatCreatorMethod,
  setChatStarterModal,
}) => {
  // HOOKS
  const [vendorBusiness, setVendorBusiness] = useState([]);
  const [venues, setVenues] = useState([]);
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("all");

  // GET ALL VENDOR BUSINESSES
  async function getAllVendorBusinesses() {
    try {
      let response = await axios.get(
        "https://a-wep-production.herokuapp.com/superAdmin/getVendorBusiness"
      );
      if (response.data.status === "success") {
        setVendorBusiness(response.data.data);
      }
      console.log("ALL VENDOR BUSINESSSES FETCHED", response.data);
    } catch (e) {
      console.log("TRY CATCH ERROR: ", e);
    }
  }
  // GET ALL VENNUES
  async function getAllVenues() {
    try {
      let response = await axios.get(
        "https://a-wep-production.herokuapp.com/superAdmin/getAllVenues"
      );
      if (response.data.status === "success") {
        // setVendorBusiness(response.data.data);
        setVenues(response.data.data);
      }

      console.log("ALL VENUES FETCHED", response.data);
    } catch (e) {
      console.log("TRY CATCH ERROR: ", e);
    }
  }
  // GET ALL USERS
  async function getAllUsers() {
    try {
      let response = await axios.get(
        "https://a-wep-production.herokuapp.com/superAdmin/getAllUsers"
      );
      if (response.data.status === "success") {
        // setVendorBusiness(response.data.data);
        setUsers(response.data.data);
      }
      console.log("ALL USERS FETCHED", response.data);
    } catch (e) {
      console.log("TRY CATCH ERROR: ", e);
    }
  }

  useEffect(() => {
    getAllVendorBusinesses();
    getAllVenues();
    getAllUsers();
  }, [open]);
  const theme = useMantineTheme();

  return (
    <Modal
      title={<Title>Select A Chat</Title>}
      centered
      size={900}
      opened={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Paper p="lg">
        <Grid>
          <Grid.Col>
            <SegmentedControl
              fullWidth
              size="md"
              color="blue"
              data={[
                { value: "all", label: "All Users" },
                { value: "customer", label: "All Customer" },
                { value: "vendor", label: "All Vendor Businesses" },
                { value: "venueOwner", label: "Venue Owner" },
                { value: "superAdmin", label: "Super Admin" },
              ]}
              value={type}
              onChange={(e) => setType(e)}
            />
          </Grid.Col>
          <Grid.Col>
            {" "}
            <TextInput hidden label="" placeholder="Search..." size="lg" />
          </Grid.Col>
          <Grid.Col>
            <Paper
              p="xl"
              withBorder
              style={{ width: "100%", height: "60vh" }}
              component={ScrollArea}
            >
              {type === "vendor"
                ? vendorBusiness.map((business) => {
                    console.log("VENDOR BUSINESS: ", business);
                    return (
                      <Box
                        key={business._id}
                        sx={(theme) => ({
                          backgroundColor: "skyblue",

                          textAlign: "center",
                          padding: theme.spacing.xs,
                          marginTop: theme.spacing.xl,
                          marginBottom: theme.spacing.xl,
                          borderRadius: theme.radius.md,
                          cursor: "pointer",

                          "&:hover": {
                            backgroundColor: "skyblue",
                            opacity: 0.9,
                          },
                        })}
                        onClick={() => {
                          setChatStarterModal(false);
                          chatCreatorMethod(business?._id, "vendorBusiness");

                          //     setVisibleChat(true);
                          //     setSelectedChat(business);
                        }}
                      >
                        <Group>
                          <Avatar
                            size="lg"
                            radius="xl"
                            src={business.coverImage}
                          ></Avatar>
                          <Text size="md">{business.vendorBusinessTitle}</Text>
                        </Group>
                      </Box>
                    );
                  })
                : type === "venueOwner"
                ? venues.map((venue) => {
                    return (
                      <Box
                        key={venue._id}
                        sx={(theme) => ({
                          backgroundColor: "skyblue",

                          textAlign: "center",
                          padding: theme.spacing.xs,
                          marginTop: theme.spacing.xl,
                          marginBottom: theme.spacing.xl,
                          borderRadius: theme.radius.md,
                          cursor: "pointer",

                          "&:hover": {
                            backgroundColor: "skyblue",
                            opacity: 0.9,
                          },
                        })}
                        onClick={() => {
                          setChatStarterModal(false);
                          chatCreatorMethod(venue?._id, "venue");
                          //     setVisibleChat(true);
                          //     setSelectedChat(business);
                        }}
                      >
                        <Group>
                          <Avatar
                            size="lg"
                            radius="xl"
                            src={venue.coverImage}
                          ></Avatar>
                          <Text size="md">{venue.venueName}</Text>
                        </Group>
                      </Box>
                    );
                  })
                : type === "all"
                ? users.map((user) => {
                    return (
                      <Box
                        key={user._id}
                        sx={(theme) => ({
                          backgroundColor: "skyblue",

                          textAlign: "center",
                          padding: theme.spacing.xs,
                          marginTop: theme.spacing.xl,
                          marginBottom: theme.spacing.xl,
                          borderRadius: theme.radius.md,
                          cursor: "pointer",

                          "&:hover": {
                            backgroundColor: "skyblue",
                            opacity: 0.9,
                          },
                        })}
                        onClick={() => {
                          setChatStarterModal(false);
                          chatCreatorMethod(user?._id, "user");
                          //     setVisibleChat(true);
                          //     setSelectedChat(business);
                        }}
                      >
                        <Group>
                          <Avatar
                            size="lg"
                            radius="xl"
                            src={user.profileImage}
                          ></Avatar>
                          <Text size="md">{user.name}</Text>
                        </Group>
                      </Box>
                    );
                  })
                : type === "customer"
                ? users.map((user) => {
                    if (user.userType === type) {
                      return (
                        <Box
                          key={user._id}
                          sx={(theme) => ({
                            backgroundColor: "skyblue",

                            textAlign: "center",
                            padding: theme.spacing.xs,
                            marginTop: theme.spacing.xl,
                            marginBottom: theme.spacing.xl,
                            borderRadius: theme.radius.md,
                            cursor: "pointer",

                            "&:hover": {
                              backgroundColor: "skyblue",
                              opacity: 0.9,
                            },
                          })}
                          onClick={() => {
                            setChatStarterModal(false);
                            chatCreatorMethod(user?._id, "user");
                            //     setVisibleChat(true);
                            //     setSelectedChat(business);
                          }}
                        >
                          <Group>
                            <Avatar
                              size="lg"
                              radius="xl"
                              src={user.profileImage}
                            ></Avatar>
                            <Text size="md">{user.name}</Text>
                          </Group>
                        </Box>
                      );
                    } else {
                      return null;
                    }
                  })
                : type === "superAdmin"
                ? users.map((user) => {
                    if (user.userType === type) {
                      return (
                        <Box
                          key={user._id}
                          sx={(theme) => ({
                            backgroundColor: "skyblue",

                            textAlign: "center",
                            padding: theme.spacing.xs,
                            marginTop: theme.spacing.xl,
                            marginBottom: theme.spacing.xl,
                            borderRadius: theme.radius.md,
                            cursor: "pointer",

                            "&:hover": {
                              backgroundColor: "skyblue",
                              opacity: 0.9,
                            },
                          })}
                          onClick={() => {
                            setChatStarterModal(false);
                            chatCreatorMethod(user?._id, "user");
                            //     setVisibleChat(true);
                            //     setSelectedChat(business);
                          }}
                        >
                          <Group>
                            <Avatar
                              size="lg"
                              radius="xl"
                              src={user.profileImage}
                            ></Avatar>
                            <Text size="md">{user.name}</Text>
                          </Group>
                        </Box>
                      );
                    } else {
                      return null;
                    }
                  })
                : null}
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ChatStarterModal;
