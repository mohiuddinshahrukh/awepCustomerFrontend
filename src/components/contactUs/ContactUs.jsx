import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  Container,
  Title,
  Overlay,
} from "@mantine/core";
import { ContactIconsList } from "./ContactIcons";
import bg from "./bg.svg";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");

  return {
    wrapper: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.md,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderTopRightRadius: "10px",
      borderBottomRightRadius: "10px",
      padding: theme.spacing.xl,
      flex: "0 0 450px",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: theme.spacing.xl,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },

    wrapper1: {
      position: "relative",
      paddingTop: 180,
      paddingBottom: 130,
      backgroundImage:
        "url(https://images.unsplash.com/photo-1587560699334-bea93391dcef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
      backgroundSize: "cover",
      backgroundPosition: "center",

      "@media (max-width: 520px)": {
        paddingTop: 80,
        paddingBottom: 50,
      },
    },

    inner: {
      position: "relative",
      zIndex: 1,
    },

    title1: {
      fontWeight: 800,
      fontSize: 40,
      letterSpacing: -1,
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      color: theme.white,
      marginBottom: theme.spacing.xs,
      textAlign: "center",
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      "@media (max-width: 520px)": {
        fontSize: 28,
        textAlign: "left",
      },
    },

    highlight: {
      color: theme.colors[theme.primaryColor][4],
    },

    description: {
      color: theme.colors.gray[0],
      textAlign: "center",

      "@media (max-width: 520px)": {
        fontSize: theme.fontSizes.md,
        textAlign: "left",
      },
    },

    controls: {
      marginTop: theme.spacing.xl * 1.5,
      display: "flex",
      justifyContent: "center",
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,

      "@media (max-width: 520px)": {
        flexDirection: "column",
      },
    },

    control1: {
      height: 42,
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginLeft: theme.spacing.md,
      },

      "@media (max-width: 520px)": {
        "&:not(:first-of-type)": {
          marginTop: theme.spacing.md,
          marginLeft: 0,
        },
      },
    },

    secondaryControl: {
      color: theme.white,
      backgroundColor: "rgba(255, 255, 255, .4)",

      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, .45) !important",
      },
    },
  };
});

const ContactUs = () => {
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const makeVenueBooking = async () => {
    console.log("MAKING THE BOOKING");
    const body = {
      name: name,
      email: email,
      message: message,
      subject: subject,
    };

    console.log("@@@body", body);

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };
    try {
      const response = await axios({
        method: "post",
        url: "https://a-wep.herokuapp.com/auth/user/contactEmail",
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper>
      <div className={classes.wrapper1}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title1}>Contact Us </Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              Have A Question or Need Assistance? <br />
              We Are Here To Help You With Anything You Need
            </Text>
          </Container>
        </div>
      </div>
      <Container size="xl">
        <Paper shadow="sm" my="sm">
          <div className={classes.wrapper}>
            <div className={classes.contacts}>
              <Title
                align="center"
                order={1}
                className={classes.title}
                sx={{ color: "white" }}
              >
                Contact information
              </Title>
              <ContactIconsList variant="white" />
            </div>

            <form
              className={classes.form}
              onSubmit={(event) => console.log("SUBMITTED", event)}
            >
              <Title align="center" className={classes.title}>
                Get in touch
              </Title>

              <div className={classes.fields}>
                <SimpleGrid
                  cols={1}
                  breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                >
                  <TextInput
                    label="Your name"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextInput
                    label="Your email"
                    placeholder="Enter Your Email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </SimpleGrid>

                <TextInput
                  mt="md"
                  label="Subject"
                  placeholder="Subject"
                  required
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                />

                <Textarea
                  mt="md"
                  label="Your message"
                  placeholder="Please include all relevant information"
                  minRows={7}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />

                <Group position="right" mt="md">
                  <Button
                    // variant="gradient"
                    // gradient={{ from: "#D61C1C", to: "#E62222" }}
                    className="button"
                    type="submit"
                    uppercase
                    onClick={() => makeVenueBooking()}
                  >
                    Send message
                  </Button>
                </Group>
              </div>
            </form>
          </div>
        </Paper>
      </Container>
    </Paper>
  );
};
export default ContactUs;
