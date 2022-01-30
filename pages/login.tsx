import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatchContext, useFirebaseContext } from "../context/firebase";

export default function Login() {
  const { app, authenticated } = useFirebaseContext();
  const dispatch = useDispatchContext();
  const router = useRouter();

  if (authenticated) {
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }

  const googlePopup = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch("LOG_IN", user);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return authenticated ? (
    <div>Already logged in!</div>
  ) : (
    <div className="flex items-center justify-center w-screen h-screen">
      <button
        onClick={googlePopup}
        className="p-1 bg-gray-400 border-2 border-gray-500 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
