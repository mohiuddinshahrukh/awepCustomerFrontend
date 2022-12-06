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

const onSelect = (rating) => {
  if (rating.hoverValue > 0 && rating.value > 0) {
    if (rating.value < rating.hoverValue) {
      return "green";
    }
    if (rating.value > rating.hoverValue) {
      return "red";
    }
  }
  return "yellow";
};
const textValue = (rating) => {
  if (rating.hoverValue > 0) {
    return rating.hoverValue === 1
      ? "Bad"
      : rating.hoverValue === 2
      ? "Regular"
      : rating.hoverValue === 3
      ? "Acceptable"
      : rating.hoverValue === 4
      ? "Good"
      : rating.hoverValue === 5
      ? "Excellent"
      : "Excellent";
  } else {
    return rating.value === 1
      ? "Bad"
      : rating.value === 2
      ? "Regular"
      : rating.value === 3
      ? "Acceptable"
      : rating.value === 4
      ? "Good"
      : rating.value === 5
      ? "Excellent"
      : "Excellent";
  }
};
const starColor = (rating) => {
  // rating is an object { value: number, hoverValue: number }
  if (rating.hoverValue > 0) {
    return rating.hoverValue === 1
      ? "#BABABA"
      : rating.hoverValue === 2
      ? "#F5C357"
      : rating.hoverValue === 3
      ? "#FFAC5A"
      : rating.hoverValue === 4
      ? "#C1D759"
      : rating.hoverValue === 5
      ? "#48964D"
      : "#48964D";
  } else {
    return rating.value === 1
      ? "#BABABA"
      : rating.value === 2
      ? "#F5C357"
      : rating.value === 3
      ? "#FFAC5A"
      : rating.value === 4
      ? "#C1D759"
      : rating.value === 5
      ? "#48964D"
      : "#48964D";
  }
};

