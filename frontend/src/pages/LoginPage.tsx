import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SlGlobe } from "react-icons/sl";
import { motion } from "framer-motion";
import { useUserContext } from "../context/UserContext";
import LoginPopup from "../components/login/loginPopup";
import { FaEye } from "react-icons/fa";
import api from "../api/api";
import axios from "axios";
function LoginPage() {
  const { LogIn } = useUserContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const clearMsg = () => {
    if (errorMsg === "") return;
    setErrorMsg("");
  };
  const checkLogin = async () => {
    try {
      const response = await api.get(
        `/user/checkPassword?email=${username}&password=${password}`
      );
      if (response.status === 200) {
        const id: Number = response.data.content[0].id as Number;
        if (id === undefined) {
          setErrorMsg("No such user in database");
          return;
        }
        LogIn({
          email: username,
          password: password,
          id: response.data.content[0].id,
        });
      } else {
        setErrorMsg("Email or password incorrect");
      }
    } catch (err) {
      console.log(err);
      setErrorMsg("Email or password incorrect");
    }
  };
  return (
    <form
      className=" flex flex-col min-h-[100vh] justify-center items-center py-4 bg-gradient-to-br from-background-100  to-background-200 via-background-200"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <motion.div
        animate={{ scaleX: 1 }}
        whileHover={{
          scaleX: 1.01,
        }}
        transition={{ duration: 0.2 }}
      >
        <NavLink
          to={"/"}
          className="group flex justify-center items-center gap-2 cursor-pointer font-bold text-background-500 mb-6"
        >
          <SlGlobe className="text-3xl group-hover:rotate-6 transition-transform" />
          <p className="text-4xl">Travel Memories</p>
        </NavLink>
      </motion.div>
      <div className="relative w-80 space-y-6 bg-primary-50 p-10 rounded-lg shadow-md">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
            id="username"
            placeholder="Your username"
            required
            type="text"
            value={username}
            onChange={(e) => {
              clearMsg();
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="relative space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className=" flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
            id="password"
            required
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              clearMsg();
              setPassword(e.target.value);
            }}
          ></input>
          <button
            className="absolute bottom-0 h-10 right-3 z-10"
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            <FaEye />
          </button>
        </div>
        <button
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 w-full bg-action-400 hover:bg-action-500 text-background-50 p-2 rounded-md transition-colors"
          type="submit"
          onClick={() => {
            clearMsg();
            if (username === "" || password === "") {
              return;
            }
            checkLogin();
          }}
        >
          Login
        </button>
        {errorMsg !== "" && <LoginPopup message={errorMsg} />}
      </div>
      <div className="mt-4 text-center text-sm text-background-700">
        Don't have an account?{" "}
        <button className="underline" onClick={() => {}}>
          <NavLink to={"/register"}>Sign up</NavLink>
        </button>
      </div>
    </form>
  );
}

export default LoginPage;
