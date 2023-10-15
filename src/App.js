import { useEffect, useState } from "react";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UsersDB } from "./firebase/firebase.js";
import { onValue, ref } from "firebase/database";
import Layout from "./components/Layout/Layout.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";

export default function App() {
  //state for users information
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState(null);

  //state for extracted data form resume parser
  const [extractedData, setExtractedData] = useState(null);

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

  // proceessof extract data from user resume
  // this is an API called eden-ai using AI to process this operation..
  async function getInfoFromUserResume(resumeURL) {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/ocr/resume_parser",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYTcwZGYyYWUtYjcyNi00OTE0LWIwZWQtMzBmYzVmNzNiYzQ3IiwidHlwZSI6ImFwaV90b2tlbiJ9.4oPlNTM62CXcO7ZenhEnODqP-cMaJhsObcODPtVB45g",
      },
      data: {
        show_original_response: false,
        fallback_providers: "",
        providers: "affinda",
        file_url: `${resumeURL?.replace(/['"]+/g, "")}`,
      },
    };
    await axios
      .request(options)
      .then((response) => {
        // store extracted data into state!!
        const data = response.data.affinda;
        if (data.status == "success") {
          setExtractedData(data.extracted_data);
        } else {
          alert("fail to extract your data, please provide an pdf document");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // project routing
  const router = createBrowserRouter([
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
