import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "./App.scss";
import AuthPage from "./pages/AuthPage";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import { Home } from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { getMe, isAuth } from "./redux/slices/authSlice";
import Loading from "./components/Loading";
import VerifyUser from "./pages/VerifyUser";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { auth, statusMe, infoMe, statusLogin } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch();

  const checkAuth = () => {
    try {
      dispatch(getMe());
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);

  React.useEffect(() => {
    if (pathname === "/user/verify") {
      return;
    }

    if (auth) {
      navigate("/main");
    } else {
      navigate("/auth");
    }

    // if (statusMe === "ERROR" && !auth && !infoMe.length) {
    // }
  }, [auth]);

  if (statusMe === "LOADING" && !auth) {
    return (
      <div className="App__loading">
        <Loading />
      </div>
    );
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/main" element={<Home />} />
        <Route path="/user/verify" element={<VerifyUser />} />
      </Routes>
    </div>
  );
}

export default App;
