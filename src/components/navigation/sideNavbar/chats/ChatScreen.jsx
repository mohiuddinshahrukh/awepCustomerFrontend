// IMPORTS
import { useState, useEffect } from "react";
import * as React from "react";
import {
  Title,
  Grid,
  Textarea,
  Text,
  Box,
  Avatar,
  Paper,
  Group,
  TextInput,
  ActionIcon,
  ScrollArea,
  Divider,
  Menu,
  Stack,
  LoadingOverlay,
  Button,
  Image,
  Input,
  Progress,
  Center,
} from "@mantine/core";
import axios from "axios";
import io from "socket.io-client";
// import {
// IconCross,
// IconDotsVertical,
// IconEye,
// IconMessage,
// IconMessageOff,
// IconPaperclip,
// IconSearch,
// IconSend,
// IconTrash,
// IconX,
// } from "tabler-icons-react";
import moment from "moment";
import { useScrollIntoView } from "@mantine/hooks";
import ViewVenueModal from "./ViewVenueModal";
import ChatStarterModal from "./ChatStarterModal";
import UploadChatImages from "./UploadChatImage";
import ViewUserDetailsModal from "./ViewUserDetailsModal";
import VendorBusinessModal from "./VendorBusinessModal";

import { useLocation } from "react-router-dom";
// import { ConnectingAirportsOutlined } from "@mui/icons-material";
// import AgoraVoiceCall from "./AgoraVoiceCall";

import {
  IconCross,
  IconDotsVertical,
  IconEye,
  IconMessage,
  IconMessageOff,
  IconPaperclip,
  IconSearch,
  IconSend,
  IconTrash,
  IconX,
} from "@tabler/icons";
import { socketContext } from "../../../Socket/Socket";

// const socket = io(https://a-wep-production.herokuapp.com", {
//   // const socket = io("http://localhost:8081", {
//   auth: {
//     token: localStorage.getItem("customerToken"),
//   },
// });

