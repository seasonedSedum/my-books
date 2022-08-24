import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListContainer from "../containers/ListContainer";
import { RootState } from "../types";

export default function Home() {
  const navigate = useNavigate();
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );

  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
  }, [token, navigate]);

  return <ListContainer />;
}
