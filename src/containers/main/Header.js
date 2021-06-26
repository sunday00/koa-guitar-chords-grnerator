import React from "react";
import { useSelector } from "react-redux";

import Login from "../../components/main/Login";


const Header = ({ match }) => {
  const auth = useSelector((state) => state.auth);
    
  //TODO:: log out
  return <header>{!auth ? <Login></Login> : "logout"}</header>;
};

export default Header;
