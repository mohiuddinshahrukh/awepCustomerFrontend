import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import {
  Accordion,
  Avatar,
  Button,
  Grid,
  Group,
  Image,
  Input,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Progress,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconKey } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import storage from "../../../fireBase/FB";
import InputMask from "react-input-mask";
const fetchCustomerProfile = async () => {
  try {
    const apiResponse = await axios({
      method: "GET",
      url: "https://a-wep.herokuapp.com/auth/user/viewProfile",
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });

    console.log("1 API RESPONSE", apiResponse);

    if (apiResponse.data.status === "success") {
      console.log("2 API RESPONSE SUCCESS", apiResponse);
      return apiResponse.data.data;
    } else if (apiResponse.data.status === "error") {
      console.log("3 API RESPONSE ERROR", apiResponse);
    } else {
      console.log("4 Some other unknown error");
    }
  } catch (e) {
    console.log("fetchCustomerProfile error", e);
  }
};
const CustomerProfile = () => {
  useEffect(() => {
    console.count();
    fetchCustomerProfile().then(setCustomerProfile);
  }, []);
  const [urls, setUrls] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [percentages, setPercentages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [changepwdVisible, setChangepwdVisible] = useState(false);
  const [customerProfile, setCustomerProfile] = useState({});
  const [refresh3, setRefresh3] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [changed, setChanged] = useState(false);
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
  const form = useForm({
    initialValues: {
      CNIC: customerProfile?.CNIC,
      email: customerProfile?.email,
      name: customerProfile?.name,
      phone: customerProfile?.phone,
      profileImage: customerProfile?.profileImage,
      walletBalance: customerProfile?.walletBalance,
    },
    validate: {
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      cpassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      name: (value) =>
        value.trim().length > 1 && /^[a-zA-Z\s]*$/.test(value.trim())
          ? null
          : "Alphabetic Name with 2 or more characters",
      phone: (value) =>
        /^(03)(\d{9})$/.test(value)
          ? null
          : "11 digits Phone Number must start with 03",
      CNIC: (value) =>
        /^(\d{13})$/.test(value) ? null : "Please Enter 13 Digit CNIC Number",
    },
  });
  const form1 = useForm({
    validateInputOnChange: true,
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      currentPassword: (value, values) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      newPassword: (value, values) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? values.currentPassword !== value
            ? null
            : "The current password and new password cant be the same"
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  const updatePasswordMethod = async (values) => {
    setChangepwdVisible(true);
    try {
      let url = "https://a-wep.herokuapp.com/auth/user/updatePassword";
      let response = await axios({
        method: "patch",
        url: url,
        headers: { token: localStorage.getItem("userToken") },
        data: {
          oldPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      });
      console.log(response);
      if (response.data.status === "success") {
        showNotification({
          title: "SUCCESS",
          color: "green",
          message: "PASSWORD UPDATED SUCCESSFULLY",
        });
        form1.reset();
        setChangepwdVisible(false);
        setRefresh3(!refresh3);
      } else if (response.data.status === "error") {
        showNotification({
          title: "INVALID PASSWORD",
          color: "yellow",
          message:
            "PASSWORD COULD NOT BE UPDATED BECAUSE YOU HAVE ENTERED AN INVALID PASSWORD",
        });
        form1.setFieldError(
          "currentPassword",
          "The entered password is incorrect"
        );
        setChangepwdVisible(false);
      } else {
        showNotification({
          title: "ERROR",
          color: "red",
          message: "SOME INTERNAL ERROR",
        });
        setChangepwdVisible(false);
      }
    } catch (e) {
      console.error(e);
      setChangepwdVisible(false);
    }
    setChangepwdVisible(false);
  };
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
        `/users/${image?.name}+${Math.random(999999)}`
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
          });
        }
      );
    }
    // alert("OUT");
  };
  const handleSubmit = async (event) => {
    setVisible(true);
    setLoading(true);
    var { name, phone, cnic } = event;
    // console.log(event);
    if (
      customerProfile.name === name &&
      customerProfile.phone === phone &&
      customerProfile.CNIC === cnic &&
      customerProfile.profileImage === urls
    ) {
      setVisible(false);
      setChanged(false);
      console.log("No Changes");
      showNotification({
        title: `NO CHANGES SEEN`,
        color: "blue",

        message: "NOTHING WAS UPDATED",
      });
      // navigate("/users");

      setLoading(false);
      return;
    }

    const body = {
      name,
      phone,
      profileImage: urls,
      CNIC: cnic,
    };
    console.log("BODY INSIDE PATCH: ", body);

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios({
        method: "patch",
        url: `https://a-wep.herokuapp.com/auth/user/updateProfile`,
        data: body,
        headers: headers,
      });

      console.log("RESPONSE OBJECT: ", response);
      setLoading(false);

      if (response.data.status === "error") {
        setVisible(false);
        showNotification({
          title: `${response.data.error}`,
          color: "red",
          message: `${response.data.message}`,
        });
        setVisible(false);
      } else if (response.data.status === "success") {
        showNotification({
          title: `SUCCESS`,
          color: "green",
          message: `DETAILS UPDATED SUCCESSFULLY!!`,
        });
        let responses = response.data.data;
        let localStorageData = {
          CNIC: responses.CNIC,
          email: responses.email,
          id: responses._id,
          isEmailVerified: responses.isEmailVerified,
          isPhoneVerified: responses.isPhoneVerified,
          name: responses.name,
          phone: responses.phone,
          profileImage: responses.profileImage,
        };

        localStorage.setItem("userData", JSON.stringify(localStorageData));
        setVisible(false);
        // navigate("/");
      } else {
        showNotification({
          title: "THIS ERROR SHOULD NOT HAVE OCCURRED",
          color: "red",
          message: "DONT KNOW WHAT WENT WRONG!",
        });
        setVisible(false);
      }
    } catch (err) {
      console.log("TRY CATCH ERROR: ", err);
    }
  };
  return (
    <Paper withBorder w={"100%"} p="xl">
      <Title align="center">Your Profile Screen</Title>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid justify="flex-start">
          <Grid.Col lg={12} p="md">
            <Group position="center">
              <Input.Wrapper size="md" label="Profile Picture" error={error}>
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
                      // setRemove(false);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </Input.Wrapper>
            </Group>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col lg={6}>
            <TextInput
              size="md"
              label="Full Name"
              defaultValue={customerProfile.name}
              required
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col lg={6}>
            <TextInput
              size="md"
              disabled
              defaultValue={customerProfile.email}
              label="Email Address"
              required
              {...form.getInputProps("email")}
            />
          </Grid.Col>
          <Grid.Col lg={6}>
            <TextInput
              size="md"
              defaultValue={customerProfile.CNIC}
              label="CNIC"
              //   component={InputMask}
              //   mask="99999-9999999-9"
              required
              {...form.getInputProps("CNIC")}
            />
          </Grid.Col>
          <Grid.Col lg={6}>
            <TextInput
              size="md"
              defaultValue={customerProfile.phone}
              label="Contact Number"
              //   component={InputMask}
              //   mask="99999999999"
              required
              {...form.getInputProps("phone")}
            />
          </Grid.Col>
        </Grid>
        <Group position="right">
          {" "}
          <Button
            rightIcon={<IconEdit />}
            color={"dark"}
            size={"md"}
            type="submit"
          >
            Update Profile
          </Button>
        </Group>
      </form>

      <Grid pt={0} mt={0}>
        <Grid.Col lg={12} style={{ position: "relative" }}>
          <LoadingOverlay
            loaderProps={{ color: "grape", variant: "bars" }}
            visible={changepwdVisible}
          />
          <Accordion variant="contained" radius="xs" color="ffffff">
            <Accordion.Item value="customization">
              <Accordion.Control icon={<IconKey />}>
                <Text> Change Password</Text>
                <Text size="sm" color="dimmed" weight={400}>
                  It's a good idea to use a strong password that you don't use
                  elsewhere
                </Text>
              </Accordion.Control>

              <Accordion.Panel>
                <form
                  onSubmit={form1.onSubmit((values) =>
                    updatePasswordMethod(values)
                  )}
                >
                  <PasswordInput
                    size="md"
                    placeholder="Current Password"
                    label="Current Password"
                    required
                    onInput={(event) => {
                      if (event.target.value === form1.values.newPassword) {
                        form1.setFieldError(
                          "newPassword",
                          "CURRENT PASSWORD AND NEW PASSWORD CANT BE THE SAME"
                        );
                      } else {
                        form1.setFieldError("newPassword", "");
                      }
                    }}
                    {...form1.getInputProps("currentPassword")}
                  />
                  <PasswordInput
                    size="md"
                    placeholder="New Password"
                    label="New Password"
                    required
                    onInput={(event) => {
                      if (event.target.value !== form1.values.confirmPassword) {
                        form1.setFieldError(
                          "confirmPassword",
                          "New password and confrim password don't match"
                        );
                      } else {
                        form1.setFieldError("confirmPassword", "");
                      }
                    }}
                    {...form1.getInputProps("newPassword")}
                  />
                  <PasswordInput
                    size="md"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    required
                    onInput={(event) => {}}
                    {...form1.getInputProps("confirmPassword")}
                  />
                  <Group position="right">
                    <Button
                      my="md"
                      size="md"
                      color="dark"
                      type="submit"
                      uppercase
                      disabled={
                        form1.values.confirmPassword &&
                        form1.values.newPassword &&
                        form1.values.currentPassword &&
                        form1.values.currentPassword !==
                          form1.values.newPassword &&
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                          form1.values.currentPassword
                        ) &&
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                          form1.values.newPassword
                        ) &&
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                          form1.values.confirmPassword
                        ) &&
                        form1.values.newPassword ===
                          form1.values.confirmPassword
                          ? false
                          : true
                      }
                      rightIcon={<IconEdit />}
                    >
                      Update Password
                    </Button>
                  </Group>
                </form>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default CustomerProfile;
