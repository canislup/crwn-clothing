import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Reset Fields
  const resetSignUpFields = () => {
    setFormFields(defaultFormFields);
  };

  // USER CREATION FROM EMAIL AND PASSWORD
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Creating the user
    try {
      // Authentication
      await signInAuthUserWithEmailAndPassword(email, password);

      // Reseting the fields
      resetSignUpFields();
    } catch (error) {
      const errorType = error.code;

      switch (errorType) {
        case "auth/invalid-credential":
          alert("Incorrect email or password");
          break;

        default:
          console.error(error.code);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopUp();
    } catch (error) {
      const errorType = error.code;
      if (errorType === "auth/invalid-credential")
        alert("Incorrect email or password");
      console.error(error.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
