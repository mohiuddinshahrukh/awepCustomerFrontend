import {
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Rating,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { useEffect, useState } from "react";
import ReviewImage from "./image2.jpg";
import { Button, createStyles } from "@mantine/core";
import React from "react";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import logo from "../../assets/awepLogo/3a.png";

const AddComplaint = () => {
  const [feedbackDetails, setFeedbackDetails] = useState({});
  console.log("deererere", feedbackDetails);
  const fetchReviewDetails = async () => {
    let url;
    if (params.provider === "venue") {
      url =
        "https://a-wep.herokuapp.com/customer/getMySubVenueBookingComplaints";
    } else if (params.provider === "vendor") {
      url =
        "https://a-wep.herokuapp.com/customer/getMyVendorPackageBookingComplaints";
    }
    // else if (params.provider === "admin") {
    //   url = "https://a-wep.herokuapp.com/auth/user/addSystemFeedback";
    // }
    try {
      const apiResponse = await axios({
        url: url,
        method: "GET",
        headers: { token: localStorage.getItem("customerToken") },
      });
      console.log("API Response", apiResponse);
      if (apiResponse.data.status === "success") {
        let retrievedData = apiResponse.data.data;
        console.log("retrievedData", retrievedData);
        let specificVendorReview = retrievedData.filter((complaint) => {
          console.log("retrievedData Processed", retrievedData);
          return complaint._id === params.complaintId;
        });
        return specificVendorReview[0];
      } else if (apiResponse.data.status === "error") {
        console.log(
          "Error while fetching all venue services",
          apiResponse.data.error
        );
      } else {
        console.log("Unknown Error: ", apiResponse.data.error);
      }
    } catch (error) {
      console.log("Error in fetchAllVenueServices catch block", error);
    }
  };
  useEffect(() => {
    fetchReviewDetails().then(setFeedbackDetails);
    console.count();
  }, []);
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  const params = useParams();
  console.log("MY PARAMS: ", params);

  useEffect(() => {
    console.log("useEffect");
    console.log("feedbackDetails", feedbackDetails);

    setComplaint(feedbackDetails ? feedbackDetails.complaintDescription : "");
    setComplaintTitle(feedbackDetails ? feedbackDetails.complaintTitle : "");
  }, [feedbackDetails]);

  const [complaint, setComplaint] = useState("");
  const [complaintTitle, setComplaintTitle] = useState("");

  let navigate = useNavigate();
  const handleSubmit = async () => {
    console.log("MAKING THE BOOKING", params.provider);
    let body;
    if (params.provider === "venue") {
      console.log("hello", params.provider);
      body = {
        subVenueBookingId: params.bookingId,
        complaintTitle: complaintTitle,
        complaintDescription: complaint,
      };
    } else if (params.provider === "vendor") {
      console.log("first");
      body = {
        vendorPackageBookingId: params.bookingId,
        complaintTitle: complaintTitle,
        complaintDescription: complaint,
      };
    }
    //  else if (params.provider === "admin") {
    //   body = {
    //     feedback: complaint,
    //     feedbackType: "feedback",
    //   };
    // }

    console.log("@@@body", body);

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };

    var url = "";
    if (params.provider === "venue") {
      url = "https://a-wep.herokuapp.com/customer/addSubVenueBookingComplaint";
    } else if (params.provider === "vendor") {
      url =
        "https://a-wep.herokuapp.com/customer/addVendorPackageBookingComplaint";
    }
    // else if (params.provider === "admin") {
    //   url = "https://a-wep.herokuapp.com/auth/user/addSystemFeedback";
    // }
    console.log("URL: ", url);
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: body,
        headers: headers,
      });

      console.log("THIS IS THE RESPONSE OBJECT:   ", response);

      if (response.data.status === "error") {
        showNotification({
          title: `ERROR`,
          color: "red",
          message: `${response.data.error?.message || response.data.error}`,
        });
        console.log("error", response.data.error.message);
        console.log("error", response.data.error);
      } else {
        showNotification({
          color: "green",
          title: `SUCCESS`,
          message: `COMPLAINT ADDED SUCCESSFULLY!!`,
        });
        params.provider === "venue"
          ? navigate("/dashboard/venueComplaints")
          : params.provider === "vendor"
          ? navigate("/dashboard/vendorComplaints")
          : navigate("/");
        console.log("success", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    console.log("Handle Update Called");
    let body;
    if (params.provider === "venue") {
      body = {
        complaintTitle: complaintTitle,
        complaintDescription: complaint,
      };
    } else if (params.provider === "vendor") {
      body = {
        complaintTitle: complaintTitle,
        complaintDescription: complaint,
      };
    }

    console.log("@@@body Update", body);
    console.log("PARAMS: ", params);

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };

    var url = "";
    if (params.provider === "venue") {
      url = `https://a-wep.herokuapp.com/customer/updateSubVenueBookingComplaint/${params.complaintId}`;
    } else if (params.provider === "vendor") {
      url = `https://a-wep.herokuapp.com/customer/updateVendorPackageBookingComplaint/${params.complaintId}`;
    }
    console.log("URL: ", url);
    try {
      const response = await axios({
        method: "patch",
        url: url,
        data: body,
        headers: headers,
      });

      console.log("THIS IS THE RESPONSE OBJECT:   ", response);

      if (response.data.status === "error") {
        showNotification({
          title: `ERROR`,
          color: "red",
          message: `${response.data.error?.message || response.data.error}`,
        });
        console.log("error", response.data.error.message);
        console.log("error", response.data.error);
      } else {
        showNotification({
          color: "green",
          title: `SUCCESS`,
          message: `FEEDBACK UPDATED SUCCESSDULLY`,
        });
        params.provider === "venue"
          ? navigate("/dashboard/venueComplaints")
          : params.provider === "vendor"
          ? navigate("/dashboard/vendorComplaints")
          : navigate("/");
        console.log("success", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const currentTheme = useMantineTheme();
  return (
    <Grid
      style={{
        width: "100%",
        position: "absolute",
        top: 0,
        zIndex: 20,
        backgroundColor:
          currentTheme.colorScheme === "dark"
            ? currentTheme.colors.dark[7]
            : currentTheme.white,
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      }}
    >
      <Grid.Col
        style={{ boxSizing: "border-box", margin: 0, padding: 0 }}
        lg={6}
      >
        <Paper
          radius={0}
          sx={{
            backgroundImage: `url(${ReviewImage})`,
            height: matches1200 ? "100vh" : "50vh",
          }}
          style={{
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack px={matches800 ? 60 : "md"}>
            <Text
              size={30}
              weight="bold"
              color="white"
              pr={matches800 ? 150 : "md"}
            >
              Complain You Wedding Supplier
            </Text>

            <Text size={20} color="white" pr={matches800 ? 100 : "md"}>
              Sorry to hear that you had a bad experience. Please let us know.
              We will take action to improve our service.
            </Text>
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col lg={6}>
        <Container size="xl" px={matches800 ? 60 : "sm"} pt={60}>
          <Group my={"xl"} position="center">
            <Image fit="contain" height={150} width={200} src={logo} />
          </Group>
          <Text size={25} pb="md">
            Oops ! Sorry to hear that you had a bad experience. Please let us
            know. We will take action to improve our service.
          </Text>
          <TextInput
            size="md"
            label="Complaint Title"
            placeholder="Enter Complaint Title"
            onChange={(e) => setComplaintTitle(e.target.value)}
            value={complaintTitle}
          />

          <Textarea
            py="xl"
            size="md"
            label="Write a Review"
            value={complaint}
            maxLength={400}
            onChange={(e) => setComplaint(e.currentTarget.value)}
            placeholder="Write at least 25 characters about your experience. Include any details that will help other couples make their hiring decision."
            autosize
            minRows={params.provider === "admin" ? 8 : 3}
            maxRows={params.provider === "admin" ? 8 : 4}
          />
          <Group position="right">
            <Button
              className="button"
              onClick={() => {
                if (params.complaintId) {
                  handleUpdate();
                } else {
                  handleSubmit();
                }
              }}
            >
              {params.complaintId ? "Update" : "Submit"}
            </Button>
          </Group>
        </Container>
      </Grid.Col>
    </Grid>
  );
};

export default AddComplaint;
