import { createContext } from "react";
import { UsersDB } from "../firebase/firebase.js";
import { onValue, ref } from "firebase/database";
import { useState } from "react";

export let dataContext = createContext();

function DataContextProvider(props) {
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
  return (
    <dataContext.Provider value={{ usersList, getDataFromFirebase }}>
      {props.children}
    </dataContext.Provider>
  );
}
export default DataContextProvider;
