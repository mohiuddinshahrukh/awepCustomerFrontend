// IMPORTS
import React, { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  ColorInput,
  Container,
  Group,
  Input,
  Modal,
  NumberInput,
  Progress,
  Select,
  Slider,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { Grid } from "@mantine/core";
import SliderComponent from "./SliderComponent";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconArrowDown,
  IconFilePlus,
} from "@tabler/icons";
// import { AlignCenter, AlignLeft, AlignRight } from "tabler-icons-react";
import QRCode from "react-qr-code";
import { DatePicker } from "@mantine/dates";
import moment from "moment";
import dayjs from "dayjs";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";
import storage from "../../../fireBase/FB";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

// PICTURE BACKGROUNDS
const pictureBackground = [
  new URL("./imgs/1.jpg", import.meta.url),
  new URL("./imgs/2.jpg", import.meta.url),
  new URL("./imgs/3.jpg", import.meta.url),
  new URL("./imgs/4.jpg", import.meta.url),
  new URL("./imgs/5.jpg", import.meta.url),
  // new URL("./imgs/6.jpeg", import.meta.url),
  // new URL("./imgs/7.jpeg", import.meta.url),
  new URL("./imgs/8.jpg", import.meta.url),
  new URL("./imgs/9.jpg", import.meta.url),
];

