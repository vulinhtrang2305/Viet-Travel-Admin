// import React, { useEffect, useState } from "react";
// import AppContext from "./Context";
// import axios from "axios";

// function AppProvider({ children }) {
//   const [login, setLogin] = useState([]);
//   const [register, setRegister] = useState([]); 
//   // const [categorySearch, setCategorySearch] = useState([]); 
//   // const [searchName, setSearchName] = useState(""); 
//   // const [search, setSearch] = useState({}); 

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     // lay data tu api se co luc xay ra loi
//     try {
//       const resDepartment = await axios.post("http://localhost:9999/login");
//       setLogin(resDepartment.data);

//       const resCategory = await axios.post("http://localhost:9999/register");
//       setRegister(resCategory.data);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const data = {
//     login, setLogin,
//     register, setRegister
//   };

//   return (
//     <AppContext.Provider value={data}>
//       {children}
//       {/* app  */}
//     </AppContext.Provider>
//   );
// }

// export default AppProvider;


import React, { useState } from "react";
import AppContext from "./Context";

function AppProvider({ children }) {
  const [user, setUser] = useState(null);     // lưu thông tin user đã đăng nhập
  const [token, setToken] = useState("");     // JWT token

  const loginSuccess = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  const data = {
    user, setUser,
    token, setToken,
    loginSuccess,
    logout,
  };

  return (
    <AppContext.Provider value={data}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
