import {
  Center,
  Container,
  Grid,
  Group,
  Image,
  Input,
  Modal,
  Paper,
  Progress,
  Rating,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import ReviewImage from "./image2.jpg";
import { Button, createStyles } from "@mantine/core";
import React from "react";
const useStyles = createStyles(() => ({
  button: {
    backgroundColor: "#775A97",
    ":hover": {
      backgroundColor: "#56416D",
    },
  },
}));

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
  const { classes } = useStyles();

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

  const handleSubmit = () => {
    console.log("Submitted");
  };

  return (
    <Modal
      opened={true}
      // onClose={() => setOpened(false)}
      withCloseButton={false}
      fullScreen
      // size="100%"
    >
      <Grid
      // style={{
      //   // boxSizing: "border-box",
      //   margin: "0px",
      //   padding: "0px",
      // }}
      >
        {/* <Image src={ReviewImage} /> */}
        <Grid.Col lg={6}>
          <Paper
            sx={{
              // backgroundImage: `url("https://images.unsplash.com/photo-1485178075098-49f78b4b43b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")`,
              backgroundImage: `url(${ReviewImage})`,
              // width: "100%",
              height: "100vh",
            }}
            style={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack px={60}>
              <Text size={30} weight="bold" color="red" pr={150}>
                Review You Wedding Supplier
              </Text>

              <Text size={20} color="red" pr={100}>
                Sharing your experience by writing a review helps other couples
                choose their supplier.
              </Text>
            </Stack>

            {/* </Center> */}
          </Paper>
        </Grid.Col>
        <Grid.Col lg={6}>
          <Container size="xl" px="xl" pt="xl">
            <Text size={70} pb="xl">
              AWEP
            </Text>
            <Text size={25} pb="xl">
              Share your experience! Your review helps other Users choose their
              suppliers.
            </Text>
            {/* <Input.Wrapper label="Step" size="md" pb="lg">
              <Progress value={50} mt="sm" size="sm" />
            </Input.Wrapper> */}

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
              title="
              Value For Money"
              rating={valueForMoney}
              setRating={setValueForMoney}
            />
            <RatingComponent
              title="Flexibility"
              rating={flexibility}
              setRating={setFlexibility}
            />
            <Textarea
              py="xl"
              size="md"
              label="Write a Review"
              placeholder="Write at least 25 characters about your experience. Include any details that will help other couples make their hiring decision."
              autosize
              minRows={3}
              maxRows={4}
            />
            <Group position="right">
              <Button
                className={classes.button}
                radius="md"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Group>
          </Container>
        </Grid.Col>
      </Grid>
    </Modal>
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
