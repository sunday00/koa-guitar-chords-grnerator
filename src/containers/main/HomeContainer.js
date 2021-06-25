import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProvider } from "../../modules/providers";
import Home from "../../components/main/Home";

const HomeContainer = ({ match }) => {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers);

  useEffect(() => {
    //TODO: user login id ... maybe...
    dispatch(listProvider("sunday00"));
  }, [dispatch, match]);

  return <Home providers={providers} />;
};

export default HomeContainer;
