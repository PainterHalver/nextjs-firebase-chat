import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import {
  Children,
  ComponentProps,
  createContext,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";

const firebaseConfig = {
  apiKey: "AIzaSyChHzyWZAd1y1WlpJd1vmmmuGRIozG_bmQ",
  authDomain: "mystical-rhino-327805.firebaseapp.com",
  projectId: "mystical-rhino-327805",
  storageBucket: "mystical-rhino-327805.appspot.com",
  messagingSenderId: "79865618200",
  appId: "1:79865618200:web:1607feacbf90c436d0c86d",
  measurementId: "G-8XD7XCVEB5",
};

interface FirebaseState {
  app: FirebaseApp;
  db: Firestore;
  authenticated: boolean;
  user: User | undefined;
}

interface AuthAction {
  type: string;
  user: User;
}

// Initialize Firebase
let app = initializeApp(firebaseConfig);
let db = getFirestore(app);

const FirebaseContext = createContext({
  app,
  db,
  authenticated: false,
  user: null,
});

const DispatchContext = createContext(null);

const reducer = (state: FirebaseState, { type, user }: AuthAction) => {
  switch (type) {
    case "LOG_IN":
      return {
        ...state,
        authenticated: true,
        user,
      };
    case "LOG_OUT":
      return {
        ...state,
        authenticated: false,
        user: undefined,
      };
    default:
      throw new Error(`Unknow action type: ${type}`);
  }
};

export default function FirebaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, oldDispatch] = useReducer(reducer, {
    app,
    db,
    authenticated: false,
    user: null,
  });

  const dispatch = (type: string, user?: User) => {
    return oldDispatch({ type, user });
  };

  useEffect(() => {
    getAuth(app).onAuthStateChanged(function (user) {
      if (user) {
        dispatch("LOG_IN", getAuth(app).currentUser);
      } else {
        dispatch("LOG_OUT");
      }
    });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <FirebaseContext.Provider value={state}>
        {children}
      </FirebaseContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useFirebaseContext = () => useContext(FirebaseContext);
export const useDispatchContext = () => useContext(DispatchContext);
