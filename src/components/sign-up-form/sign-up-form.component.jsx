import { useState, useContext } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // Reset Fields
  const resetSignUpFields = () => {
    setFormFields(defaultFormFields);
  };

  // USER CREATION FROM EMAIL AND PASSWORD
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Password check
    if (password !== confirmPassword) {
      alert("Your passwords dont match");
      console.error(`Error creating user: Passwords don't match.`);
      return;
    }

    // Creating the user
    try {
      // Authentication
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
        displayName
      );

      // Creating the user
      await createUserDocumentFromAuth(user, { displayName });

      alert("Account created sucessfully");

      // Reseting the fields
      resetSignUpFields();
    } catch (error) {
      alert(error.code);
      console.error("💥", error.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
