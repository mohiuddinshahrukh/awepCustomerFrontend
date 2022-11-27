import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { IconMessage, IconSend, IconX } from "@tabler/icons";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socketContext } from "../../../Socket/Socket";

const ChatScreen = () => {
  const socket = useContext(socketContext);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [selectedConversation, setSelectedConversation] = useState({});
  const [allConversations, setAllConversations] = useState([]);
  const [allCustomerChats, setAllCustomerChats] = useState([]);
  const [chatHeadsFetched, setChatHeadsFetched] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const location = useLocation();

  //
  useEffect(() => {
    // COUNTING USEEFFECT RUN-COUNT
    console.count("COUNTING FROM CHAT SCREEN");
    // CONNECTING TO SOCKET

    if (location.pathname.toString() !== "/dashboard/chats") {
      socket.on("disconnect", () => {
        setIsConnected(false);
        // console.log("PROMPT: ", "SOCKET DISCONNECTED");
      });
    } else {
      socket.on("connect", () => {
        // console.log("PROMPT: ", "SOCKET CONNECTED");
        setIsConnected(true);
      });
      // DISCONNECTING FROM SOCKET

      socket.on("newConnection", (data) => {
        // console.log("NEW CONNECTION DATA: ", data);
        setAllCustomerChats(data.Conversations);
        // console.log("T-DEBUG:", "NEW CONNECTION", data);
        setChatMessages(data.messages);
        // if (data.userId === currentUser.id) {
        // console.log(
        //   "T-DEBUG:",
        //   "NEW CONNECTION - USER MATCH",
        //   data.Conversations
        // );
        // console.log("NEW CONNECTION ESTABLISHED: ", data);
        const newConversation = data.Conversations || [];
        // @123
        console.log("NEW CONNVERSATION: ", newConversation);
        setAllConversations(newConversation);
        //   setFilterString(newConversation);
        // }
        // setConversation(data.conversation);
      });

      //
      socket.on("showChatHeads", (data) => {
        // console.log("showChatHeads", data);
        if (data.userId === JSON.parse(localStorage.getItem("userData")).id) {
          setAllConversations(data.conversations);
          setAllCustomerChats(data.conversations);
          // setFilterString(data.conversations);
          // console.log("@@@@@CURRENT CONVERSATION: ", data?.currentConversation);
          // console.log("@@@@@@@@@same user");
          // setCurrentConversation(data?.currentConversation);
          setChatMessages(data?.currentConversation?.messages);
        }
      });

      socket.on("receiveMessage", (data) => {
        console.log("receiveMessage", data);
        const conversations = data.conversations.filter((conversation) =>
          conversation.participants.includes(
            JSON.parse(localStorage.getItem("userData")).id
          )
        );
        setAllConversations(conversations);
        // setFilterString(conversations);
        if (
          data.currentConversation?._id ===
          JSON.parse(localStorage.getItem("userData")).id
        ) {
          console.log(
            "NEW MESSAGE RECEIVED: ",
            data?.currentConversation?.messages
          );
          setChatMessages(data?.currentConversation?.messages);
        }
      });

      // SOCKET ON ERROR
      socket.on("error", (data) => {
        console.log("ERROR", data);
      });

      // SOCKET ON CHAT BLOCKED ERROR
      socket.on("chatBlockedError", (data) => {
        console.log("chatBlockedError", data);
      });
      console.log("LOCATION:", location.pathname);
    }
    // CLEANUP FUNCTION
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("receiveMessage");
    };
  }, [socket, location.pathname]);

  //
  useEffect(() => {
    if (!chatHeadsFetched) {
      socket.emit("getChatHeads", {
        userId: JSON.parse(localStorage.getItem("userData")).id,
      });
      setChatHeadsFetched(true);
    }
  }, [chatHeadsFetched, socket]);
  const sendMessageMethod = () => {
    // scrollIntoView();
    console.log(
      "Sending Message with user",
      JSON.parse(localStorage.getItem("userData"))
    );
    socket.emit("sendMessage", {
      message: message,
      messageType: "text",
      senderId: JSON.parse(localStorage.getItem("userData")).id,
      conversationId: selectedConversation.id,
      // recieverId: conversation._id,
    });
    setMessage("");
  };

  return (
    <Paper
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid blue",
      }}
    >
      <Grid align={"flex-start"}>
        <Grid.Col lg={4}>
          <Group
            position="center"
            style={{ height: "100%", border: "1px solid red" }}
          >
            {allCustomerChats?.map((chat, index) => {
              return (
                <Box
                  onClick={() => {
                    setSelectedChat(chat.chatHead1);
                    setSelectedConversation(chat);
                  }}
                  key={index}
                  sx={(theme) => ({
                    color:
                      selectedChat.id === chat.chatHead1.id
                        ? theme.white
                        : theme.colorScheme === "dark"
                        ? theme.white
                        : theme.black,
                    backgroundColor:
                      selectedChat.id === chat.chatHead1.id
                        ? theme.colors.blue[5]
                        : theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.white,
                    ":hover": {
                      cursor: "pointer",
                      backgroundColor:
                        selectedChat.id === chat.chatHead1.id
                          ? theme.colors.blue[7]
                          : theme.colorScheme === "dark"
                          ? theme.colors.dark[4]
                          : theme.colors.gray[2],
                    },
                    border: `1px solid #eaeaea`,
                    borderRadius: "5px",
                    padding: "5px 10px",
                  })}
                >
                  <Group noWrap style={{ flexShrink: 0 }} position="apart">
                    <Avatar radius={"xl"} src={chat.chatHead1.image} />
                    <Stack spacing={0}>
                      <Text weight={500}>{chat.chatHead1.title}</Text>
                      <Group noWrap style={{ flexShrink: 0 }}>
                        <Text>{chat.chatHead1.userType.toUpperCase()}</Text>
                        <Text>{chat.chatHead1.phone}</Text>
                      </Group>
                    </Stack>
                  </Group>
                </Box>
              );
            })}
          </Group>
        </Grid.Col>
        {console.log("SELECTED CHAT: ", selectedChat)}
        <Grid.Col lg={8}>
          <Paper withBorder>
            <Group position="apart" noWrap style={{ flexShrink: 0 }}>
              <Group>
                <Box>
                  {" "}
                  <Group noWrap style={{ flexShrink: 0 }} position="apart">
                    <Avatar radius={"xl"} src={selectedChat?.image} />
                    <Stack spacing={0}>
                      <Text weight={500}>{selectedChat?.title}</Text>
                      <Group noWrap style={{ flexShrink: 0 }}>
                        <Text>{selectedChat?.userType?.toUpperCase()}</Text>
                        <Text>{selectedChat?.phone}</Text>
                      </Group>
                    </Stack>
                  </Group>
                </Box>
              </Group>
              <Group noWrap style={{ flexShrink: 0 }}>
                <ActionIcon
                  onClick={() => {
                    setSelectedChat({});
                  }}
                  bg={"red"}
                  c={"white"}
                  sx={(theme) => ({
                    ":hover": {
                      backgroundColor: theme.colors.red[9],
                    },
                  })}
                >
                  <IconX />
                </ActionIcon>
              </Group>
            </Group>
          </Paper>
          {console.log("CHAT MESSAGES: ", chatMessages)}
          {console.log("selectedConversation MESSAGES: ", allConversations)}
          <Paper withBorder>
            <div style={{}}>
              <div
                style={{
                  height: selectedChat !== "" ? "70vh" : "85vh",
                }}
              >
                {selectedChat !== "" ? (
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
                            message?.senderId?._id ===
                            JSON.parse(localStorage.getItem("userData")).id
                              ? "right"
                              : "left"
                          }
                        >
                          {message.messageType === "text" && (
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
                    <Title> PLEASE SELECT A CONVERSATION TO VIEW</Title>
                    <IconMessage size={45} />
                  </Group>
                )}
              </div>
              <Paper>
                <Divider p="xs" hidden={selectedChat !== "" ? false : true} />
                {/*imagePreview*/}
              </Paper>
              {selectedConversation.blocked ? (
                <Paper>
                  <Text align="center">THIS CHAT IS BLOCKED</Text>
                </Paper>
              ) : (
                selectedChat?.id &&
                !false && (
                  <Grid
                    hidden={selectedChat !== "" ? false : true}
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
                        {/*                        <UploadChatImages
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
                />*/}

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
          </Paper>
        </Grid.Col>{" "}
      </Grid>
    </Paper>
  );
};

export default ChatScreen;
// images.length > 0
