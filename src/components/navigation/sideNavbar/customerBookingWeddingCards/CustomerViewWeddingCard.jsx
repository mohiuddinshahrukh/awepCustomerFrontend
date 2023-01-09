import {
  ActionIcon,
  Avatar,
  Button,
  Grid,
  Group,
  Modal,
  Paper,
  Table,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconEye, IconFilePlus, IconTrash } from "@tabler/icons";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Navigate, useNavigate } from "react-router-dom";
import LoaderAWEP from "../../../LoaderAWEP/LoaderAWEP";
import CustomerWeddingCardView from "./CustomerWeddingCardView";

let url = "";
const CustomerViewWeddingCard = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [opened, setOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [downloadLink, setDownload] = useState("");
  const [qrCode, setQrCode] = useState("");
  const canvas = useRef(null);
  const [canvasAllTextAlign, setCanvasAllTextAlign] = useState("center");
  const [viewWeddingCards, setWeddingCards] = useState([]);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    fetchAllWeddingCards().then(setWeddingCards);
  }, [refresh]);
  const fetchAllWeddingCards = async () => {
    console.log("Fetching all Wedding Cards");
    try {
      console.log("Fetching all Wedding Cards try");
      const apiResponse = await axios({
        method: "get",
        url: "https://a-wep.herokuapp.com/customer/getMyWeddingCards",
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });
      console.log("API RESPONSE: ", apiResponse.data);
      if (apiResponse.data.status === "success") {
        console.log(
          "@Successfully fetched all Wedding Cards:",
          apiResponse.data.data
        );
        apiResponse.data.data.map((item, index) => {
          item.id = index + 1;
        });
        setVisible(false);
        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        setVisible(false);
        console.log("Error while fetching all Wedding Cards");
      } else {
        setVisible(false);
        console.log("Failed to fetch all wedding cards, don't know this error");
      }
    } catch (e) {
      setVisible(false);
      console.log("ERROR in fetching all Wedding Cards:", e);
    }
  };

  const headCells = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "preview",
      numeric: false,
      disablePadding: true,
      label: "Preview",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: true,
      label: "Created At",
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "Actions",
    },
  ];
  const deleteWeddingCard = async (id) => {
    setVisible(true);
    try {
      const apiResponse = await axios({
        method: "delete",
        url: `https://a-wep.herokuapp.com/customer/deleteMyWeddingCard/${id}`,
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });

      console.log("apiResponse", apiResponse);
      if (apiResponse.data.status === "success") {
        showNotification({
          title: "Success",
          message: "Wedding Card Deleted Successfully",
          color: "green",
        });
        setVisible(false);
        setRefresh(!refresh);
      } else if (apiResponse.data.status === "error") {
        showNotification({
          title: "Error",
          message: "Failed to delete Wedding Card",
          color: "red",
        });
        setVisible(false);
      } else {
        showNotification({
          title: "Error",
          message: "Some error occured",
          color: "red",
        });
        setVisible(false);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
  const headRows = headCells.map((data, index) => {
    return <td key={index}>{data.label}</td>;
  });

  const bodyRows = viewWeddingCards?.map((data, index) => {
    console.log("data", data);
    return (
      <tr key={index}>
        <td>{data?.id}</td>
        <td>
          <Avatar
            size={"lg"}
            radius={"xl"}
            src={data?.fullCardData.image}
          ></Avatar>
        </td>
        <td>
          {data?.fullCardData.groomName} & {data?.fullCardData.brideName}
        </td>
        <td>
          {data?.createdAt.split("T")[0] +
            " " +
            data?.createdAt.split("T")[1].split(".")[0]}
        </td>
        <td>
          <Group>
            <ActionIcon
              onClick={() => {
                setOpened(!opened);
                setSelectedCard(data);
                console.log("data", data);
              }}
            >
              <IconEye />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                console.log("data", data);

                navigate(`/dashboard/EditWeddingCards/id/${data._id}`, {
                  state: { data },
                });
              }}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                deleteWeddingCard(data._id);
                console.log("data", data._id);
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <Paper w={"100%"} style={{ position: "relative" }}>
      <LoaderAWEP visible={visible} />
      <Modal
        padding="xl"
        size="xl"
        title="View Wedding Card"
        opened={opened}
        onClose={() => {
          setOpened(!opened);
        }}
      >
        <CustomerWeddingCardView selectedCard={selectedCard.fullCardData} />
      </Modal>
      <Table striped withBorder withColumnBorders>
        <thead>
          <tr>{headRows}</tr>
        </thead>
        <tbody>{bodyRows}</tbody>
      </Table>
    </Paper>
  );
};

export default CustomerViewWeddingCard;