const ChatScreen = () => {
  let { state } = useLocation();
  const [stateId, setStateId] = useState(state?.ID);
  const socket = React.useContext(socketContext)?.socket;
  console.log("SCOKJET VALUE", socket);

  console.log("State: ", state);
  let userData = JSON.parse(localStorage.getItem("customerData"));

  // HOOKS
  // UPLOAD IMAGES
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [images, setImages] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [percentages, setPercentages] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [url, setUrl] = useState([]); // for useEffect only.... else not needed
  const [imageURLS, setImageURLS] = useState([]);
  const [indexOfCoverImageURL, setIndexOfCoverImageURL] = useState();
  const [disabled2, setDisabled2] = useState(false);
  const [videos, setVideos] = useState([]);
  const [percentages2, setPercentages2] = useState([]);
  const [urls2, setUrls2] = useState([]);
  //
  const [chatStarterModal, setChatStarterModal] = useState(false);
  // MODALS OPEN CLOSE
  const [viewModal, setViewModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [viewVendorModal, setViewVendorModal] = useState(false);
  const [chatHeadsFetched, setChatHeadsFetched] = useState(false);

  const [type, setType] = useState("all");
  const [selectedChatHead, setSelectedChatHead] = useState("");
  const [selectedChatType, setSelectedChatType] = useState("");
  const [selectedChatDetails, setSelectedChatDetails] = useState([]);

  const [filterString, setFilterString] = useState([]);
  const [visibleVenues, setVisibleConversations] = useState(true);
  const [visibleChat, setVisibleChat] = useState(false);
  const [search, setSearch] = useState("");
  // const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();

  const [message, setMessage] = useState("");
  const [allConversations, setAllConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState(userData);
  const [currentConversation, setCurrentConversation] = useState();
  const [selectedConversation, setSelectedConversation] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [rows, setRows] = React.useState([]);
  const [chatHeads, setChatHeads] = useState([]);
  const [refresh, setRefresh] = React.useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [allVenues, setAllVenues] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [uploadTask, setUploadTask] = useState();

  const imagePreview = images?.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Grid>
        <Grid.Col span={3}>
          <div>
            <Avatar
              key={index}
              src={imageUrl}
              size={140}
              radius={120}
              mx="auto"
              imageProps={{
                onLoad: () => URL.revokeObjectURL(imageUrl),
              }}
            />
            {console.log("@@@@@@@@@@", percentages[index])}
            <Progress
              px={100}
              animate={percentage === 100 ? false : true}
              value={percentage}
              label={
                (percentages[index] === 100 && "Image Uploaded") ||
                (percentage === 100 && "Almost Done") ||
                percentage + "% Uploaded"
              }
              size="xl"
              radius="xl"
              color={percentages[index] === 100 ? "green" : "gray"}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={1}>
          <Center
            sx={{
              height: "100%",
            }}
          >
            <Stack>
              <ActionIcon
                disabled={
                  percentages[index] === 100 && url !== [] ? false : true
                }
                color="primary"
                variant="filled"
                radius="xl"
                size="lg"
                onClick={() => {
                  sendImageMessageMethod();
                  setImages([]);
                }}
              >
                <IconSend />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                radius="xl"
                size="lg"
                onClick={() => {
                  setImages([]);
                  setPercentages([]);
                  setPercentage(0);
                  setDisabled(false);
                  if (uploadTask) {
                    console.log("@@@T", uploadTask._state);
                    const state = uploadTask._state;
                    if (state != "success") {
                      console.log("@@@T-If Cancelling", uploadTask);
                      //Upload is not complete yet, let's cancel
                      uploadTask.cancel();
                    } else {
                      console.log("@@@T-Else Deleting", uploadTask);
                      //Upload is complete, but user wanted to cancel. Let's delete the file
                      uploadTask.snapshot.ref.delete();
                      // storageRef.delete(); // will delete all your files
                    }
                  }
                }}
                color="red"
              >
                <IconX />
              </ActionIcon>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>
    );
  });

  const videoPreview = images?.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Grid>
        <Grid.Col span={8}>
          <Paper style={{ width: "100%" }}></Paper>
        </Grid.Col>
        <Grid.Col span={3}>
          <div>
            <Avatar
              key={index}
              src={imageUrl}
              size={140}
              radius={120}
              mx="auto"
              imageProps={{
                onLoad: () => URL.revokeObjectURL(imageUrl),
              }}
            />
            {console.log("@@@@@@@@@@", percentages[index])}
            <Progress
              px={100}
              animate={percentage === 100 ? false : true}
              value={percentage}
              label={
                (percentages[index] === 100 && "Image Uploaded") ||
                (percentage === 100 && "Almost Done") ||
                percentage + "% Uploaded"
              }
              size="xl"
              radius="xl"
              color={percentages[index] === 100 ? "green" : "gray"}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={1}>
          <Center
            sx={{
              height: "100%",
            }}
          >
            <Stack>
              <ActionIcon
                disabled={
                  percentages[index] === 100 && url !== [] ? false : true
                }
                color="primary"
                variant="filled"
                radius="xl"
                size="lg"
                onClick={() => {
                  sendImageMessageMethod();
                }}
              >
                <IconSend />
              </ActionIcon>
              <ActionIcon
                variant="filled"
                radius="xl"
                size="lg"
                onClick={() => {
                  setImages([]);
                  setPercentages([]);
                  setPercentage(0);
                  setDisabled(false);
                  if (uploadTask) {
                    console.log("@@@T", uploadTask._state);
                    const state = uploadTask._state;
                    if (state != "success") {
                      console.log("@@@T-If Cancelling", uploadTask);
                      //Upload is not complete yet, let's cancel
                      uploadTask.cancel();
                    } else {
                      console.log("@@@T-Else Deleting", uploadTask);
                      //Upload is complete, but user wanted to cancel. Let's delete the file
                      uploadTask.snapshot.ref.delete();
                      // storageRef.delete(); // will delete all your files
                    }
                  }
                }}
                color="red"
              >
                <IconX />
              </ActionIcon>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>
    );
  });
  useEffect(() => {
    if (!chatHeadsFetched) {
      socket.emit("getChatHeads", {
        userId: currentUser._id,
      });
      setChatHeadsFetched(true);
    }
  }, [chatHeadsFetched]);

  // React.useEffect(() => {
  if (refresh) {
    // axios
    //   .get(https://a-wep-production.herokuapp.com/superAdmin/getAllUsers")
    //   .then((res) => {
    //     console.log("ALL USERS FETCHED", res.data);
    //     if (res.data.status === "success") {
    //       setAllUsers(res.data.data);
    //       setRefresh(false);
    //       setVisibleConversations(false);
    //     } else {
    //       alert("Error");
    //     }
    //   });
    // axios
    //   .get(https://a-wep-production.herokuapp.com/superAdmin/getAllVenues")
    //   .then((res) => {
    //     console.log("RES", res);
    //     if (res.data.status === "success") {
    //       console.log("RES>DATA>DATA", res.data.data);
    //       setAllVenues(res.data.data);
    //     }
    //   });
    // axios
    //   .get(https://a-wep-production.herokuapp.com/superAdmin/getVendorBusiness")
    //   .then((res) => {
    //     console.log("RES", res);
    //     if (res.data.status === "success") {
    //       console.log("RES>DATA>DATA", res.data.data);
    //       setAllVendors(res.data.data);
    //     }
    //   });
  }
  // }, [refresh]);

  // const getAllUsersMethod = async () => {
  //   try {
  //     let url = https://a-wep-production.herokuapp.com/chat/getAllConversations";
  //     let response = await axios.get(url, {
  //       headers: {
  //         token:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWEyOWI3ODE1OTkxZTA2NjNlOTc0NyIsImVtYWlsIjoic3VwZXJhZG1pbkBhd2VwLmNvbSIsInVzZXJUeXBlIjoic3VwZXJBZG1pbiIsImlhdCI6MTY1OTk0Nzg3MCwiZXhwIjo0MjUxOTQ3ODcwfQ.M8aZPB7JTQChOdnPIv6UjvbG08Y6Kvd1qB8VjNxEi9g",
  //       },
  //     });
  //     console.log(response);
  //     if (response.data.status === "success") {
  //       console.log("setting data", response.data.data);
  //       setAllConversations(response.data.data);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // USEEFFECT
  useEffect(() => {
    socket.emit("getChatHeads");
    console.log("$s1GET CHAT HEADS CALLED");
  }, []);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);

      // console.log("T-DEBUG:", "SOCKET CONNECTED");
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      // console.log("T-DEBUG:", "SOCKET DISCONNECTED");
    });
    socket.on("newConnection", (data) => {
      // console.log("T-DEBUG:", "NEW CONNECTION", data);
      // setChatMessages(data.messages);
      if (data.userId === currentUser.id) {
        // console.log(
        //   "T-DEBUG:",
        //   "NEW CONNECTION - USER MATCH",
        //   data.Conversations
        // );

        // console.log("NEW CONNECTION ESTABLISHED: ", data);
        const newConversation = data.Conversations || [];

        // @123
        console.log("$123NEW CONNVERSATION: ", newConversation);

        setAllConversations(newConversation);
        setFilterString(newConversation);
      }
      // setConversation(data.conversation);
    });

    socket.on("showChatHeads", (data) => {
      console.log("showChatHeads");
      if (data.userId === currentUser.id) {
        setAllConversations(data.conversations);
        setFilterString(data.conversations);

        console.log("@@@@@CURRENT CONVERSATION: ", data?.currentConversation);
        // console.log("@@@@@@@@@same user");
        // setCurrentConversation(data?.currentConversation);
        // setChatMessages(data?.currentConversation?.messages);
      }
    });
    socket.on("receiveMessage", (data) => {
      console.log("@NEW MESSAGE", data);
      const conversations = data.conversations.filter((conversation) =>
        conversation.participants.includes(currentUser.id)
      );
      setAllConversations(conversations);
      setFilterString(conversations);
      if (data.currentConversation?._id === currentConversation) {
        console.log(
          "NEW MESSAGE RECEIVED: ",
          data?.currentConversation?.messages
        );
        setChatMessages(data?.currentConversation?.messages);
      }
    });
    // setFilterString(allConversations);
    // CHAT LOADER

    socket.on("error", (data) => {
      console.log("ERROR", data);
    });
    socket.on("chatBlockedError", (data) => {
      console.log("chatBlockedError", data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("receiveMessage");
    };
  });

  // CHAT CREATION METHOD
  function chatCreator(id, type) {
    console.log("CHAT CREATOR METHOD:", id, type);
    socket.emit("viewAllChatsOnStartConversation", {
      participant: {
        _id: id,
        type: type,
      },
    });
  }

  const sendImageMessageMethod = () => {
    // scrollIntoView();
    console.log("Sending IMAGE ", currentUser);
    console.log("Sending IMAGE ", url);
    socket.emit("sendMessage", {
      message: url,
      messageType: "image",
      senderId: currentUser.id,
      conversationId: currentConversation,
      // recieverId: conversation._id,
    });
    setMessage("");
  };
  // SEND MESSAGE METHOD
  const sendMessageMethod = () => {
    // scrollIntoView();
    console.log("Sending Message with user", currentUser);
    socket.emit("sendMessage", {
      message: message,
      messageType: "text",
      senderId: currentUser.id,
      conversationId: currentConversation,
      // recieverId: conversation._id,
    });
    setMessage("");
  };

  // SEARCHING
  const filtering = () => {
    if (search === "" && type === "all") {
      return setFilterString(allConversations);
    } else if (type === "all" && search !== "") {
      return setFilterString(
        allConversations.filter((conversation) => {
          console.log("CONVERSATION: ", conversation);
          return conversation.chatHead2.title
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      );
    } else if (search === "" && type !== "all") {
      console.log(
        "THIS IS TO BE IMPLEMENTED WHEN WE HAVE MULTPLE CHATS, VENUES KI AUR VENDORS KI ETC"
      );
    } else {
      console.log(
        "THIS IS TO BE IMPLEMENTED WHEN CHAT IS NOT EMPTY AND NEITHER IS USERTYPE ALL"
      );
    }
  };

  useEffect(() => {
    filtering();
  }, [search, type]);

  useEffect(() => {
    console.log("STATE FROM USER EFFECT 491", state);
    if (state !== undefined || state !== null || state !== "") {
      for (let i = 0; i < allConversations.length; i++) {
        console.log("CONVERSATIONS MAPPER: ", allConversations[i]);
        if (allConversations[i].chatHead1.id === stateId) {
          console.log("@CHAT HEAD 1", allConversations[i].chatHead1);
          break;
        } else if (allConversations[i].chatHead2.id === stateId) {
          console.log("@CHAT HEAD 2", allConversations[i].chatHead2);
          setSelectedChatHead(allConversations[i]?.chatHead2);
          setRefresh(!refresh);
          break;
        } else {
          console.log("@NEITHER C1 or C2");
          chatCreator(stateId, "user");
        }
      }
    }
  }, []);

  // @123

  return (
    <Paper style={{ height: "100%", width: "100%" }}>
      <ChatStarterModal
        chatCreatorMethod={chatCreator}
        open={chatStarterModal}
        setOpen={setChatStarterModal}
        setChatStarterModal={setChatStarterModal}
      />
      <ViewVenueModal
        subVenues={selectedChatDetails.subVenues}
        viewModal={viewModal}
        setViewModal={setViewModal}
        venueData={selectedChatDetails ? selectedChatDetails : []}
      />
      <ViewUserDetailsModal
        opened1={viewUserModal}
        setOpened1={setViewUserModal}
        userDetails={selectedChatDetails ? selectedChatDetails : []}
      />

      <VendorBusinessModal
        vendorBusiness={selectedChatDetails ? selectedChatDetails : []}
        viewVendorModal={viewVendorModal}
        setViewVendorModal={setViewVendorModal}
      />
      <Grid justify="space-between" style={{ height: "100%", width: "100% " }}>
        <Grid.Col
          lg={3}
          style={{ borderRight: "1px solid #EAEAEA" }}
          hidden={allConversations.length > 0 ? false : true}
        >
          <Grid>
            {/*
                    <Grid.Col>
              <Button
                fullWidth
                uppercase
                onClick={() => {
                  setChatStarterModal(true);
                }}
              >
                start chat
              </Button>
              <TextInput
                my="xs"
                size="md"
                icon={<IconSearch />}
                placeholder="Search..."
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
              />
            
              <Select
                size="md"
                label="Filter By User Type"
                value={type}
                data={[
                  { value: "all", label: "All" },
                  { value: "customer", label: "Customer" },
                  { value: "vendor", label: "Vendor" },
                  { value: "venueOwner", label: "Venue Owner" },
                  { value: "superAdmin", label: "Super Admin" },
                ]}
                placeholder="All User Types"
                onChange={setType}
              />
              
              </Grid.Col>
        */}

            <Grid.Col
              component={ScrollArea}
              style={{ height: "100%", position: "relative" }}
            >
              {/*              <LoadingOverlay
                visible={visibleVenues}
                loaderProps={{
                  size: "xl",
                  color: "grape",
                  variant: "bars",
                }}
                overlayOpacity={0.5}
              />*/}

              {filterString.length > 0 ? (
                filterString?.map((conversation) => {
                  console.log("#$Selected Chat Head: ", selectedChatHead);
                  console.log(
                    "#$Selected conversation Chat Head: ",
                    conversation?.chatHead1
                  );
                  return (
                    <Box
                      key={conversation._id}
                      className={
                        selectedChatHead?.id === conversation?.chatHead1?.id
                          ? "selectedChat"
                          : "unSelectedChat"
                      }
                      sx={(theme) => ({
                        textAlign: "center",
                        padding: theme.spacing.sm,
                        marginTop: theme.spacing.xl,
                        marginBottom: theme.spacing.xl,
                        borderRadius: theme.radius.md,
                        cursor: "pointer",
                      })}
                      onClick={() => {
                        if (conversation?.chatHead2?.id === currentUser?.id) {
                          setSelectedChatHead(conversation?.chatHead1);
                          console.log("@@@@CURRENT CONVERSATION:  IFFFF");

                          if (conversation.userId) {
                            console.log(
                              "@@@@CURRENT CONVERSATION:  IFFF22222F"
                            );
                            allUsers.map((localUser) => {
                              if (
                                localUser?._id === conversation?.userId ||
                                stateId
                              ) {
                                setSelectedChatDetails(localUser);
                              }
                            });
                            console.log(
                              "@@@@CURRENT CONVERSATION:  IFFF22222F"
                            );
                          } else if (conversation.venueId) {
                            console.log("@@@@CURRENT CONVERSATION:  IFF3333");
                            allVenues.map((venue) => {
                              if (venue._id === conversation.venueId) {
                                setSelectedChatDetails(venue);
                              }
                            });
                            console.log("@@@@CURRENT CONVERSATION:  IFF3333");
                          } else {
                            console.log("@@@@CURRENT CONVERSATION:  IFFF4444");
                            allVendors.map((vendor) => {
                              if (
                                vendor._id === conversation.vendorBusinessId
                              ) {
                                setSelectedChatDetails(vendor);
                              }
                              console.log(
                                "@@@@CURRENT CONVERSATION:  IFFF4444"
                              );
                            });
                          }
                        } else {
                          console.log("@@@@CURRENT CONVERSATION:  ELSEEE");
                          setSelectedChatHead(conversation?.chatHead2);
                          if (conversation.userId) {
                            allUsers.map((localUser) => {
                              if (localUser._id === conversation.userId) {
                                setSelectedChatDetails(localUser);
                              }
                            });
                          } else if (conversation.venueId) {
                            allVenues.map((venue) => {
                              if (venue._id === conversation.venueId) {
                                setSelectedChatDetails(venue);
                              }
                            });
                          } else {
                            allVendors.map((vendor) => {
                              if (
                                vendor._id === conversation.vendorBusinessId
                              ) {
                                setSelectedChatDetails(vendor);
                              }
                            });
                          }
                        }

                        setChatMessages(conversation?.messages);
                        setCurrentConversation(conversation?._id);
                        setSelectedConversation(conversation);

                        console.log(
                          "@@@@CURRENT CONVERSATION:",
                          conversation?._id
                        );
                      }}
                    >
                      <Group noWrap>
                        <Avatar
                          size="lg"
                          radius="xl"
                          src={
                            conversation.chatHead2.id === currentUser?.id
                              ? conversation?.chatHead1?.image
                              : conversation?.chatHead2?.image
                          }
                        />
                        <Group>
                          <Stack spacing={0} align="flex-start">
                            <Text size="lg" lineClamp={1}>
                              {conversation?.chatHead2?.id === currentUser?.id
                                ? conversation?.chatHead1?.title
                                : conversation?.chatHead2?.title}
                            </Text>
                            {/* <Text size="lg" lineClamp={1}>
                              {conversation?.chatHead2?.id === currentUser?.id
                                ? conversation?.chatHead1?.title?.substr(0, 1) +
                                  ". " +
                                  conversation?.chatHead1?.title?.split(" ")[1]
                                : conversation?.chatHead2?.title}
                            </Text> */}

                            <Group>
                              {" "}
                              <Text size="sm">
                                {conversation?.chatHead2?.id === currentUser?.id
                                  ? conversation?.chatHead1?.userType ===
                                    "superAdmin"
                                    ? "Super Admin"
                                    : conversation?.chatHead1?.userType ===
                                      "venueOwner"
                                    ? "Venue Owner"
                                    : conversation?.chatHead1?.userType ===
                                      "vendor"
                                    ? "Vendor"
                                    : "customer"
                                  : conversation?.chatHead2?.userType ===
                                    "superAdmin"
                                  ? "Super Admin"
                                  : conversation?.chatHead2?.userType ===
                                    "venue"
                                  ? "Venue Owner"
                                  : conversation?.chatHead2?.userType ===
                                    "vendor"
                                  ? "Vendor"
                                  : "Customer"}
                              </Text>
                              {/* <Text size="sm">
                                {conversation?.chatHead2?.id === currentUser?.id
                                  ? conversation?.chatHead1?.phone
                                  : conversation?.chatHead2?.phone}
                              </Text> */}
                            </Group>
                          </Stack>
                        </Group>
                      </Group>
                    </Box>
                  );
                })
              ) : !visibleVenues ? (
                <Text align="center">
                  CLICK START CHAT TO CREATE A NEW CONVERSATION
                </Text>
              ) : null}
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col
          lg={9}
          style={{
            position: "relative",
          }}
        >
          <LoadingOverlay
            visible={visibleChat}
            loaderProps={{
              size: "xl",
              color: "grape",
              variant: "bars",
            }}
            overlayOpacity={0.5}
          />

          <Stack justify="space-between" style={{ height: "90%" }}>
            <div>
              <Group
                position="apart"
                hidden={selectedChatHead !== "" ? false : true}
              >
                <Group p="md">
                  <Avatar
                    size="lg"
                    radius="xl"
                    src={selectedChatHead.image}
                  ></Avatar>
                  <Stack p={0} m={0} spacing={0} justify="center">
                    <Text size="md">{selectedChatHead.title}</Text>
                  </Stack>
                </Group>
                <Group>
                  {/*<AgoraVoiceCall />*/}

                  <ActionIcon
                    radius="xl"
                    variant="filled"
                    color="red"
                    onClick={() => {
                      setSelectedChatHead("");
                      setChatMessages([]);
                    }}
                  >
                    <IconX />
                  </ActionIcon>
                </Group>
              </Group>
              <Divider hidden={selectedChatHead !== "" ? false : true} />
            </div>

            <div style={{}}>
              <div
                style={{
                  height: selectedChatHead !== "" ? "60vh" : "65vh",
                }}
              >
                {selectedChatHead !== "" ? (
                  <ScrollArea offsetScrollbars style={{ height: "100%" }}>
                    {console.log("AAAAAAAA", selectedConversation)}
                    {selectedConversation.blocked && (
                      <Paper>
                        <Text align="center">THIS CHAT IS BLOCKED</Text>
                      </Paper>
                    )}
                    {chatMessages?.map((message) => {
                      return (
                        <Group
                          key={message?._id}
                          style={{
                            marginRight: "10px",
                          }}
                          position={
                            message?.senderId?._id === currentUser?.id
                              ? "right"
                              : "left"
                          }
                        >
                          {message.messageType === "text" && (
                            <Group
                              className="bgColor"
                              style={{
                                margin: "5px 0 5px 0",
                                width: "fit-content",
                                borderRadius: 5,
                                color: "white",
                                padding: 10,
                              }}
                            >
                              <Stack justify="space-between">
                                <Text size={20}>{message?.message}</Text>{" "}
                                <Group position="apart">
                                  <Text
                                    align="right"
                                    size={12}
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                    }}
                                  >
                                    {moment(new Date(message?.sentTime)).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </Text>
                                  <Text
                                    align="right"
                                    size={12}
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                    }}
                                  >
                                    {moment(new Date(message?.sentTime)).format(
                                      "h:mm:ss a"
                                    )}
                                  </Text>
                                </Group>
                              </Stack>
                            </Group>
                          )}
                          {message.messageType === "image" && (
                            <Group
                              style={{
                                backgroundColor: "#228BE6",
                                margin: "5px 0 5px 0",
                                width: "fit-content",
                                borderRadius: 5,
                                color: "white",
                                padding: 10,
                              }}
                            >
                              <Stack justify="space-between">
                                <Image
                                  src={message?.message}
                                  style={{
                                    // add breakpoints for the width
                                    width: "40vw",
                                    objectFit: "cover",
                                  }}
                                ></Image>
                                <Group position="apart">
                                  <Text
                                    align="right"
                                    size={12}
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                    }}
                                  >
                                    {moment(new Date(message?.sentTime)).format(
                                      "MMMM Do YYYY"
                                    )}
                                  </Text>
                                  <Text
                                    align="right"
                                    size={12}
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                    }}
                                  >
                                    {moment(new Date(message?.sentTime)).format(
                                      "h:mm:ss a"
                                    )}
                                  </Text>
                                </Group>
                              </Stack>
                            </Group>
                          )}
                        </Group>
                      );
                    })}
                  </ScrollArea>
                ) : (
                  <Group
                    position="center"
                    align="center"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {console.log("allConversations", allConversations)}
                    {allConversations.length > 0 ? (
                      <Title> PLEASE SELECT A CONVERSATION TO VIEW</Title>
                    ) : (
                      <Title> NO CHATS </Title>
                    )}
                    <IconMessage size={45} />
                  </Group>
                )}
              </div>
              <Paper>
                <Divider
                  p="xs"
                  hidden={selectedChatHead !== "" ? false : true}
                />
                {imagePreview}
              </Paper>
              {selectedConversation.blocked ? (
                <Paper>
                  <Text align="center">THIS CHAT IS BLOCKED</Text>
                </Paper>
              ) : (
                selectedChatHead?.id &&
                !(images.length > 0) && (
                  <Grid
                    hidden={selectedChatHead !== "" ? false : true}
                    grow
                    mt="md"
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[8]
                          : theme.colors.gray[2],
                      opacity: 0.5,
                    })}
                  >
                    <Grid.Col span={1}>
                      <Group position="center" align="center">
                        <UploadChatImages
                          error={error}
                          setError={setError}
                          disabled={disabled}
                          setDisabled={setDisabled}
                          images={images}
                          setImages={setImages}
                          percentages={percentages}
                          setPercentages={setPercentages}
                          setPercentage={setPercentage}
                          urls={url}
                          setUrls={setUrl}
                          folderName="chats"
                          setUploadTask={setUploadTask}
                        />

                        {/* <Image src={images[0]} height={30} width={} /> */}
                        {/* <Menu.Item>
                              <UploadChatImages
                                sendImageMessageMethod={sendImageMessageMethod}
                                error={error}
                                setError={setError}
                                disabled={disabled}
                                setDisabled={setDisabled}
                                disabled1={disabled1}
                                setDisabled1={setDisabled1}
                                disabled2={disabled2}
                                setDisabled2={setDisabled2}
                                images={images}
                                setImages={setImages}
                                percentages={percentages}
                                setPercentages={setPercentages}
                                urls={urls}
                                setUrls={setUrls}
                                imageURLS={imageURLS}
                                setImageURLS={setImageURLS}
                                indexOfCoverImageURL={indexOfCoverImageURL}
                                setIndexOfCoverImageURL={setIndexOfCoverImageURL}
                                videos={videos}
                                setVideos={setVideos}
                                percentages2={percentages2}
                                setPercentages2={setPercentages2}
                                urls2={urls2}
                                setUrls2={setUrls2}
                                hidden={hidden}
                                setHidden={setHidden}
                                folder="vendor"
                                addImages="Describe Your Business With Images"
                                addVideos="Describe Your Business With Videos"
                              />
                            </Menu.Item> */}
                      </Group>
                    </Grid.Col>
                    <Grid.Col xs={9} sm={9} md={9} lg={9} xl={10}>
                      <Textarea
                        disabled={
                          selectedConversation.blocked === true ? true : false
                        }
                        onKeyUpCapture={(e) => {
                          console.log("THIS IS E: ", e);
                          console.log("MESSAGE: ", message.length);
                          if (e.key === "Enter") {
                            sendMessageMethod();
                          }
                        }}
                        // label="Message"
                        size="sm"
                        radius="md"
                        placeholder="Type Your Message Here..."
                        autosize
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        minRows={1}
                        maxRows={4}
                      />
                    </Grid.Col>
                    <Grid.Col xs={2} sm={2} md={2} lg={2} xl={1}>
                      <Group position="center">
                        <ActionIcon
                          disabled={message.length > 0 ? false : true}
                          color="primary"
                          variant="filled"
                          radius="xl"
                          size="xl"
                          onClick={() => {
                            sendMessageMethod();
                          }}
                        >
                          <IconSend />
                        </ActionIcon>
                      </Group>
                    </Grid.Col>
                  </Grid>
                )
              )}
            </div>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default ChatScreen;

