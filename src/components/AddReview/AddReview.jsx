import {
  Center,
  Container,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import ReviewImage from "./image2.jpg";

const AddReview = () => {
  return (
    <Grid
      style={{
        boxSizing: "border-box",
        margin: "0px",
        padding: "0px",
      }}
    >
      {/* <Image src={ReviewImage} /> */}
      <Grid.Col md={6}>
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
          <Stack>
            <Text size={30} weight="bold" color="red">
              Review You Wedding Supplier
            </Text>

            <Text size={20} color="red">
              Sharing your experience by writing a review helps other couples
              choose their supplier.
            </Text>
          </Stack>

          {/* </Center> */}
        </Paper>
      </Grid.Col>
      <Grid.Col md={6}></Grid.Col>
    </Grid>
  );
};

export default AddReview;
