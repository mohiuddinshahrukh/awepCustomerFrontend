import {
  Button,
  Grid,
  Group,
  LoadingOverlay,
  TextInput,
  MantineProvider,
  Text,
  NativeSelect,
  PasswordInput,
  NumberInput,
  Container,
} from "@mantine/core";
import jwt_decode from "jwt-decode";
import { Box } from "@mantine/core";
import InputMask from "react-input-mask";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
// import signupBGimage from "./customerIMG.svg";

import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignUpSignInCarousel from "./SignUpSignInCarousel";
import {
  IconAt,
  IconCheck,
  IconId,
  IconKey,
  IconPhone,
  IconUser,
  IconX,
} from "@tabler/icons";
import GoogleSignUpButon from "./GoogleSignUpButon";

// NAVIGATION

const SignUp = ({
  setHookEmail,
  setHookPassword,
  closeModal,
  setIsSignUp,
  setIsSignIn,
}) => {
  // HOOKS
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("customer");

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [blockedEmailField, setBlockEmailField] = useState(false);
  const [blockedUserNameField, setBlockUserNameField] = useState(false);
  const [socialSignUpEmail, setSocialSignUpEmail] = useState("");
  const [socialSignUpName, setSocailSignUpName] = useState("");
  const [socialSignUpPicture, setSocialSignupPicture] = useState(
    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
  );

  const [cpassword, setCPassword] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [phone, setPhone] = useState("");
  const [getUserTypes, setUserTypes] = useState([
    { value: "customer", label: "Customer" },
    { value: "venueOwner", label: "Venue Owner" },
    { value: "vendor", label: "Vendor" },
  ]);

  const [hiddenButton, setHiddenButton] = useState(true);

  // STYLES HOOKS
  const [inputSize, setInputSize] = useState("md");
  const [paddingSize, setPaddingSize] = useState(5);
  //  USE EFFECT
  //   AXIOS POST DATA
  // SIGN UP FUNCTION
  const signUpFunction = async (values) => {
    var isEmailVerified = false;
    var googleSignInEnabled = false;
    if (blockedEmailField && blockedUserNameField) {
      values.email = socialSignUpEmail;
      values.fullName = socialSignUpName;
      isEmailVerified = true;
      googleSignInEnabled = true;
    }
    console.log("I have been clicked");
    setLoading(true);
    console.log("Values: ", values);
    const url = "https://a-wep.herokuapp.com/auth/user/signup";
    try {
      const response = await axios.post(url, {
        email: values.email,
        password: values.password,
        name: values.fullName,
        phone: values.phoneNumber,
        userType: userType,
        profileImage: socialSignUpPicture,
        isEmailVerified: isEmailVerified,
        googleSignInEnabled: googleSignInEnabled,
        CNIC: values.CNIC,
      });

      console.log("This is reponse object", response);
      if (response.status === 200) {
        setLoading(false);
        console.log("Request Sent", response.status);
        console.log("This is response.data: ", response.data.status);
        if (response.data.status === "success") {
          showNotification({
            color: "green",
            title: "SUCCESSFULLY SIGNED UP",
            message:
              "You have successfully signed up, we are redirecting you to the sign in page",
          });
          setHookEmail(values.email);
          setHookPassword(values.password);
          navigate("/signin");
          // if (closeModal) {
          //   setIsSignUp(false);
          // } else {
          //   navigate("/signin");
          // }
          // setInterval(() => {
          // }, 3000);
        } else if (response.data.status === "error") {
          console.log("This is the error wala response", response.data);
          setSocialSignUpEmail("");
          setSocialSignupPicture(
            "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
          );
          setSocailSignUpName("");
          setLoading(false);
          setPopoverOpened(false);
          setBlockEmailField(false);
          setBlockUserNameField(false);
          form.setFieldError("email", "This Email Already Exists");
          showNotification({
            color: "red",
            title: "SIGN UP UNSUCCESSFUL",
            message: `You faced the following error ${response.data.error.message}`,
          });
        }
      } else {
        setLoading(false);
        console.log("Request NOT Sent", response.status);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderErrorMessage = (name) => {
    if (errorMessages[name]) {
      return errorMessages[name];
    }
  };
  function PasswordRequirement({ meets, label }) {
    return (
      <Text
        color={meets ? "teal" : "red"}
        sx={{ display: "flex", alignItems: "center" }}
        mt={7}
        size="sm"
      >
        {meets ? <IconCheck size={14} /> : <IconX size={14} />}{" "}
        <Box ml={10}>{label}</Box>
      </Text>
    );
  }

  const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
  ];

  function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  //

  const strength = getStrength(password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  //   FORM
  const form = useForm({
    initialValues: {
      userType: "",
      email: blockedEmailField ? socialSignUpEmail : "",
      fullName: blockedUserNameField ? socialSignUpName : "",
      phoneNumber: "",
      password: "",
      CNIC: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      userType: (value) => (value !== "" ? "USER TYPE NISHTA PISHTA!" : null),
      email: (value) =>
        blockedEmailField
          ? null
          : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : "Invalid email",

      fullName: (value) =>
        value !== ""
          ? blockedUserNameField
            ? null
            : /^[A-Za-z ]+$/.test(value)
            ? value.length > 2
              ? null
              : "Name Should Contain Minimum 3 characters"
            : "Name Can Contain Only alphabets"
          : null,

      phoneNumber: (value) =>
        /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm.test(value)
          ? null
          : "Phone Number Incorrect",

      password: (value) =>
        /^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          value
        )
          ? null
          : "Password must be 8 characters long, contain atleast 1 upper case letter, 1 special & 1 digit",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      CNIC: (value) =>
        /^(\d{13})$/.test(value) ? null : "Please Enter 13 Digit CNIC Number",
    },
  });

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID TOKEN: ", response.credential);
    const userObject = jwt_decode(response.credential);
    console.log("JWT TOKEN RESPONSE AFTER DECODING: ", userObject);
    let email = userObject.email;
    let fullName = userObject.name;
    let profilePicture = userObject.picture;

    setBlockEmailField(true);
    setBlockUserNameField(true);
    setSocialSignUpEmail(email);
    setSocailSignUpName(fullName);
    setSocialSignupPicture(profilePicture);
  }

  // USEEFFECT
  useEffect(() => {
    console.count();
    console.log("USE EFFECT");
    /*global google */

    // google.accounts.id.initialize({
    //   client_id:
    //     "945681414378-gvgimi542ebg5d2q97i90j1sdf2tten9.apps.googleusercontent.com",
    //   callback: handleCallbackResponse,
    // });

    // google.accounts.id.renderButton(document.getElementById("signInDiv"), {
    //   theme: "filled_blue",
    //   size: "large",
    //   shape: "rectangular",
    //   text: "continue_with",
    //   width: "400",
    // });

    setHiddenButton(false);
    let token = localStorage.getItem("customerToken");
    if (token !== null && token !== "") {
      navigate("/");
    } else {
      return;
    }
  }, []);
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <Container size="xl" mt={"xl"}>
          <Grid align={"center"}>
            <Grid.Col lg={6}>
              <Grid>
                <Grid.Col>
                  <SignUpSignInCarousel />
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col style={{ position: "relative" }} lg={6}>
              <Grid>
                <Grid.Col>
                  <Text align="center" size={40}>
                    Sign-Up
                  </Text>
                </Grid.Col>
                <Grid.Col></Grid.Col>

                <Grid.Col>
                  <Group
                    position="center"
                    id="signInDiv"
                    hidden={hiddenButton}
                    style={{ transition: "2s", minHeight: "40px" }}
                  >
                    <GoogleSignUpButon />
                  </Group>
                </Grid.Col>

                <Grid.Col>
                  <div
                    style={{
                      width: "100%",
                      height: "20px",
                      borderBottom: "1px solid #eaeaea",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        backgroundColor: "#F3F5F6",
                        padding: "0 10px",
                        borderRadius: "100%",
                      }}
                    >
                      OR
                    </span>
                  </div>
                </Grid.Col>

                <Grid.Col md={12} lg={12} p="md">
                  <form
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                    onSubmit={form.onSubmit((values) => signUpFunction(values))}
                  >
                    <LoadingOverlay
                      loaderProps={{
                        size: "xl",
                        color: "pink",
                        variant: "bars",
                      }}
                      overlayOpacity={0.5}
                      overlayColor="#c5c5c5"
                      visible={loading}
                    />
                    <NativeSelect
                      icon={<IconUser />}
                      py={paddingSize}
                      label="Select User Type"
                      required
                      size={inputSize}
                      placeholder={
                        <Text style={{ color: "red" }}>Select User Type</Text>
                      }
                      value={userType}
                      data={getUserTypes}
                      onChange={(event) =>
                        setUserType(event.currentTarget.value)
                      }
                    />
                    <TextInput
                      icon={<IconAt />}
                      py={paddingSize}
                      size={inputSize}
                      required
                      disabled={blockedEmailField}
                      value={socialSignUpEmail}
                      label="Enter Email"
                      placeholder={
                        blockedEmailField ? socialSignUpEmail : "Enter Email"
                      }
                      {...form.getInputProps("email")}
                    />
                    <TextInput
                      icon={<IconUser />}
                      py={paddingSize}
                      size={inputSize}
                      required
                      disabled={blockedUserNameField}
                      value={socialSignUpName}
                      placeholder={
                        blockedUserNameField
                          ? socialSignUpName
                          : "Enter Full Name"
                      }
                      label="Enter Full Name"
                      {...form.getInputProps("fullName")}
                    />
                    <TextInput
                      icon={<IconPhone />}
                      py={paddingSize}
                      size={inputSize}
                      required
                      placeholder="Enter Mobile Number"
                      component={InputMask}
                      mask="03999999999"
                      label="Enter Mobile Number"
                      {...form.getInputProps("phoneNumber")}
                    />
                    <NumberInput
                      icon={<IconId />}
                      py={paddingSize}
                      size={inputSize}
                      label="Enter CNIC Number"
                      required
                      placeholder="Enter CNIC Number"
                      onInput={(e) => {
                        console.log(e.target.value);
                        setCNIC(e.target.value);
                      }}
                      component={InputMask}
                      mask="9999999999999"
                      hideControls
                      {...form.getInputProps("CNIC")}
                    />
                    <Grid>
                      <Grid.Col lg={6}>
                        {" "}
                        <PasswordInput
                          icon={<IconKey />}
                          py={paddingSize}
                          size={inputSize}
                          placeholder="Enter Password"
                          label="Password"
                          required
                          onInput={(e) => {
                            if (
                              e.target.value !== form.values.confirmPassword
                            ) {
                              form.setFieldError(
                                "confirmPassword",
                                "Passwords Do Not Match"
                              );
                            } else {
                              form.setFieldError("confirmPassword", "");
                            }
                          }}
                          {...form.getInputProps("password")}
                        />
                      </Grid.Col>
                      <Grid.Col lg={6}>
                        <PasswordInput
                          icon={<IconKey />}
                          py={paddingSize}
                          // error={renderErrorMessage("cpassword")}
                          size="md"
                          required
                          label="Confirm Password"
                          // disabled={disabled}
                          placeholder="Re-Enter Password"
                          value={cpassword}
                          errorProps={(v) => {
                            return v !== password;
                          }}
                          onChange={(e) => {
                            console.log("SHIT", e.target.value);
                            setCPassword(e.target.value);
                          }}
                          {...form.getInputProps("confirmPassword")}
                        />
                      </Grid.Col>
                    </Grid>
                    <Button
                      className="button"
                      my="md"
                      size={inputSize}
                      fullWidth
                      type="submit"
                      uppercase
                    >
                      Sign Up
                    </Button>
                  </form>
                </Grid.Col>
                <Grid.Col lg={12}>
                  <Group mt={0} p="sm">
                    <Box
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <Text
                        color="dimmed"
                        onClick={() => {
                          if (closeModal) {
                            setIsSignIn(true);
                            setIsSignUp(false);
                          } else {
                            navigate("/signin");
                          }
                        }}
                        size={18}
                      >
                        SIGN IN
                      </Text>
                    </Box>
                  </Group>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default SignUp;
