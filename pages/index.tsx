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
import React from "react";
import { useFirebaseContext } from "../context/firebase";

const Home: NextPage = () => {
  // Initialize Firebase
  const { db, user, app } = useFirebaseContext();

  const createDoc = async () => {};

  const log = async () => {
    // const ref: CollectionReference = doc(collection(db, "users"));
    // const querySnapshot: QuerySnapshot = await getDocs(
    //   collection(db, "cities")
    // );
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
    console.log(getAuth(app).currentUser);
  };

  return (
    <div>
      <button onClick={createDoc} className="px-3 py-1 bg-gray-500 border">
        Create Doc
      </button>
      <button onClick={log} className="px-3 py-1 bg-gray-500 border">
        Log
      </button>
    </div>
  );
};

export default Home;
