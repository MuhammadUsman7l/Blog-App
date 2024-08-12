import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import authService from "./appwrie/auth.service";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index.js";

function App() {
  const { loading, setLoading } = useState(true);
  const dispach = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispach(login({ userData }));
        } else {
          dispach(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <main>{/* todo */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
