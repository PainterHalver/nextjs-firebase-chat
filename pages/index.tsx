import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  QuerySnapshot,
  getDocs,
  DocumentReference,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useFirebaseContext } from "../context/firebase";

const Home: NextPage = () => {
  const router = useRouter();
  const { db, user, app, authenticated } = useFirebaseContext();
  const auth = getAuth(app);

  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }
    });

    (async () => {
      const querySnapshot = await getDocs(collection(db, "messages"));
      console.log(querySnapshot.docs);
      setMessages(querySnapshot.docs.map((doc) => doc.data()));
    })();
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
      });
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
            messages.map((msg) =>
              msg.uid === user.uid ? (
                <div className="flex justify-end w-full p-1 mt-1 bg-red-300">
                  <p className="max-w-md px-2 py-1 mr-2 break-words bg-gray-400 rounded">
                    {msg.message}
                  </p>
                  <div>
                    <Image
                      src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      width={37}
                      height={37}
                      className="rounded-full"
                    ></Image>
                  </div>
                </div>
              ) : (
                <div className="flex w-full p-1 mt-1 bg-red-300">
                  <div>
                    <Image
                      src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
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
          {/* Other */}
          <div className="flex w-full p-1 mt-1 bg-red-300">
            <div>
              <Image
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                width={37}
                height={37}
                className="rounded-full"
              ></Image>
            </div>
            <p className="max-w-md px-2 py-1 ml-2 break-words bg-gray-400 rounded">
              asdf asdfhjk h khgjka sg asvhjdg ahjsv vasjh vasjh dvjahskd bdksjb
              bsadf bsdhb hbasd jhbasdjfhb kjads
            </p>
          </div>

          {/* Me */}
          <div className="flex justify-end w-full p-1 mt-1 bg-red-300">
            <p className="max-w-md px-2 py-1 mr-2 break-words bg-gray-400 rounded">
              asdf asdfhjk h khgjka sg asvhjdg ahjsv vasjh vasjh dvjahskd bdksjb
              bsadf bsdhb hbasd jhbasdjfhb kjads
            </p>
            <div>
              <Image
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                width={37}
                height={37}
                className="rounded-full"
              ></Image>
            </div>
          </div>
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
