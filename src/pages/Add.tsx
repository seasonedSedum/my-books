import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddContainer from "../containers/AddContainer";
import useToken from "../hooks/useToken";

export default function Add() {
  const navigate = useNavigate();
  const token = useToken();

  useEffect(() => {
    if (token === null) {
      navigate("/signin");
    }
  }, [token, navigate]);

  return <AddContainer />;
}
