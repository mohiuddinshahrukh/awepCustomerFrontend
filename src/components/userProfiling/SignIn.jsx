// IMPORTS
import { Stepper, Container } from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import InputMask from "react-input-mask";
import { useForm } from "@mantine/form";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";
import { setToken } from "../../features/authToken";
import {
  Accordion,
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  MantineProvider,
  Modal,
  NumberInput,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
// import { Email } from "@material-ui/icons";
import FooterComponenet from "./FooterComponenet";
import SignUpSignInCarousel from "./SignUpSignInCarousel";
import {
  IconAt,
  IconCheck,
  IconEdit,
  IconKey,
  IconMail,
  IconMessage,
  IconPhoneX,
  IconShieldLock,
  IconUserX,
} from "@tabler/icons";
import GoogleSignUpButon from "./GoogleSignUpButon";
import { socket } from "../Socket/Socket";
import { io } from "socket.io-client";

const pictureBackground = [
  new URL("./customerIMG1.png", import.meta.url),
  //   new URL("./menuBackground4.png", import.meta.url),
  //   new URL("./menuBackground5.png", import.meta.url),
  //   new URL("./menuBackground.png", import.meta.url),
  //   new URL("./menuBackground.png", import.meta.url),
  //
];
// NAVIGATION
const SignIn = ({
  email,
  password,
  closeModal,
  setIsSignIn,
  setIsSignUp,
  signedIn,
  setSignedIn,
}) => {
  // DISPATCH
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // HOOKS
  const [opened, setOpened] = useState();
  const [refresh, setRefresh] = useState(true);
  const [visible, setVisible] = useState(false);
  const [getUserType, setUserType] = useState("");
  const [inputSize, setInputSize] = useState("md");
  const [paddingSize, setPaddingSize] = useState(5);
  const [modalEmail, setModalEmail] = useState("");
  const [modalButtonCode, setModalButtonCode] = useState(false);
  const [modalButtonEmail, setModalButtonEmail] = useState(false);
  const [getverificationCode, setVerificationCode] = useState("");
  const [getModalPhoneNumber, setModalPhoneNumber] = useState(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(email);

  // FORGOT PASSWORD LOGIC
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [newForgotPasswordEmail, setNewForgotPasswordEmail] = useState();
  const [forgotPasswordFourDigitCode, setForgotPasswordFourDigitCode] =
    useState();
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const [refresh3, setRefresh3] = useState(true);
  const [forgotPasswordButtonStateStep1, setForgotPasswordButtonStateStep1] =
    useState(false);
  const [forgotPasswordButtonStateStep2, setForgotPasswordButtonStateStep2] =
    useState(false);
  const [forgotPasswordButtonStateStep3, setForgotPasswordButtonStateStep3] =
    useState(false);

  const [verificationModal, setVerificationModal] = useState(false);

  // MODAL
  const [phoneAccordion, setPhoneAccordion] = useState(false);
  const [emailAccordion, setEmailAccordion] = useState(false);
  const [verificationCodeButton, setVerificationCodeButton] = useState(false);

  // FUNCTIONS
  const submitVerificationCode = async (values) => {
    setVerificationCodeButton(true);
    console.log(values);
    try {
      setInterval(() => {
        setVerificationCodeButton(false);
      }, 60000);
      let url = "https://a-wep.herokuapp.com/auth/user/verifySMS";
      let response = await axios.post(url, {
        fourDigitCode: values.code,
        email: modalEmail,
      });
      console.log(response);
      if (response.data.status === "error") {
        console.log("error");
        if (response.data.message === "Token Expired") {
          showNotification({
            title: "VERIFICATION CODE EXPIRED",
            color: "yellow",
            message:
              "YOUR VERIFICATION CODE WAS NOT ENTERED WITHIN GIVEN TIME AND HAS EXPIRED",
          });
        } else {
          console.log(
            "Some other shitty error like code doesnt match the shit!"
          );
        }
      } else if (response.data.status === "success") {
        console.log("Verified the number successfully");
        showNotification({
          title: "VERIFIED",
          color: "green",
          message: "PHONE NUMBER VERIFIED SUCCESSFULLY",
        });
        setVerificationModal(false);
      } else {
        console.log("HONESTLY DONT KNOW WHY THE FUCK THIS RAN!");
      }
    } catch (error) {
      console.error("ERROR IN API CALL: ", error);
      showNotification({
        title: "ERROR",
        color: "red",
        message:
          "SORRY FOR INCONVENIENCE AWEP IS CURRENTLY UNDERGOING SOME MAINTAINANCE",
      });
    }
  };
  // FORM
  const form = useForm({
    initialValues: {
      userType: getUserType,
      email: email,
      password: password,
    },

    validate: {
      email: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : "Invalid email",
      password: (value) =>
        /^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          value
        )
          ? null
          : "Password must contain 1 upper case letter, 1 special & 1 digit",
    },
  });

  // SIGN IN FUNCTION
  const signInFunction = async (values) => {
    setVisible(true);
    console.log("Values passed to function: ", values);
    let email = values.email;
    let password = values.password;
    try {
      let url = `https://a-wep.herokuapp.com/auth/user/checkUserVerification/${email}`;
      let response = await axios.get(url);
      console.log(response);
      if (response.data.status === "success") {
        let verify = response.data.data;
        if (
          verify.isEmailVerified === true &&
          verify.isPhoneVerified === true
        ) {
          // email and phone verified
          console.log("Phone and email both verified");
          console.log("Proceed to login");
          try {
            let url = "https://a-wep.herokuapp.com/auth/user/signin";
            let response = await axios.post(url, {
              email: email,
              password: password,
            });
            console.log("Sign in API RESPONSE", response);

            if (
              response.data.status === "error" &&
              response.data.error?.message
            ) {
              showNotification({
                title: "INVALID PASSWORD",
                color: "yellow",
                message: "YOU HAVE ENTERD AN INCORRECT PASSWORD",
              });
              form.setErrors({
                password: "You have entered an incorrect password",
              });
              setVisible(false);
            } else if (
              response.data.status === "success" &&
              response.data.data.userType === "customer"
            ) {
              showNotification({
                title: "Successful Login",
                color: "green",
                message: "Login Successful",
              });
              setSignedIn(!signedIn);
              setVisible(false);
              dispatch(
                login({
                  id: response.data.data.id,
                  userType: response.data.data.userType,
                  email: response.data.data.email,
                  CNIC: response.data.data.CNIC,
                  name: response.data.data.name,
                  phone: response.data.data.phone,
                  profileImage: response.data.data.profileImage,
                  isEmailVerified: response.data.data.isEmailVerified,
                  isPhoneVerified: response.data.data.isPhoneVerified,
                  token: response.data.token,
                })
              );
              dispatch(setToken({ token: response.data.token }));
              localStorage.setItem("customerToken", response.data.token);
              localStorage.setItem(
                "navbarState",
                JSON.stringify({ navbarState: true })
              );
              localStorage.setItem(
                "customerData",
                JSON.stringify(response.data.data)
              );

              try {
                socket.socket = io("https://a-wep.herokuapp.com", {
                  // export const socket = io("192.168.10.18:8081", {
                  // export const socket = io("http://localhost:8081", {
                  auth: {
                    token: response.data.token,
                  },
                });
              } catch (e) {
                console.log("Socket ERROR: ", e);
              }

              // if (closeModal) {
              // } else {
              //   navigate("/");
              // }
              navigate("/dashboard");
            } else if (
              response.data.status === "success" &&
              response.data.data.userType !== "customer"
            ) {
              console.log(
                "NO LOGIN COS BLOODY USERTYPE IS: ",
                response.data.data.userType
              );
              showNotification({
                title: "ERROR",
                color: "red",
                message:
                  "YOU DONT HAVE THE REQUIRED ACCESS TO LOGIN WITH THIS EMAIL",
              });
              form.setFieldError(
                "email",
                `You cannot sign in as customer with this email`
              );

              setVisible(false);
            } else {
              console.log("Some error occurred while trying to login the user");
              showNotification({
                title: "ERROR",
                color: "red",
                message: "We are facing some issues while trying to log you in",
              });
              setVisible(false);
            }

            setVisible(false);
          } catch (error) {
            console.error("Error from try catch block");
          }

          // Phone Unverified
        } else if (
          verify.isEmailVerified === true &&
          verify.isPhoneVerified === false
        ) {
          showNotification({
            title: "PHONE NUMBER UNVERIFIED",
            color: "yellow",
            message: "PLESAE VERIFY YOUR PHONE NUMBER",
          });
          setModalEmail(email);
          setEmailAccordion(true);
          setVerificationModal(true);
          console.log("Email Verified but phone not");
          setVisible(false);
        }

        // Email Unverified
        else if (
          verify.isEmailVerified === false &&
          verify.isPhoneVerified === true
        ) {
          showNotification({
            title: "EMAIL ADDRESS UNVERIFIED",
            color: "yellow",
            message: "PLESAE VERIFY YOUR EMAIL ADDRESS",
          });
          setModalEmail(email);
          setVerificationModal(true);
          setPhoneAccordion(true);
          setVisible(false);
        }
        // Phone and email both unverified
        else {
          console.log("Phone and email both unverified");
          showNotification({
            title: "EMAIL & PHONE UNVERIFIED",
            color: "yellow",
            message: "PLESAE VERIFY YOUR EMAIL & PHONE",
          });
          setModalEmail(email);

          setVerificationModal(true);
          setVisible(false);
        }
      }
      // Email doesnt exist
      else {
        showNotification({
          title: "THIS EMAIL DOESNT EXIST!",
          color: "yellow",
          message: "SORRY THIS EMAIL DOESNT EXIST IN OUR SYSTEM",
        });
        form.setErrors({ email: "This Email doesnt exist" });
        setVisible(false);
        setModalEmail(email);
      }
    } catch (error) {
      console.error("There was an error", error);
      showNotification({
        title: "ERROR",
        color: "red",
        message:
          "SORRY FOR INCONVENIENCE AWEP IS CURRENTLY UNDERGOING SOME MAINTAINANCE",
      });
      setVisible(false);
    }
  };

  const sendVerificationEmail = async () => {
    let url = "https://a-wep.herokuapp.com/auth/user/emailVerification";
    try {
      const response = await axios.post(url, {
        email: modalEmail,
      });
      console.log(response);
      if (response.status === 200) {
        console.log("The Response status is: ", response.status);
        showNotification({
          title: "Verification Email Sent Successfully",
          color: "green",
          message:
            "The Email Verification Link has been sent to your email successfully",
        });
        setModalButtonEmail(true);
        setTimeout(() => {
          setModalButtonEmail(false);
        }, 60000);
      } else {
        console.log("Some error came ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // NumberInputVerify
  const forgotPasswordFormStep1 = useForm({
    initialValues: {
      forgotPasswordEmail: "",
    },
    validate: {
      forgotPasswordEmail: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : "Invalid email",
    },
  });
  const forgotPasswordFormStep2 = useForm({
    initialValues: {
      fourDigitCode: "",
    },
    validate: {
      fourDigitCode: (value) =>
        /^[0-9]*$/.test(value) ? null : "Invalid code",
    },
  });

  // FORGOT PASSWORD STEP 1
  const forPasswordStep1 = async (values) => {
    setForgotPasswordButtonStateStep1(true);
    const response = await axios.post(
      "https://a-wep.herokuapp.com/auth/generateEmailForPasswordReset",
      { email: values.forgotPasswordEmail }
    );
    console.log("RESPONSE: ", response);
    if (response.data.status === "success") {
      // console.log("RESPONSE", response.data.data);
      setForgotPasswordButtonStateStep1(false);
      nextStep();
    } else if (
      response.data.status === "error" &&
      response.data.error.title === "INVALID_EMAIL"
    ) {
      forgotPasswordFormStep1.setFieldError(
        "forgotPasswordEmail",
        "This email is not registered"
      );
      setForgotPasswordButtonStateStep1(false);
    } else {
    }
  };
  // FORGOT PASSWORD STEP 2
  const forPasswordStep2 = async (values) => {
    setForgotPasswordButtonStateStep2(true);
    try {
      const response = await axios.post(
        "https://a-wep.herokuapp.com/auth/verifyCodeEmailForPasswordReset",
        {
          email: forgotPasswordFormStep1.values.forgotPasswordEmail,
          fourDigitCode: values.fourDigitCode,
        }
      );
      console.log("RESPONSE: ", response);
      if (response.data.status === "success") {
        // console.log("RESPONSE", response.data.data);
        setForgotPasswordButtonStateStep2(false);
        nextStep();
      } else {
        forgotPasswordFormStep2.setFieldError(
          "fourDigitCode",
          "Incorrect 4 digit code entered"
        );
        setForgotPasswordButtonStateStep2(false);
      }
    } catch (e) {
      setForgotPasswordButtonStateStep2(false);
      console.log("CONNECTION ERROR");
    }
  };
  // FORGOT PASSWORD STEP 3
  const forgotPasswordFormStep3 = useForm({
    validateInputOnChange: true,
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validate: {
      newPassword: (value, values) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
          value
        ) || value === ""
          ? null
          : "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });
  const updatePasswordMethod = async (values) => {
    try {
      let url = "https://a-wep.herokuapp.com/auth/resetPassword";
      console.log(
        newForgotPasswordEmail,
        forgotPasswordFourDigitCode,
        values.newPassword,
        forgotPasswordFormStep2.values.fourDigitCode
      );

      let response = await axios.post(url, {
        email: newForgotPasswordEmail,
        fourDigitCode: forgotPasswordFormStep2.values.fourDigitCode,
        password: values.newPassword,
      });
      console.log(response);
      if (response.data.status === "success") {
        showNotification({
          title: "SUCCESS",
          color: "green",
          message: "New Password Successfully Set",
        });
        forgotPasswordFormStep1.reset();
        forgotPasswordFormStep2.reset();
        forgotPasswordFormStep3.reset();
        setForgotPasswordModal(false);
        setRefresh3(!refresh3);
      } else if (response.data.status === "error") {
        // showNotification({
        //   title: "INVALID PASSWORD",
        //   color: "yellow",
        //   message:
        //     "PASSWORD COULD NOT BE UPDATED BECAUSE YOU HAVE ENTERED AN INVALID PASSWORD",
        // });
        // form1.setFieldError(
        //   "currentPassword",
        //   "The entered password is incorrect"
        // );
        console.log("ERROR STATUS: ", response.data.data);
      } else {
        showNotification({
          title: "ERROR",
          color: "red",
          message: "SOME INTERNAL ERROR",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  // const forPasswordStep3 = async (values) => {
  //   setForgotPasswordButtonStateStep3(true);
  //   const response = await axios.post(
  //     "https://a-wep.herokuapp.com/auth/generateEmailForPasswordReset",
  //     { email: values.forgotPasswordEmail }
  //   );
  //   console.log("RESPONSE: ", response);
  //   if (response.data.status === "success") {
  //     // console.log("RESPONSE", response.data.data);
  //     setForgotPasswordButtonStateStep3(false);
  //     nextStep();
  //   } else if (
  //     response.data.status === "error" &&
  //     response.data.error.title === "INVALID_EMAIL"
  //   ) {
  //     forgotPasswordFormStep3.setFieldError(
  //       "forgotPasswordEmail",
  //       "This email is not registered"
  //     );
  //     setForgotPasswordButtonStateStep3(false);
  //   } else {
  //   }
  // };

  const form1 = useForm({
    initialValues: {
      code: "",
    },
  });

  // Phone verification
  const sendVerificationCode = async () => {
    console.log("Phone verification method");
    let email = modalEmail;
    try {
      let url =
        "https://a-wep.herokuapp.com/auth/user/generateSMSforPhoneVerification";
      let response = await axios.post(url, {
        email: email,
      });
      console.log(response);

      if (response.data.status === "success") {
        showNotification({
          title: "SMS SENT SUCCESSFULLY",
          color: "green",
          message: `SMS has been sent successfully with 4 digit code to the number ${response.data.data.phone}`,
        });
        setModalPhoneNumber(response.data.data.phone);
        console.log(response.data.data.fourDigitCode);
      } else if (response.data.status === "error") {
        showNotification({
          title: "FAILED TO SEND SMS TO CONTACT",
          color: "yellow",
          message: `You have faced the following error: ${response.data.error.message}`,
        });
      } else {
        showNotification({
          title: "ERROR",
          color: "red",
          message:
            "WE ARE FACING SOME ERROR AT THE MOMENT, PLEASE TRY AGAIN LATER",
        });
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // SOCIAL SIGN UP
  const socialSignUpFunction = async (token) => {
    setVisible(true);
    console.log("We are in social sign up function with token: ", token);
    try {
      let url = "https://a-wep.herokuapp.com/auth/user/googleSignIn";
      let response = await axios.post(url, {
        googleToken: token,
      });
      console.log("API CALL RESPONSE for socialSignUpFunction(): ", response);
      if (response.status === 200) {
        if (response.data.status === "success") {
          setForgotPasswordEmail(response.data.data.email);
          showNotification({
            title: "SUCCESS",
            color: "green",
            message: "SUCCESSFULLY LOGGED INTO AWEP SUPER ADMIN DASHBOARD",
          });
          setVisible(false);
          dispatch(
            login({
              id: response.data.data.id,
              userType: response.data.data.userType,
              email: response.data.data.email,
              CNIC: response.data.data.CNIC,
              name: response.data.data.name,
              phone: response.data.data.phone,
              profileImage: response.data.data.profileImage,
              isEmailVerified: response.data.data.isEmailVerified,
              isPhoneVerified: response.data.data.isPhoneVerified,
              token: response.data.token,
            })
          );
          dispatch(setToken({ token: response.data.token }));

          localStorage.setItem("customerToken", response.data.token);
          localStorage.setItem(
            "customerData",
            JSON.stringify(response.data.data)
          );

          window.location = "/";
          // TOKEN SHIT HERE TOO!
        } else if (response.data.status === "error") {
          showNotification({
            title: "ERROR",
            color: "red",
            message: `YOU HAVE FACED THE FOLLOWING PROBLEM ${response.data.error.message}`,
          });
          setVisible(false);
        } else {
          console.log("Some other shitty error i swear!");
          showNotification({
            title: "error",
            color: "red",
            message: "Some shit error",
          });
          setVisible(false);
        }
      }
    } catch (error) {
      console.error();
      setVisible(false);
    }
  };

  // JWT TOKEN
  function handleCallbackResponse(response) {
    console.log(response);
    console.log("Encoded JWT ID TOKEN: ", response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    socialSignUpFunction(response.credential);
  }
  // USEEFFECT
  useEffect(() => {
    console.count();
    console.log("HERE IN USEEFFECT");
    if (refresh) {
      //   /*global google */
      //   google.accounts.id.initialize({
      //     client_id:
      //       "945681414378-gvgimi542ebg5d2q97i90j1sdf2tten9.apps.googleusercontent.com",
      //     callback: handleCallbackResponse,
      //   });
      //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      //     theme: "filled_blue",
      //     size: "large",
      //     shape: "rectangular",
      //     width: "400",
      //     text: "continue_with",
      //   });
      //   setRefresh(false);
    }

    let token = localStorage.getItem("customerToken");
    if (token !== null && token !== "") {
      navigate("/");
    }

    return console.log("THIS IS OUR CLEAN UP");
  }, [refresh]);

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        {/* Forgot Password Modal*/}
        <Modal
          title={<Title align="left">Forgot Your Password?</Title>}
          opened={forgotPasswordModal}
          onClose={() => {
            setNewForgotPasswordEmail("");
            setForgotPasswordFourDigitCode("");
            forgotPasswordFormStep3.setFieldValue("confirmPassword", "");
            forgotPasswordFormStep3.setFieldValue("newPassword", "");
            setForgotPasswordModal(false);
          }}
          styles={{
            close: {
              color: "black",
              backgroundColor: "#EAEAEA",
              borderRadius: "50%",
              "&:hover": {
                transition: "50ms",
                color: "white",
                backgroundColor: "red",
              },
            },
          }}
          centered
          padding="lg"
          size={`xl` * 2}
        >
          <Text size="xl" my="md">
            No Worries! We Will Help You Recover Your Account In <b>3</b> Simple
            Steps
          </Text>
          <Container>
            <Stepper
              size={inputSize}
              color="grape"
              my="md"
              active={active}
              onStepClick={setActive}
              breakpoint="sm"
            >
              <Stepper.Step label="Enter Your Email">
                <form
                  onSubmit={forgotPasswordFormStep1.onSubmit((values) => {
                    console.log("Values: ", values);
                    forPasswordStep1(values);
                  })}
                >
                  <TextInput
                    icon={<IconAt />}
                    size={inputSize}
                    py={paddingSize}
                    label="Enter Email"
                    placeholder="Enter Email"
                    required
                    value={newForgotPasswordEmail}
                    error={forgotPasswordError}
                    onInput={(e) => {
                      console.log("VALUE OF E", e.currentTarget.value);
                      setNewForgotPasswordEmail(e.currentTarget.value);
                    }}
                    {...forgotPasswordFormStep1.getInputProps(
                      "forgotPasswordEmail"
                    )}
                  />

                  <Group position="right" mt="sm">
                    <Button
                      rightIcon={<IconAt />}
                      size={inputSize}
                      loading={forgotPasswordButtonStateStep1}
                      type="submit"
                      uppercase
                    >
                      Submit email
                    </Button>
                  </Group>
                </form>
              </Stepper.Step>
              <Stepper.Step label="Get the activation code" description="">
                <form
                  onSubmit={forgotPasswordFormStep2.onSubmit((values) => {
                    console.log("Values: ", values);
                    forPasswordStep2(values);
                  })}
                >
                  <TextInput
                    size={inputSize}
                    py={paddingSize}
                    required
                    label="4 Digit Code"
                    placeholder="Enter 4 Digit Code"
                    icon={<IconShieldLock />}
                    component={InputMask}
                    value={forgotPasswordFourDigitCode}
                    mask="9999"
                    onInput={(e) => {
                      console.log("VALUE OF E", e.currentTarget.value);
                      setForgotPasswordFourDigitCode(e.currentTarget.value);
                    }}
                    {...forgotPasswordFormStep2.getInputProps("fourDigitCode")}
                  />

                  <Group position="right" mt="sm">
                    <Button
                      rightIcon={<IconShieldLock />}
                      size={inputSize}
                      loading={forgotPasswordButtonStateStep2}
                      type="submit"
                      uppercase
                    >
                      Submit Code
                    </Button>
                  </Group>
                </form>
              </Stepper.Step>
              <Stepper.Step label="Set A New Password">
                <form
                  onSubmit={forgotPasswordFormStep3.onSubmit((values) =>
                    updatePasswordMethod(values)
                  )}
                >
                  <PasswordInput
                    size="md"
                    placeholder="New Password"
                    label="New Password"
                    required
                    onInput={(event) => {
                      if (
                        event.target.value !==
                        forgotPasswordFormStep3.values.confirmPassword
                      ) {
                        forgotPasswordFormStep3.setFieldError(
                          "confirmPassword",
                          "Passwords do not match"
                        );
                      } else {
                        forgotPasswordFormStep3.setFieldError(
                          "confirmPassword",
                          ""
                        );
                      }
                    }}
                    {...forgotPasswordFormStep3.getInputProps("newPassword")}
                  />
                  <PasswordInput
                    size="md"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    required
                    onInput={(event) => {}}
                    {...forgotPasswordFormStep3.getInputProps(
                      "confirmPassword"
                    )}
                  />
                  <Group position="right">
                    <Button
                      my="md"
                      size="md"
                      color="dark"
                      type="submit"
                      uppercase
                      disabled={
                        forgotPasswordFormStep3.values.confirmPassword &&
                        forgotPasswordFormStep3.values.newPassword &&
                        forgotPasswordFormStep3.values.newPassword &&
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                          forgotPasswordFormStep3.values.newPassword
                        ) &&
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(
                          forgotPasswordFormStep3.values.confirmPassword
                        ) &&
                        forgotPasswordFormStep3.values.newPassword ===
                          forgotPasswordFormStep3.values.confirmPassword
                          ? false
                          : true
                      }
                      rightIcon={<IconEdit />}
                    >
                      Update Password
                    </Button>
                  </Group>
                </form>
              </Stepper.Step>
              <Stepper.Completed>
                Completed, click back button to get to previous step
              </Stepper.Completed>
            </Stepper>
          </Container>
        </Modal>
        {/* Verification Modal*/}
        <Modal
          styles={{
            close: {
              color: "black",
              backgroundColor: "#EAEAEA",
              borderRadius: "50%",
              "&:hover": {
                transition: "50ms",
                color: "white",
                backgroundColor: "red",
              },
            },
          }}
          centered
          size="xl"
          onClose={() => setVerificationModal(false)}
          opened={verificationModal}
        >
          <Title>User Verification </Title>
          <Paper p="xl">
            <Accordion variant="separated">
              {!emailAccordion && (
                <Accordion.Item value="email">
                  <Accordion.Control
                    icon={<IconUserX color="red" />}
                    disabled={emailAccordion}
                  >
                    <Text>Verify Email</Text>
                    <Text color="dimmed">
                      {" "}
                      To start using AWEP verify your email address!
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Group position="left" align="flex-end">
                      <Text>
                        To resend verification email at <b>{modalEmail}</b>{" "}
                        click resend
                      </Text>
                      <Button
                        rightIcon={<IconMail />}
                        disabled={modalButtonEmail}
                        uppercase
                        size={inputSize}
                        onClick={() => {
                          sendVerificationEmail();
                        }}
                      >
                        resend
                      </Button>
                      <Text hidden={!modalButtonEmail} color="dimmed">
                        This button will be available after 1 minute
                      </Text>
                    </Group>
                  </Accordion.Panel>
                </Accordion.Item>
              )}

              {!phoneAccordion && (
                <Accordion.Item value="phone">
                  <Accordion.Control
                    icon={<IconPhoneX color="red" />}
                    disabled={phoneAccordion}
                  >
                    <Text> Verify Phone Number</Text>
                    <Text color="dimmed">
                      To start using AWEP verify your phone number now!
                    </Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <form
                      style={{ width: "100%", height: "100%" }}
                      onSubmit={form1.onSubmit((values) => {
                        submitVerificationCode(values);
                      })}
                    >
                      <Group position="apart" align="flex-end">
                        <Group position="left" align="flex-end">
                          <NumberInput
                            label="Enter 4 digit code"
                            required
                            placeholder="Enter verification code"
                            description="Enter the 4 digit code sent on your contact number"
                            hideControls
                            component={InputMask}
                            mask="9999"
                            size={inputSize}
                            {...form1.getInputProps("code")}
                          />
                          <Button
                            disabled={verificationCodeButton}
                            type="submit"
                            uppercase
                            size={inputSize}
                            color="green"
                            rightIcon={<IconCheck />}
                          >
                            Verify
                          </Button>
                        </Group>

                        <Button
                          disabled={modalButtonCode}
                          uppercase
                          size={inputSize}
                          rightIcon={<IconMessage />}
                          onClick={() => {
                            sendVerificationCode();
                          }}
                        >
                          resend
                        </Button>
                        <Text hidden={!verificationCodeButton} color="dimmed">
                          This button will be available after 1 minute
                        </Text>
                      </Group>
                    </form>
                  </Accordion.Panel>
                </Accordion.Item>
              )}
            </Accordion>
          </Paper>
        </Modal>

        {/* REST OF THE PAGE */}
        <Container size="xl" my={"xl"}>
          <Grid>
            <Grid.Col lg={6}>
              <Grid>
                <Grid.Col>
                  <SignUpSignInCarousel />
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col lg={6} style={{ position: "relative" }}>
              <Grid>
                <Grid.Col>
                  <Text align="center" size={40}>
                    Sign in with us
                  </Text>
                </Grid.Col>
                <Grid.Col>
                  <Text align="center" size={20}>
                    Use our social sign in
                  </Text>
                </Grid.Col>
                <Grid.Col>
                  <Group
                    position="center"
                    id="signInDiv"
                    style={{ height: "50", width: "400" }}
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
                    style={{ padding: 0, margin: 0 }}
                    onSubmit={form.onSubmit((values) => signInFunction(values))}
                  >
                    <LoadingOverlay
                      loaderProps={{
                        size: "xl",
                        color: "pink",
                        variant: "bars",
                      }}
                      overlayOpacity={0.5}
                      overlayColor="#c5c5c5"
                      visible={visible}
                    />
                    <TextInput
                      icon={<IconAt />}
                      size={inputSize}
                      py={paddingSize}
                      label="Enter Email Address"
                      placeholder="Enter Email Address"
                      required
                      value={forgotPasswordEmail}
                      onInput={(e) =>
                        setForgotPasswordEmail(e.currentTarget.value)
                      }
                      {...form.getInputProps("email")}
                    />
                    <PasswordInput
                      icon={<IconKey />}
                      py={paddingSize}
                      size={inputSize}
                      placeholder="Enter Password"
                      label="Password"
                      required
                      {...form.getInputProps("password")}
                    />
                    <Button
                      my="md"
                      size={inputSize}
                      uppercase
                      fullWidth
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </form>
                </Grid.Col>
                <Grid.Col lg={12}>
                  <Group mt={0} p="sm" position="apart">
                    <Box
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <Text
                        color="dimmed"
                        onClick={() => {
                          setModalEmail("");
                          setModalPhoneNumber("");
                          setUserType("");
                          setVerificationCode("");
                          if (closeModal) {
                            setIsSignUp(true);
                            setIsSignIn(false);
                          } else {
                            navigate("/signup");
                          }
                        }}
                        size={18}
                      >
                        SIGN UP
                      </Text>
                    </Box>
                    <Box
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <Text
                        size={18}
                        color="dimmed"
                        onClick={() => {
                          // forgotPasswordFunction
                          console.log("FOROGOT PASSWORD CALLED");
                          setForgotPasswordModal(true);
                        }}
                      >
                        FORGOT PASSWORD?
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

export default SignIn;
