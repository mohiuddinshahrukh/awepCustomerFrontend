import React, { useEffect } from "react";

const GoogleSignUpButon = () => {
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID TOKEN: ", response.credential);
  }
  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "945681414378-gvgimi542ebg5d2q97i90j1sdf2tten9.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_blue",
      size: "large",
      shape: "rectangular",
      text: "signup_with",
      width: "400",
    });
  });
  return <div id="signInDiv"></div>;
};

export default GoogleSignUpButon;
