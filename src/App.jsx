import { useDispatch, useState } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout } from "./store/authSLice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {});
  }, []);

  return <></>;
}

export default App;
