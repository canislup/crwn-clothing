import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopUp();
      console.log("This is the user object: ", user);

      const userDocRef = await createUserDocumentFromAuth(user);
      console.log("This is the returned user Doc Ref: ", userDocRef);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
