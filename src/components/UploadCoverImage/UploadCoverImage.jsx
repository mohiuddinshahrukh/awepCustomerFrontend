import React from "react";
import { Avatar, Button, Progress } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import storage from "../fireBase/FB";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadCoverImage = (props) => {
  const previews = props.images?.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <div key={index}>
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
          animate={props.percentages[index] === 100 ? false : true}
          value={props.percentages[index] === 100 ? 100 : 100}
          label={props.percentages[index] === 100 && "100% Completed"}
          size="xl"
          radius="xl"
          color={props.percentages[index] === 100 ? "green" : "gray"}
        />
      </div>
    );
  });

  const handleUpload = (images) => {
    // setError("");
    // setPercentages([]);
    // setDisabled(true);
    // setDisabled2(true);

    if (images.length <= 0) {
      alert("Please choose a file first!");
    }

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      // alert("IN2");
      console.log("ITNI C BAAT ", storage);
      const storageRef = ref(
        storage,
        // `/users/${image.name}+${Math.random(999999)}`
        "/ASDA"
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          // percent = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {});
        }
      );
    }
    // alert("OUT");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Dropzone
        style={{
          height: "180px",
          width: "200px",
          backgroundColor: "#E0E0E0",
        }}
        onReject={(file) => {
          showNotification({
            color: "red",
            title: `COULD NOT UPLOAD`,

            message: `IMAGE SIZE IS TOO LARGE OR FILE SIZE IS TOO LARGE OR FILE TYPE IS NOT SUPPORTED`,
          });
        }}
        // radius={120}
        onDrop={(newImages) => {
          let newFilteredImages = [];
          newImages?.map((newImage) => {
            let addImage = true;
            props.images?.map((image) => {
              console.log("@COMPARE", newImage.path, image.path);
              console.log("@@OLD", image);
              console.log("@@New", newImage);
              if (newImage.path == image.path) {
                addImage = false;
                showNotification({
                  color: "yellow",
                  title: `IT'S ALREADY THERE!!`,

                  message: `THIS IMAGE IS ALREADY UPLOADED`,
                });
              }
            });
            if (addImage) {
              newFilteredImages.push(newImage);
              props.setImages(newFilteredImages);

              handleUpload(newFilteredImages);
            }
          });
        }}
        maxSize={3 * 1024 ** 3}
        // disabled={props.disabled}
        maxFiles={1}
        multiple={false}
        accept={[
          MIME_TYPES.jpeg,
          MIME_TYPES.png,
          MIME_TYPES.svg,
          MIME_TYPES.gif,
        ]}
      >
        {props.images.length < 1 && (
          <Avatar src="" size={150} radius={120} mx="auto" />
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
        hidden={props.disabled2}
        onClick={() => {
          props.setImages([]);
          props.setUrls("");
          props.setDisabled(false);
          props.setDisabled2(true);
          props.setDisabled3(false);
        }}
      >
        Remove
      </Button>
    </div>
  );
};

export default UploadCoverImage;