const AddReview = () => {
  const [feedbackDetails, setFeedbackDetails] = useState({});
  console.log("deererere", feedbackDetails);
  const fetchReviewDetails = async () => {
    try {
      let url;
      if (params.provider === "vendor") {
        url =
          "https://a-wep.herokuapp.com/customer/getMyVendorServiceFeedbacks";
      } else if (params.provider === "venue") {
        url = "https://a-wep.herokuapp.com/customer/getMyVenueFeedbacks";
      }
      const apiResponse = await axios({
        url: url,
        method: "GET",
        headers: { token: localStorage.getItem("customerToken") },
      });
      console.log("API Response", apiResponse);
      if (apiResponse.data.status === "success") {
        let retrievedData = apiResponse.data.data;
        let specificVendorReview = retrievedData.filter((review) => {
          return review._id === params.feedbackId;
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
    setQuality({
      value: feedbackDetails ? feedbackDetails.qualityOfService : 0,
      hoverValue: feedbackDetails ? feedbackDetails.qualityOfService : -1,
    });
    setResponse({
      value: feedbackDetails ? feedbackDetails.responseTime : 0,
      hoverValue: feedbackDetails ? feedbackDetails.responseTime : -1,
    });
    setProfessionalism({
      value: feedbackDetails ? feedbackDetails.professionalism : 0,
      hoverValue: feedbackDetails ? feedbackDetails.professionalism : -1,
    });
    setValueForMoney({
      value: feedbackDetails ? feedbackDetails.valueForMoney : 0,
      hoverValue: feedbackDetails ? feedbackDetails.valueForMoney : -1,
    });
    setFlexibility({
      value: feedbackDetails ? feedbackDetails.flexibility : 0,
      hoverValue: feedbackDetails ? feedbackDetails.flexibility : -1,
    });
    setReview(feedbackDetails ? feedbackDetails.customerReview : "");
  }, [feedbackDetails]);

  const [quality, setQuality] = useState({ value: 0, hoverValue: -1 });
  const [response, setResponse] = useState({ value: 0, hoverValue: -1 });
  const [professionalism, setProfessionalism] = useState({
    value: 0,
    hoverValue: -1,
  });
  const [valueForMoney, setValueForMoney] = useState({
    value: 0,
    hoverValue: -1,
  });
  const [flexibility, setFlexibility] = useState({ value: 0, hoverValue: -1 });
  const [review, setReview] = useState("");

  let navigate = useNavigate();
  const handleSubmit = async () => {
    console.log("MAKING THE BOOKING");
    let body;
    if (params.provider === "venue") {
      body = {
        subVenueBookingId: params.bookingId,
        customerReview: review,
        qualityOfService: quality.value,
        responseTime: response.value,
        professionalism: professionalism.value,
        valueForMoney: valueForMoney.value,
        flexibility: flexibility.value,
      };
    } else if (params.provider === "vendor") {
      body = {
        vendorPackageBookingId: params.bookingId,
        customerReview: review,
        qualityOfService: quality.value,
        responseTime: response.value,
        professionalism: professionalism.value,
        valueForMoney: valueForMoney.value,
        flexibility: flexibility.value,
      };
    } else if (params.provider === "admin") {
      body = {
        feedback: review,
        feedbackType: "feedback",
      };
    }

    console.log("@@@body", body);

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };

    var url = "";
    if (params.provider === "venue") {
      url = "https://a-wep.herokuapp.com/customer/addVenueFeedback";
    } else if (params.provider === "vendor") {
      url = "https://a-wep.herokuapp.com/customer/addVendorServiceFeedback";
    } else if (params.provider === "admin") {
      url = "https://a-wep.herokuapp.com/auth/user/addSystemFeedback";
    }
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
          title: `Successfully`,
          message: `SUB VENUE BOOKED SUCCESSFULLY!!`,
        });
        navigate("/");
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
        customerReview: review,
        qualityOfService: quality.value,
        responseTime: response.value,
        professionalism: professionalism.value,
        valueForMoney: valueForMoney.value,
        flexibility: flexibility.value,
      };
    } else if (params.provider === "vendor") {
      body = {
        customerReview: review,
        qualityOfService: quality.value,
        responseTime: response.value,
        professionalism: professionalism.value,
        valueForMoney: valueForMoney.value,
        flexibility: flexibility.value,
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
      url = `https://a-wep.herokuapp.com/customer/updateVenueFeedback/${params.feedbackId}`;
    } else if (params.provider === "vendor") {
      url = `https://a-wep.herokuapp.com/customer/updateVendorServiceFeedback/${params.feedbackId}`;
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
          title: `Successfully`,
          message: `Feed Back Added!!`,
        });
        navigate("/");
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
              Review You Wedding Supplier
            </Text>

            <Text size={20} color="white" pr={matches800 ? 100 : "md"}>
              Sharing your experience by writing a review helps other couples
              choose their supplier.
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
            Share your experience! Your review helps other Users choose their
            suppliers.
          </Text>
          {params.provider !== "admin" && (
            <>
              <RatingComponent
                title="Service Quality"
                rating={quality}
                setRating={setQuality}
              />
              <RatingComponent
                title="Responsiveness"
                rating={response}
                setRating={setResponse}
              />
              <RatingComponent
                title="Professionalism"
                rating={professionalism}
                setRating={setProfessionalism}
              />
              <RatingComponent
                title="Value For Money"
                rating={valueForMoney}
                setRating={setValueForMoney}
              />
              <RatingComponent
                title="Flexibility"
                rating={flexibility}
                setRating={setFlexibility}
              />
            </>
          )}
          <Textarea
            py="xl"
            size="md"
            label="Write a Review"
            value={review}
            maxLength={400}
            onChange={(e) => setReview(e.currentTarget.value)}
            placeholder="Write at least 25 characters about your experience. Include any details that will help other couples make their hiring decision."
            autosize
            minRows={params.provider === "admin" ? 8 : 3}
            maxRows={params.provider === "admin" ? 8 : 4}
          />
          <Group position="right">
            <Button
              className="button"
              onClick={() => {
                if (params.feedbackId) {
                  handleUpdate();
                } else {
                  handleSubmit();
                }
              }}
            >
              {params.feedbackId ? "Update" : "Submit"}
            </Button>
          </Group>
        </Container>
      </Grid.Col>
    </Grid>
  );
};

export default AddReview;

const RatingComponent = ({ title, rating, setRating }) => {
  return (
    <Grid align="center" justify="center">
      <Grid.Col xs={6}>
        <Group noWrap>
          <IconInfoCircle size={18} color="grey" />
          <Text size="lg" weight="500">
            {title}
          </Text>
        </Group>
      </Grid.Col>
      <Grid.Col xs={6}>
        <Group noWrap position="apart">
          <Rating
            color={onSelect(rating)}
            size="md"
            value={rating.value}
            onChange={(e) => setRating((prev) => ({ ...prev, value: e }))}
            onHover={(e) => setRating((prev) => ({ ...prev, hoverValue: e }))}
          />
          {(rating.value !== 0 || rating.hoverValue !== -1) && (
            <div>
              <Text
                align="center"
                size="md"
                color="white"
                weight="600"
                style={{
                  width: "120px",
                  borderRadius: "4px",
                  backgroundColor: `${starColor(rating)}`,
                }}
              >
                {textValue(rating)}
              </Text>
            </div>
          )}
        </Group>
      </Grid.Col>
    </Grid>
  );
};
