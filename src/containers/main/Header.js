import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../../components/main/Login";

const Header = ({ match }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    let storedAut = localStorage.getItem("auth");
    let storedExp = localStorage.getItem("expire");

    if (new Date(storedExp) > new Date() && storedAut === "1") {
      setAuth(true);
    }
  });

  //TODO:: log out
  return <header>{!auth ? <Login></Login> : "logout"}</header>;
};

export default Header;
