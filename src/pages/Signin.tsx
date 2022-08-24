import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SigninContainer from "../containers/SigninContainer";
import { RootState } from "../types";

// Signin 컨테이너를 사용하고, 컨테이너에서 리덕스와 연결 후, 하위 컴포넌트로 프레젠테이셔널 컴포넌트를 만든다.
export default function Signin() {
  const navigate = useNavigate();
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  return <SigninContainer />;
}
