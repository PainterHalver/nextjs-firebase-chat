import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  QuerySnapshot,
  getDocs,
} from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useFirebaseContext } from "../context/firebase";

const Home: NextPage = () => {
  const router = useRouter();
  const { db, user, app, authenticated } = useFirebaseContext();

  useEffect(() => {
    getAuth(app).onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);

  return (
    <div className="flex justify-center w-screen h-screen bg-gray-500">
      <div className="flex flex-col w-screen h-screen max-w-3xl bg-gray-100">
        {/* Head bar */}
        <div className="flex justify-between py-3 bg-gray-400">
          <p className="px-3 text-xl whitespace-nowrap">
            Logged in as {user && user.displayName}
          </p>
          <button className="px-2 py-1 mr-4 bg-gray-600 rounded">Logout</button>
        </div>
        {/* Chat container*/}
        <div className="m-1 overflow-y-scroll bg-orange-300 grow no-scrollbar">
          {/* Chat rows */}
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
          <form className="flex w-full">
            <input
              type="text"
              className="py-2 pl-3 mx-4 rounded grow focus:outline-none"
              placeholder="Enter your message"
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
