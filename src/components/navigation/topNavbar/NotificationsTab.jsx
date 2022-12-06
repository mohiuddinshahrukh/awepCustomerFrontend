import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Button,
  Group,
  Indicator,
  Menu,
  Text,
} from "@mantine/core";
import React from "react";
import { Notification } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons";
import { useState } from "react";
import { useEffect } from "react";

import moment from "moment/moment";
import { socket } from "../../Socket/Socket";
let count = 0;
const NotificaitonsTab = ({ allNotifications, unreadCount, signedIn }) => {
  console.log("@COUNT", unreadCount);
  // const [getCount, setCount] = useState(0);

  useEffect(() => {
    console.log("123123NOTIFICATIONS", allNotifications);
    console.log("123123NOTIFICATIONS", unreadCount);
    // setCount(unreadCount);
  }, [unreadCount, allNotifications, signedIn]);

  return (
    <Menu
      styles={{
        item: { padding: 0, margin: "10px 0px" },
        dropdown: {
          maxHeight: "60vh",
          overflowY: "scroll",
          overflowX: "hidden",
        },
      }}
      withArrow
      shadow="md"
      width={500}
      position="bottom"
      transition="pop"
      closeOnItemClick={false}
    >
      <Menu.Target>
        <Indicator
          styles={{}}
          label={unreadCount}
          inline
          size={15}
          showZero={false}
          dot={false}
          processing
        >
          <ActionIcon size={"xl"} className="border">
            {/* <Avatar size="lg" src="avatar.png" /> */}
            <IconBell size={30} color="#e60084" stroke={1.5} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>{" "}
      <Menu.Dropdown>
        <Group position="right">
          {console.log("@DEBUG", allNotifications.length, unreadCount)}
          <Button
            hidden={
              allNotifications.length === 0 || unreadCount === 0 ? true : false
            }
            variant="subtle"
            onClick={() => {
              socket.socket.emit("markAllNotificationsAsRead");
            }}
          >
            Mark All As Read
          </Button>
        </Group>
        {allNotifications?.map((notification, index) => {
          if (!notification.read) {
            return (
              // <Anchor variant="text" key={index} href={notification.link}>
              <Menu.Item key={index}>
                <Notification
                  onClick={() => {
                    socket.emit("markNotificationAsRead", {
                      notificationId: notification._id,
                    });
                    // setRefreshNotifications(!refreshNotifications);
                  }}
                  styles={{
                    title: { justifyContent: "space-between" },
                  }}
                  disallowClose
                  title={`${notification.title}`}
                  // icon={<Check />}
                >
                  <Group position="apart">
                    <Text>{notification.message}</Text>
                    {moment(Date.now()).diff(
                      notification.createdAt,
                      "seconds"
                    ) < 60 ? (
                      <Text color="dimmed">less than a minute ago</Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "minutes"
                      ) < 60 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "minutes"
                        )}{" "}
                        mins ago
                      </Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "hours"
                      ) < 24 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "hours"
                        )}{" "}
                        hours ago
                      </Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "days"
                      ) < 7 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "days"
                        )}
                        days ago
                      </Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "weeks"
                      ) < 4 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "weeks"
                        )}{" "}
                        weeks ago
                      </Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "months"
                      ) < 12 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "months"
                        )}{" "}
                        months ago
                      </Text>
                    ) : (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "years"
                        )}{" "}
                        Years ago
                      </Text>
                    )}
                  </Group>
                </Notification>
              </Menu.Item>
              // </Anchor>
            );
          } else if (notification.read) {
            console.count("NOTIFICATION COUNT");
            return (
              // <Anchor variant="text" key={index} href={notification.link}>

              <Menu.Item key={index}>
                <Notification
                  // onClick={() => {
                  //   socket.emit("markNotificationAsRead", {
                  //     notificationId: notification._id,
                  //   });
                  //   // setRefreshNotifications(!refreshNotifications);
                  // }}
                  styles={{
                    title: { justifyContent: "space-between" },
                  }}
                  color="green"
                  disallowClose
                  title={`${notification.title}`}
                  // icon={<Check />}
                >
                  <Group position="apart">
                    <Text>{notification.message}</Text>
                    {moment(Date.now()).diff(
                      notification.createdAt,
                      "seconds"
                    ) < 60 ? (
                      <Text color="dimmed">less than a minute ago</Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "minutes"
                      ) < 60 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "minutes"
                        )}{" "}
                        mins ago
                      </Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "hours"
                      ) < 24 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "hours"
                        )}{" "}
                        hours ago
                      </Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "days"
                      ) < 7 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "days"
                        )}
                        days ago
                      </Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "weeks"
                      ) < 4 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "weeks"
                        )}{" "}
                        weeks ago
                      </Text>
                    ) : moment(Date.now()).diff(
                        notification.createdAt,
                        "months"
                      ) < 12 ? (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "months"
                        )}{" "}
                        months ago
                      </Text>
                    ) : (
                      <Text color="dimmed">
                        {moment(Date.now()).diff(
                          notification.createdAt,
                          "years"
                        )}{" "}
                        Years ago
                      </Text>
                    )}
                  </Group>
                </Notification>
              </Menu.Item>
              // </Anchor>
            );
          }
          // setCount(count);
          // console.log("@COUNT", count);
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificaitonsTab;
