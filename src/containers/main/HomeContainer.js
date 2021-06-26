import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProvider } from "../../modules/providers";
import Home from "../../components/main/Home";

const HomeContainer = ({ match }) => {
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if(auth){
      dispatch(listProvider());
    }
  }, [dispatch, match, auth]);

  return <Home providers={providers} />;
};

export default HomeContainer;
