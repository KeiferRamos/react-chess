import { useEffect } from "react";
import { useParams } from "react-router";
import Register from "../components/register";
import SignIn from "../components/signin";
import { LoginQueryType } from "../types/types";

function LoginPage() {
  const { query } = useParams<LoginQueryType>();

  return <div>{query === "login" ? <SignIn /> : <Register />}</div>;
}

export default LoginPage;
