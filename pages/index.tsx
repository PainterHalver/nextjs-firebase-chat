import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  Timestamp,
  Query,
  query,
  CollectionReference,
  orderBy,
  limit,
} from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFirebaseContext } from "../context/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Home: NextPage = () => {
  const router = useRouter();
  const { db, user, app, authenticated } = useFirebaseContext();
  const auth = getAuth(app);

  const [messageValue, setMessageValue] = useState("");

  const messageRef: CollectionReference = collection(db, "messages");
  const q: Query = query(messageRef, orderBy("createdAt", "desc"), limit(25));
  const [messages, loading, error, snapshot] = useCollectionData(q);

  const lastBlock = useRef(null);

  useEffect(() => {
    lastBlock.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const submit: FormEventHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        message: messageValue,
        createdAt: Timestamp.now(),
        uid: user.uid,
        photoUrl: user.photoURL,
      });
      setMessageValue("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-gray-500">
      <div className="flex flex-col w-screen h-screen max-w-3xl bg-gray-100">
        {/* Head bar */}
        <div className="flex justify-between py-3 bg-gray-400">
          <p className="px-3 text-xl whitespace-nowrap">
            Logged in as {user && user.displayName}
          </p>
          <button
            className="px-2 py-1 mr-4 bg-gray-600 rounded"
            onClick={signOutHandler}
          >
            Logout
          </button>
        </div>
        {/* Chat container*/}
        <div className="m-1 overflow-y-scroll bg-orange-300 grow no-scrollbar">
          {/* Chat rows */}
          {user &&
            messages &&
            !loading &&
            messages
              .slice(0)
              .reverse()
              .map((msg, index) =>
                msg.uid === user.uid ? (
                  <div className="flex justify-end w-full p-1 mt-1" key={index}>
                    <p className="max-w-md px-2 py-1 mr-2 break-words bg-gray-400 rounded">
                      {msg.message}
                    </p>
                    <div>
                      <Image
                        src={msg.photoUrl}
                        width={37}
                        height={37}
                        className="rounded-full"
                      ></Image>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full p-1 mt-1" key={index}>
                    <div>
                      <Image
                        src={msg.photoUrl}
                        width={37}
                        height={37}
                        className="rounded-full"
                      ></Image>
                    </div>
                    <p className="max-w-md px-2 py-1 ml-2 break-words bg-gray-400 rounded">
                      {msg.message}
                    </p>
                  </div>
                )
              )}
          <div ref={lastBlock}></div>
        </div>
        {/* Text Input */}
        <div className="w-full py-2 bg-gray-400">
          <form className="flex w-full" onSubmit={submit}>
            <input
              type="text"
              className="py-2 pl-3 mx-4 rounded grow focus:outline-none"
              placeholder="Enter your message"
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
            />
            <button className="px-3 mr-4 bg-gray-600 rounded" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
