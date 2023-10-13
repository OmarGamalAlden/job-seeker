import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UsersDB } from "./firebase/firebase.js";
import { onValue, ref } from "firebase/database";
import Layout from "./components/Layout/Layout.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Profile from "./components/Profile/Profile.jsx";
import { useEffect, useState } from "react";

export default function App() {
  //state for users information
  const [usersList, setUsersList] = useState([]);

  //in start of project get all users info..
  function getDataFromFirebase() {
    //for collecting data of user, from firebase realtime database
    let Users_dbref = ref(UsersDB, "/userData");
    onValue(Users_dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
      });
      setUsersList(records);
    });
  }

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  // project routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Register />,
        },
        { path: "/login", element: <Login usersList={usersList} /> },
        { path: "/home", element: <Home /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