// COMPONENT
const CustomerBookingCardEditor = () => {
  const [qrCode, setQrCode] = useState("");
  const canvas = useRef(null);
  const [canvasAllTextAlign, setCanvasAllTextAlign] = useState("center");
  // HOOKS
  const [image, setImage] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventTypeError, setEventTypeError] = useState("");
  const [eventTypeOther, setEventTypeOther] = useState("");
  const [invitationName, setInvitationName] = useState("");
  const [eventTimeDuration, setEventTimeDuration] = useState("LUNCH");
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState(Date.now());
  const [eventRsvpName, setEventRsvpName] = useState("");
  const [venueName, setVenueName] = useState("");

  //  Y AXIS VALUES
  const [eventTypeY, setEventTypeY] = useState(100);
  const [invitationFromY, setInvitationFromY] = useState(150);
  const [eventTimeDurationY, setEventTimeDurationY] = useState(175);
  const [groomNameY, setGroomNameY] = useState(200);
  const [brideNameY, setBrideNameY] = useState(250);
  const [eventTimeY, setEventTimeY] = useState(300);
  const [eventDateY, setEventDateY] = useState(350);
  const [venueNameY, setVenueNameY] = useState(400);
  const [eventRsvpNameY, setEventRsvpNameY] = useState(450);
  const [weddingCardModal, setWeddingCardModal] = useState(false);
  //

  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [percentages, setPercentages] = useState([]);
  const [refresh2, setRefresh2] = useState(true);
  const [refresh3, setRefresh3] = useState(true);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [urls, setUrls] = useState();
  //
  // const [rsvpName, setRsvpName] = useState("Enter RSVP Name");
  const [color, setColor] = useState("#000000");
  const [downloadLink, setDownload] = useState("");
  // CANVAS FONT
  const [getFontSize, setFontSize] = useState(22);
  // CANVAS HEIGHT & WIDTH
  const [getWidth, setWidth] = useState(450);
  const [getHeight, setHeight] = useState(650);
  // ALIGNMENT FUNTION
  const alignTextHorizontalFunction = (position) => {
    if (position === "left") {
      setCanvasAllTextAlign("left");
      setVenueNameX(getWidth - getWidth);
      setEventTypeX(getWidth - getWidth);
      setInvitationFromX(getWidth - getWidth);
      setGroomNameX(getWidth - getWidth);
      setBrideNameX(getWidth - getWidth);
      setEventTimeX(getWidth - getWidth);
      setEventDateX(getWidth - getWidth);
      setEventRsvpNameX(getWidth - getWidth);
      setVenueNameX(getWidth - getWidth);
      setEventTimeDurationX(getWidth - getWidth);
    } else if (position === "center") {
      setCanvasAllTextAlign("center");
      setEventTypeX(getWidth / 2);
      setInvitationFromX(getWidth / 2);
      setGroomNameX(getWidth / 2);
      setBrideNameX(getWidth / 2);
      setEventTimeX(getWidth / 2);
      setEventDateX(getWidth / 2);
      setEventRsvpNameX(getWidth / 2);
      setVenueNameX(getWidth / 2);
      setEventTimeDurationX(getWidth / 2);
    } else {
      setCanvasAllTextAlign("right");
      setEventTypeX(getWidth);
      setInvitationFromX(getWidth);
      setGroomNameX(getWidth);
      setBrideNameX(getWidth);
      setEventTimeX(getWidth);
      setEventDateX(getWidth);
      setEventRsvpNameX(getWidth);
      setVenueNameX(getWidth);
      setEventTimeDurationX(getWidth);
    }
  };
  // X AXIS VALUES
  const [eventTypeX, setEventTypeX] = useState(getWidth / 2);
  const [invitationFromX, setInvitationFromX] = useState(getWidth / 2);
  const [eventTimeDurationX, setEventTimeDurationX] = useState(getWidth / 2);
  const [groomNameX, setGroomNameX] = useState(getWidth / 2);
  const [brideNameX, setBrideNameX] = useState(getWidth / 2);
  const [eventTimeX, setEventTimeX] = useState(getWidth / 2);
  const [eventDateX, setEventDateX] = useState(getWidth / 2);
  const [eventRsvpNameX, setEventRsvpNameX] = useState(getWidth / 2);
  const [venueNameX, setVenueNameX] = useState(getWidth / 2);

  // UPLOAD IMAGES METHOD
  const handleUpload = (images) => {
    setError("");
    setPercentages([]);
    setDisabled(true);
    setDisabled2(true);

    if (images.length <= 0) {
      alert("Please choose a file first!");
    }
    var percent = 0;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      // alert("IN2");
      const storageRef = ref(
        storage,
        `/users/${image.name}+${Math.random(999999)}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        () => {
          // download url
          let Percentages = percentages;
          Percentages[i] = percent;
          // alert(i);
          console.log(Percentages);
          //   alert(Percentages)
          setPercentages(Percentages);
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUrls(url);
            setRefresh(!refresh);
            setDisabled(false);
            setDisabled2(false);
            setError("");
            setImage(url);
          });
        }
      );
    }
    // alert("OUT");
  };
  const previews = images?.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
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
        <Progress
          animate={percentages[index] === 100 ? false : true}
          value={percentages[index] === 100 ? 100 : 100}
          label={percentages[index] === 100 && "100% Completed"}
          size="xl"
          radius="xl"
          color={percentages[index] === 100 ? "green" : "gray"}
        />
      </div>
    );
  });

  CanvasRenderingContext2D.prototype.wrapText = function (
    text,
    x,
    y,
    maxWidth,
    lineHeight
  ) {
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++) {
      var words = lines[i].split(" ");
      var line = "";
      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = this.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          this.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      this.fillText(line, x, y);
      y += lineHeight;
    }
  };
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image;
    console.log("@@@IMAGE 1", image);
    console.log("@@@IMAGE 2", img, img.src);
    console.log("@@@IMAGE 3", img.src);

    img.onload = function () {
      ctx.textAlign = `${canvasAllTextAlign}`;
      //clear canvas
      ctx.clearRect(0, 0, getWidth, getHeight);
      console.log("Current2123222222", canvas.current);
      ctx.drawImage(img, 0, 0, getWidth, getHeight);
      ctx.font = `${getFontSize}px Poppins`;
      ctx.fillStyle = color;
      ctx.wrapText(
        `${eventType !== "OTHER" ? eventType : eventTypeOther}`,
        eventTypeX,
        eventTypeY,
        500,
        40
      );
      ctx.wrapText(
        `${invitationName}`,
        invitationFromX,
        invitationFromY,
        500,
        40
      );
      ctx.wrapText(
        `${
          eventTimeDuration === "LUNCH"
            ? eventTimeDuration + " (3pm - 5pm)"
            : eventTimeDuration + " (7pm - 10pm)"
        }`,
        eventTimeDurationX,
        eventTimeDurationY,
        500,
        40
      );
      ctx.wrapText(`${groomName}`, groomNameX, groomNameY, 500, 40);
      ctx.wrapText(`${brideName}`, brideNameX, brideNameY, 500, 40);
      ctx.wrapText(`${eventTime}`, eventTimeX, eventTimeY, 500, 40);

      ctx.wrapText(
        `${moment(new Date(eventDate)).format("DD-MMMM-YYYY")}`,
        eventDateX,
        eventDateY,
        500,
        40
      );

      ctx.wrapText(`${venueName}`, venueNameX, venueNameY, 500, 40);
      ctx.wrapText(`${eventRsvpName}`, eventRsvpNameX, eventRsvpNameY, 500, 40);
      setDownload(canvas.current.toDataURL());
    };
  }, [
    canvasAllTextAlign,
    color,
    eventTimeDuration,
    eventTimeDurationX,
    eventTimeDurationY,
    eventTypeOther,
    eventType,
    eventTypeX,
    eventTypeY,
    eventDate,
    eventDateX,
    eventDateY,
    eventRsvpName,
    eventRsvpNameX,
    eventRsvpNameY,
    eventTime,
    eventTimeX,
    eventTimeY,
    getWidth,
    getHeight,
    getFontSize,
    invitationName,
    invitationFromX,
    invitationFromY,
    venueName,
    venueNameX,
    venueNameY,
    brideName,
    brideNameX,
    brideNameY,
    groomName,
    groomNameX,
    groomNameY,
    image,
    qrCode,
  ]);

  const saveMyCard = async () => {
    console.log("Inside api call");
    if (eventType === "") {
      showNotification({
        title: "error",
        message: "Please select event type",
        color: "red",
      });
      setEventTypeError(true);
    } else {
      setEventTypeError(false);
      try {
        const apiResponse = await axios({
          method: "POST",
          url: "https://a-wep.herokuapp.com/customer/saveWeddingCard",
          data: {
            ownedBy: JSON.parse(localStorage.getItem("customerData")).id,
            eventType: eventType,
            type: "template",
            fullCardData: {
              eventType,
              eventTypeOther,
              eventTimeDuration,
              invitationName,
              groomName,
              brideName,
              eventTime,
              eventDate,
              venueName,
              eventRsvpName,
              image,
              qrCode,
              canvasAllTextAlign,
              color,
              eventTypeX,
              eventTypeY,
              eventTimeDurationX,
              eventTimeDurationY,
              invitationFromX,
              invitationFromY,
              groomNameX,
              groomNameY,
              brideNameX,
              brideNameY,
              eventTimeX,
              eventTimeY,
              eventDateX,
              eventDateY,
              venueNameX,
              venueNameY,
              eventRsvpNameX,
              eventRsvpNameY,
              getWidth,
              getHeight,
              getFontSize,
            },
          },

          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("customerToken"),
          },
        });
        console.log("API RESPONSE", apiResponse);
        console.log("API RESPONSE", apiResponse.data);

        if (apiResponse.data.status === "success") {
          showNotification({
            title: "Success",
            message: "Card saved successfully",
            color: "green",
          });
          setWeddingCardModal(true);
        } else {
          showNotification({
            title: "Error",
            message: "An error occured, card not saved",
            color: "red",
          });
        }
      } catch (error) {
        console.log("An error occured");
        showNotification({
          title: "Error",
          message: "An error occured",
          color: "red",
        });
      }
    }
  };
  return (
    <Container size={"xl"} style={{ position: "relative" }} mb="xl">
      <Modal
        centered
        opened={weddingCardModal}
        onClose={() => {
          setWeddingCardModal(false);
        }}
      >
        <Title order={2} align={"center"}>
          Do you want to stay on this page or go to all cards page?
        </Title>
        <Grid mt={20}>
          <Grid.Col span={6}>
            <Button
              fullWidth
              className="button"
              uppercase
              onClick={() => {
                setWeddingCardModal(false);
              }}
            >
              Stay
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            {" "}
            <Button
              fullWidth
              uppercase
              component={Link}
              to={"/dashboard/viewWeddingCards"}
            >
              Leave
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
      <Title my={"lg"} align="center">
        Wedding Card Editor
      </Title>
      <Grid
        align={"center"}
        className="border"
        // style={{ border: "1px solid #eaeaea" }}
      >
        <Grid.Col lg={12} style={{}}>
          <Grid>
            <Grid.Col
              className="border"
              // style={{ border: "1px solid #eaeaea" }}
            >
              <Title order={4}>Choose an Image </Title>
              <Group position="left">
                {pictureBackground?.map((image, index) => {
                  return (
                    <img
                      key={index}
                      height={200}
                      alt=""
                      src={image}
                      onClick={() => setImage(image)}
                    />
                  );
                })}
              </Group>
            </Grid.Col>
            <Grid justify="flex-start">
              <Grid.Col lg={12}>
                <Input.Wrapper size="md" label="Upload Image" error={error}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      // alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Dropzone
                      style={{
                        height: "180px",
                        width: "200px",
                        backgroundColor: "#E0E0E0",
                      }}
                      // radius={120}
                      onDrop={(e) => {
                        setImages(e);
                        handleUpload(e);
                      }}
                      maxSize={3 * 1024 ** 2}
                      maxFiles={1}
                      multiple={false}
                      disabled={disabled}
                      accept={[
                        MIME_TYPES.jpeg,
                        MIME_TYPES.jpg,
                        MIME_TYPES.png,
                        MIME_TYPES.svg,
                        MIME_TYPES.gif,
                      ]}
                    >
                      {images.length < 1 && (
                        <Avatar
                          // key={index}
                          src={urls}
                          size={150}
                          radius={120}
                          mx="auto"
                        />
                      )}
                      {previews}
                    </Dropzone>
                    <Button
                      size="sm"
                      mt="sm"
                      compact
                      style={{
                        width: "200px",
                      }}
                      color="red"
                      hidden={disabled2}
                      onClick={() => {
                        setImages([]);
                        setUrls(
                          "https://firebasestorage.googleapis.com/v0/b/awep-dummy.appspot.com/o/defaultAvatar%2FDefaultAvatarForAllUsersWith%20No%20Profile%20Image.jpg%2B0.4989565837086003?alt=media&token=86eb4791-707e-4409-b6e8-dcc47caa2461"
                        );
                        setDisabled(false);
                        setDisabled2(true);
                        setImage(pictureBackground[0]);
                        // setRemove(false);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </Input.Wrapper>
              </Grid.Col>
            </Grid>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={6}>
          <Group align={"center"} position="center" mt={"lg"}>
            <div style={{ position: "relative" }}>
              <canvas ref={canvas} width={getWidth} height={670} />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 20,
                  height: "auto",
                  maxWidth: 75,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={qrCode}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </Group>
          <Group position="center">
            {localStorage.getItem("customerToken") && (
              <Button
                uppercase
                rightIcon={<IconFilePlus />}
                onClick={() => {
                  console.log("Do the apicall");

                  saveMyCard();
                }}
              >
                Save Card
              </Button>
            )}

            <Anchor variant="text" href={downloadLink} download>
              <Button uppercase rightIcon={<IconArrowDown />}>
                Download Card
              </Button>
            </Anchor>
          </Group>
        </Grid.Col>
        <Grid.Col lg={6} style={{ borderLeft: "1px solid #eaeaea" }}>
          <Grid>
            <Grid.Col lg={6}>
              <Select
                data={[
                  {
                    value: "MEHNDI",
                    label: "MEHNDI",
                  },
                  {
                    value: "BARAT",
                    label: "BARAT",
                  },
                  {
                    value: "WALIMA",
                    label: "WALIMA",
                  },
                  {
                    value: "SEMINAR",
                    label: "SEMINAR",
                  },
                  {
                    value: "OTHER",
                    label: "OTHER",
                  },
                ]}
                styles={{ input: { textAlign: "center" } }}
                placeholder="Enter Event Type"
                label="Event Name"
                error={eventTypeError ? "Please select an event type" : ""}
                value={eventType}
                onChange={setEventType}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                disabled={eventType === "OTHER" ? false : true}
                styles={{ input: { textAlign: "center" } }}
                placeholder="Enter Event Type"
                label="Event Name "
                value={eventTypeOther}
                onChange={(e) => {
                  setEventTypeOther(e.target.value);
                }}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <Select
                data={[
                  {
                    value: "LUNCH",
                    label: "Lunch",
                  },
                  {
                    value: "DINNER",
                    label: "Dinner",
                  },
                ]}
                placeholder="Select Event Time"
                styles={{ input: { textAlign: "center" } }}
                label="Event Time"
                defaultValue={eventTimeDuration}
                value={eventTimeDuration}
                onChange={setEventTimeDuration}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                placeholder="Enter Invitation From"
                styles={{ input: { textAlign: "center" } }}
                label="Invitaiton From"
                value={invitationName}
                onChange={(event) => {
                  setInvitationName(event.target.value);
                }}
              />
            </Grid.Col>

            <Grid.Col lg={6}>
              <TextInput
                placeholder="Enter Groom Name"
                styles={{ input: { textAlign: "center" } }}
                label="Groom Name"
                value={groomName}
                onChange={(event) => {
                  setGroomName(event.target.value);
                }}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                placeholder="Enter Bride Name"
                styles={{ input: { textAlign: "center" } }}
                label="Bride Name"
                value={brideName}
                onChange={(event) => {
                  setBrideName(event.target.value);
                }}
              />
            </Grid.Col>

            <Grid.Col lg={12}>
              <DatePicker
                placeholder="Enter Event Date"
                styles={{ input: { textAlign: "center" } }}
                label="Event Date"
                value={eventDate}
                onChange={setEventDate}
                minDate={dayjs(new Date())
                  .startOf("month")
                  .add(new Date().getDate() - 1, "days")
                  .toDate()}
                maxDate={dayjs(new Date()).add(365, "days").toDate()}
              />
            </Grid.Col>

            <Grid.Col lg={6}>
              <TextInput
                placeholder="Enter Venue Name"
                styles={{ input: { textAlign: "center" } }}
                label="Venue Name"
                value={venueName}
                onChange={(event) => {
                  setVenueName(event.target.value);
                }}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                placeholder="Enter Rsvp Name"
                styles={{ input: { textAlign: "center" } }}
                label="RSVP"
                value={eventRsvpName}
                onChange={(event) => setEventRsvpName(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col lg={12}>
              <TextInput
                placeholder="Enter Location For QR Code"
                styles={{ input: { textAlign: "center" } }}
                label="URL"
                value={qrCode}
                onChange={(event) => setQrCode(event.target.value)}
              />
            </Grid.Col>
          </Grid>
          <Grid align="flex-end">
            <Grid.Col lg={12}>Alignment Options</Grid.Col>
            <Grid.Col lg={3}>
              <Group>
                <ActionIcon
                  onClick={() => {
                    alignTextHorizontalFunction("left");
                  }}
                >
                  <IconAlignLeft />
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    alignTextHorizontalFunction("center");
                  }}
                >
                  <IconAlignCenter />
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    alignTextHorizontalFunction("right");
                  }}
                >
                  <IconAlignRight />
                </ActionIcon>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="Font size"
                min={12}
                value={getFontSize}
                max={50}
                onChange={setFontSize}
              />
            </Grid.Col>
            <Grid.Col className="colorPicker" span={3}>
              <ColorInput
                label="Font Color"
                value={color}
                onChange={setColor}
              />
            </Grid.Col>

            <Grid.Col lg={6}>
              <Text weight={500} size={"lg"}>
                X AXIS SETTINGS
              </Text>
              <Text>X Axis All Fields Setting</Text>
              <Slider
                label="Adjust All X Axis Values"
                onChange={(e) => {
                  setEventTypeX(eventTypeX + e);
                  setInvitationFromX(invitationFromX + e);
                  setGroomNameX(groomNameX + e);
                  setEventTimeDurationX(eventTimeDurationY + e);
                  setBrideNameX(brideNameX + e);
                  setEventTimeX(eventTimeX + e);
                  setEventDateX(eventDateX + e);
                  setEventRsvpNameX(eventRsvpNameX + e);
                  setVenueNameX(venueNameX + e);
                }}
              />
              <SliderComponent
                text="Adjust your EVENT name X Axis"
                color="grape"
                label="Set Event Type X Axis"
                value={eventTypeX}
                max={getHeight}
                setX={setEventTypeX}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust Event Time X Axis"
                color="grape"
                label="Set Event Time X Axis"
                value={eventTimeDurationX}
                max={getHeight}
                setX={setEventTimeDurationX}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust Invitation From X Axis"
                color="grape"
                label="Set Invitation From X Axis"
                value={invitationFromX}
                max={getHeight}
                setX={setInvitationFromX}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust GROOM NAME X Axis"
                color="grape"
                label="Set GROOM NAME X Axis"
                value={groomNameX}
                max={getHeight}
                setX={setGroomNameX}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust your BRIDE NAME X Axis"
                color="grape"
                label="Set BRIDE NAME X Axis"
                value={brideNameX}
                max={getHeight}
                setX={setBrideNameX}
                min={getFontSize}
              />

              {/*              <SliderComponent
                text="Adjust your EVENT TIME X Axis"
                color="grape"
                label="Set EVENT TIME X Axis"
                value={eventTimeX}
                max={getWidth}
                setX={setEventTimeX}
                min={getFontSize}
              />*/}

              <SliderComponent
                text="Adjust your EVENT DATE X Axis"
                color="grape"
                label="Set EVENT DATE X Axis"
                value={eventDateX}
                max={getWidth}
                setX={setEventDateX}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust your VENUE name X Axis"
                color="grape"
                label="Set Venue VENUE X Axis"
                value={venueNameX}
                max={getWidth}
                setX={setVenueNameX}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust your RSVP NAME X Axis"
                color="grape"
                label="Set Venue RSVP NAME X Axis"
                value={eventRsvpNameX}
                max={getWidth}
                setX={setEventRsvpNameX}
                min={getFontSize}
              />
            </Grid.Col>

            <Grid.Col lg={6}>
              <Text weight={500} size={"lg"}>
                Y AXIS SETTINGS
              </Text>
              <Text>Y Axis All Fields Setting</Text>
              <Slider
                label="Adjust All Y Axis Values"
                onChange={(e) => {
                  setEventTypeY(eventTypeY + e);
                  setInvitationFromY(invitationFromY + e);
                  setGroomNameY(groomNameY + e);
                  setEventTimeDurationY(eventTimeDurationY + e);
                  setBrideNameY(brideNameY + e);
                  setEventTimeY(eventTimeY + e);
                  setEventDateY(eventDateY + e);
                  setEventRsvpNameY(eventRsvpNameY + e);
                  setVenueNameY(venueNameY + e);
                }}
              />
              <SliderComponent
                text="Adjust your EVENT name Y Axis"
                color="grape"
                label="Set Event Type Y Axis"
                value={eventTypeY}
                max={getHeight}
                setX={setEventTypeY}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust Event Time Y Axis"
                color="grape"
                label="Set Event Time Y Axis"
                value={eventTimeDurationY}
                max={getHeight}
                setX={setEventTimeDurationY}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust Invitation From Y Axis"
                color="grape"
                label="Set Invitation From Y Axis"
                value={invitationFromY}
                max={getHeight}
                setX={setInvitationFromY}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust GROOM NAME Y Axis"
                color="grape"
                label="Set GROOM NAME Y Axis"
                value={groomNameY}
                max={getHeight}
                setX={setGroomNameY}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust your BRIDE NAME Y Axis"
                color="grape"
                label="Set BRIDE NAME Y Axis"
                value={brideNameY}
                max={getHeight}
                setX={setBrideNameY}
                min={getFontSize}
              />

              {/*              <SliderComponent
                text="Adjust your EVENT TIME Y Axis"
                color="grape"
                label="Set EVENT TIME Y Axis"
                value={eventTimeY}
                max={getHeight}
                setX={setEventTimeY}
                min={getFontSize}
              />
*/}
              <SliderComponent
                text="Adjust your EVENT DATE Y Axis"
                color="grape"
                label="Set EVENT DATE Y Axis"
                value={eventDateY}
                max={getHeight}
                setX={setEventDateY}
                min={getFontSize}
              />

              <SliderComponent
                text="Adjust your venue name Y Axis"
                color="grape"
                label="Set Venue Name Y Axis"
                value={venueNameY}
                max={getHeight}
                setX={setVenueNameY}
                min={getFontSize}
              />
              <SliderComponent
                text="Adjust your RSVP NAME X Axis"
                color="grape"
                label="Adjust your RSVP NAME X Axis"
                value={eventRsvpNameY}
                max={getHeight}
                setX={setEventRsvpNameY}
                min={getFontSize}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CustomerBookingCardEditor;
