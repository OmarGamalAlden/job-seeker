import { useEffect, useState } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";
import { useContext } from "react";
import { resumeContext } from "./Context/ResumeContext.js";
import { dataContext } from "./Context/firebaseDataContext.js";

export default function App() {
  //state for users information
  const [user, setUser] = useState(null);

  let { extractedData, getInfoFromUserResume } = useContext(resumeContext);
  let { usersList, getDataFromFirebase } = useContext(dataContext);

  // commponent didMount?
  useEffect(() => {
    // handel user website reload
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      saveUserData();
    }
    // getting data from firebase
    getDataFromFirebase();
  }, []);
  // commponent didUpdate?
  useEffect(() => {
    if (user) {
      // getting data from user resume
      getInfoFromUserResume(user?.resume);
    }
  }, [user]);

  function saveUserData() {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }

  // project routing
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout setUser={setUser} user={user} />,
      children: [
        {
          path: "/",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login saveUserData={saveUserData} usersList={usersList} />,
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home extractedData={extractedData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile extractedData={extractedData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
