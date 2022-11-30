import {
  createStyles,
  Overlay,
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
  Grid,
  Image,
  Group,
} from "@mantine/core";
import { IconPoint } from "@tabler/icons";

import aliImage from "./assets/aliImage.jpeg";
import shahrukhImage from "./assets/shahrukhImage.png";
import talhaImage from "./assets/talhaImage.png";
import traImage from "./assets/traImage.jpg";

const color1 = "#F0F7F7";
const color2 = "#E0EFEF";

const data = [
  {
    image: aliImage,
    title: "",
    description: "",
    color: "",
  },
];

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingBottom: theme.spacing.xl,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

const AboutUs = () => {
  const { classes } = useStyles();
  return (
    <div>
      {" "}
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="xl">
          <Title className={classes.title}>About Us</Title>
          <Title order={2} color="white" my="md">
            Here at AWEP we have very simple goals to help our users
          </Title>
          <List
            styles={{
              item: {
                color: "white",
              },
            }}
            spacing="xl"
            size="xl"
            center
            icon={
              <ThemeIcon color="red" size={24} radius="xl">
                <IconPoint size={26} />
              </ThemeIcon>
            }
          >
            <List.Item>Saving Your Time</List.Item>
            <List.Item>Providing Business</List.Item>
            <List.Item>Centralizing Bookings</List.Item>
            <List.Item>24/7 Availability</List.Item>
          </List>
        </Container>
      </div>
      <Container
        mt="xl"
        size="xl"
        style={{
          backgroundColor: `${color1}`,
          position: "relative",
        }}
      >
        <Grid p="xl">
          <Grid.Col lg={6}>
            <Group position="center">
              <Image width="80%" src={traImage} />
            </Group>
          </Grid.Col>
          <Grid.Col lg={6}>
            <Group
              spacing="xs"
              style={{ width: "100%", height: "100%" }}
              position="center"
              align="center"
            >
              <Group position="center" align="center">
                <Title>TRA MANAGER</Title>
                <Text size="lg" align="justify">
                  I will describe myself as dynamic, versatile and
                  self-motivated with a 20+ years record of technical support
                  for the important industrial segment in Pakistan. I have
                  started my career from scratch in industrial engineering
                  company, SKF Pakistan as “Junior Sales Engineer” and was among
                  pioneer employee of the company, with basic objective to grow
                  company’s sales in heavy segment. Later, joined Schaeffler
                  Group Pakistan Office, as specialized person to look after
                  heavy segments technical support (Cement, Sugar, Paper, Oil
                  and Gas and Steel) in North of Pakistan. Now I am supporting
                  our sales in Pakistan and UAE (remote) and responsible for
                  Technical and sales support.
                </Text>
              </Group>
            </Group>
          </Grid.Col>
        </Grid>

        <Group position="center">
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderTop: `30px solid ${color1}`,
            }}
          ></div>
        </Group>
      </Container>
      <Container
        size="xl"
        style={{
          backgroundColor: `${color2}`,
          position: "relative",
        }}
      >
        <Grid p="xl">
          {" "}
          <Grid.Col lg={6}>
            <Group
              spacing="xs"
              style={{ width: "100%", height: "100%" }}
              position="center"
              align="center"
            >
              <Group position="center" align="center">
                <Title>ALI HASSAN ZAIDI</Title>
                <Text size="lg" align="justify">
                  Dedicated and professional Frontend Developer with 1-2 Years
                  of experience. Eager to contribute to team success through
                  hard work, attention to detail, and excellent organizational
                  skills. A clear understanding of Frontend technologies and
                  training in Freelance Web Development. Motivated to learn,
                  grow and excel in this domain.
                </Text>
              </Group>
            </Group>
          </Grid.Col>
          <Grid.Col lg={6}>
            <Group position="center">
              <Image width="80%" src={aliImage} />
            </Group>
          </Grid.Col>
        </Grid>

        <Group position="center">
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderTop: `30px solid ${color2}`,
            }}
          ></div>
        </Group>
      </Container>
      <Container
        size="xl"
        style={{
          backgroundColor: `${color1}`,
          position: "relative",
        }}
      >
        <Grid p="xl">
          <Grid.Col lg={6}>
            <Group position="center">
              <Image width="80%" src={shahrukhImage} />
            </Group>
          </Grid.Col>
          <Grid.Col lg={6}>
            <Group
              spacing="xs"
              style={{ width: "100%", height: "100%" }}
              position="center"
              align="center"
            >
              <Group position="center" align="center">
                <Title>SHAHRUKH MOHIUDDIN</Title>
                <Text size="lg" align="justify">
                  I am professional Senior Front End developer as a PSD2HTML
                  specialist since 2013, In my professional career i have done
                  more then 350 projects with different techniques, i have
                  strong grip on Bootstrap, Sass, Less, Zurb-Foundation, Jquery
                  and css3. If you want to convert your PSD, XD, AI, Zeplin,
                  Sketch, PNG or JPG file into responsive website you are at
                  right place and we can discuss the work and proceed.
                </Text>
              </Group>
            </Group>
          </Grid.Col>
        </Grid>

        <Group position="center">
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderTop: `30px solid ${color1}`,
            }}
          ></div>
        </Group>
      </Container>
      <Container
        size="xl"
        style={{
          backgroundColor: `${color2}`,
          position: "relative",
        }}
      >
        <Grid p="xl">
          {" "}
          <Grid.Col lg={6}>
            <Group
              spacing="xs"
              style={{ width: "100%", height: "100%" }}
              position="center"
              align="center"
            >
              <Group position="center" align="center">
                <Title>MUHAMMAD TALHA</Title>
                <Text size="lg" align="justify">
                  Hii, If you are facing any issue In your PHP | Laravel |
                  Codeigniter | WordPress or if you want to create a new website
                  then you are in the right place. As a professional web
                  developer with 3+ years of experience, I can build you a new
                  web app from scratch by using the latest technology. Also, I
                  can work on existing PHP | Laravel | Codeigniter | WordPress
                  websites for things like Install or migrate script on your
                  hosting Convert your static web app into the dynamic web app
                  Add new features or improve the current website Fix bugs from
                  your existing site Upgrade to the latest version Integrate the
                  application with external API such as Paypal, Stripe anything
                  else! (please message me with your issue)
                </Text>
              </Group>
            </Group>
          </Grid.Col>
          <Grid.Col lg={6}>
            <Group position="center">
              <Image width="80%" src={talhaImage} />
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
export default AboutUs;
