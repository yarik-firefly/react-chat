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
import { AppDispatch, RootState } from "./redux/store";
import { Status } from "./types/slice";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { auth, statusMe, infoMe, statusLogin } = useSelector(
    (state: RootState) => state.authSlice
  );
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    checkAuth();
  }, []);

  const isReady: boolean = statusMe !== Status.LOADING;

  const checkAuth = (): void => {
    try {
      dispatch(getMe());
    } catch (error: unknown) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (pathname === "/user/verify") {
      return;
    }

    if (!!auth) {
      navigate("/main");
    } else {
      navigate("/auth");
    }
  }, [auth]);

  if (!isReady) {
    return (
      <div className="App__loading">
        <Loading dialog={false} />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/main" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user/verify" element={<VerifyUser />} />
      </Routes>
    </div>
  );
}

export default App;