// {selectedChatDetails.userType ? (
//   <Menu position="left-start" width={200} shadow="md">
//     <Menu.Target>
//       <ActionIcon>
//         <IconDotsVertical />
//       </ActionIcon>
//     </Menu.Target>
//     {/*
//    <Menu.Dropdown>
//       <Menu.Label>Actions</Menu.Label>
//       <Menu.Divider></Menu.Divider>
//       <Menu.Item
//         onClick={() => {
//           setViewUserModal(!viewUserModal);
//           console.log("clicked");
//         }}
//         icon={<IconEye />}
//       >
//         View User
//       </Menu.Item>
//       <Menu.Item
//         icon={<IconMessageOff />}
//         onClick={() => {
//           console.log("BLOCKED CHAT");

//           console.log(
//             "currentConversation",
//             currentConversation
//           );
//           socket.emit("blockChat", {
//             conversationId: currentConversation,
//           });
//         }}
//       >
//         Block Chat
//       </Menu.Item>
//       <Menu.Item icon={<IconTrash />}>Delete Chat</Menu.Item>
//     </Menu.Dropdown>
//   */}
//   </Menu>
// ) : selectedChatDetails.venueOwnerId ? (
//   <Menu position="left-start" width={200} shadow="md">
//     <Menu.Target>
//       <ActionIcon>
//         <IconDotsVertical />
//       </ActionIcon>
//     </Menu.Target>
//     <Menu.Dropdown>
//       <Menu.Label>Actions</Menu.Label>
//       <Menu.Divider></Menu.Divider>
//       <Menu.Item
//         onClick={() => {
//           setViewModal(!viewModal);
//         }}
//         icon={<IconEye />}
//       >
//         View Venue
//       </Menu.Item>
//       <Menu.Item icon={<IconTrash />}>Delete Chat</Menu.Item>
//     </Menu.Dropdown>
//   </Menu>
// ) : (
//   <Menu position="left-start" width={200} shadow="md">
//     <Menu.Target>
//       <ActionIcon>
//         <IconDotsVertical />
//       </ActionIcon>
//     </Menu.Target>
//     <Menu.Dropdown>
//       <Menu.Label>Actions</Menu.Label>
//       <Menu.Divider></Menu.Divider>
//       <Menu.Item
//         onClick={() => {
//           setViewVendorModal(!viewVendorModal);
//           console.log("CLICKED");
//         }}
//         icon={<IconEye />}
//       >
//         View Vendor Business
//       </Menu.Item>
//       <Menu.Item icon={<IconTrash />}>Delete Chat</Menu.Item>
//     </Menu.Dropdown>
//   </Menu>
// )}
