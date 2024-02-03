import React, { useState } from "react";
import placeholder from "../images/placeholder.png";
import CustomButton from "../components/general-purpose/CustomButton";
import { useUserContext } from "../context/UserContext";
import LoginPopup from "../components/login/loginPopup";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { LogOut, userData, DeleteAccount } = useUserContext();
  const [changePasswordWindow, setChangePasswordWindow] = useState(false);
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const clearMsg = () => {
    if (errorMsg === "") return;
    setErrorMsg("");
  };
  const NewPasswordSet = (newPass: string) => {
    setPassword("");
    setNewPassword("");
    //call api to change password
  };
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-[100vh] text-2xl">
      <div className="bg-background-50 p-4 px-20 flex flex-col items-center justify-center gap-4 rounded-md shadow-md">
        <h1 className="text-5xl">Your account</h1>
        <p className="">{userData?.email}</p>
        <CustomButton
          className="w-80"
          variant={"action"}
          onClick={() => {
            setChangePasswordWindow(true);
          }}
        >
          Change password
        </CustomButton>
        <CustomButton className="w-80" variant={"action"} onClick={LogOut}>
          Log out
        </CustomButton>
        <CustomButton
          className=" bg-red-400 hover:bg-red-500 text-xl"
          onClick={() => {
            setDeleteWindow(true);
          }}
        >
          Delete account
        </CustomButton>
      </div>
      {changePasswordWindow && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div
            className="absolute inset-0 z-10 bg-black/50"
            onClick={(e) => {
              e.stopPropagation();
              setChangePasswordWindow(false);
            }}
          />
          <form
            id="changePassword"
            onSubmit={(e) => {
              e.preventDefault();
              if (password === "") {
                setErrorMsg("Enter your password");
                return;
              }
              if (newPassword === "") {
                setErrorMsg("Enter new password");
                return;
              }
              if (password !== userData?.password) {
                setErrorMsg("Wrong password");
                return;
              }
              if (newPassword === password) {
                setErrorMsg("New password must be different");
                return;
              }

              NewPasswordSet(newPassword);
              setChangePasswordWindow(false);
            }}
            className="bg-background-50 z-20 p-4 rounded-md shadow-md w-1/4 relative gap-2 flex flex-col items-start"
          >
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              htmlFor="password"
            >
              Current password
            </label>
            <input
              className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
              id="password"
              required
              value={password}
              type="password"
              onChange={(e) => {
                clearMsg();
                setPassword(e.target.value);
              }}
            />
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              htmlFor="newPassword"
            >
              New password
            </label>
            <input
              className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
              id="newPassword"
              required
              value={newPassword}
              type="password"
              onChange={(e) => {
                clearMsg();
                setNewPassword(e.target.value);
              }}
            />
            <button
              className="inline-flex items-center justify-center text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 w-full bg-action-400 hover:bg-action-500 text-background-50 p-2 rounded-md transition-colors"
              type="submit"
              onClick={() => {
                clearMsg();
              }}
            >
              Change password
            </button>
            {errorMsg !== "" && (
              <LoginPopup message={errorMsg} className="-top-5" />
            )}
          </form>
        </div>
      )}
      {deleteWindow && (
        <div className="fixed z-30 inset-0 flex items-center justify-center ">
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={(e) => {
              e.stopPropagation();
              setPassword("");
              clearMsg();
              setDeleteWindow(false);
            }}
          ></div>
          <div className="bg-primary-50 py-10 px-10 text-4xl flex flex-col items-center justify-center rounded-md z-50 gap-2 relative">
            {errorMsg !== "" && (
              <LoginPopup message={errorMsg} className="-top-5" />
            )}
            <p>Deleting your account cannot be reversed.</p>
            <p className="text-base text-background-500">
              All of your uploaded content will be removed from the platform.
              permanently
            </p>
            <label
              className="text-base font-medium leading-none mt-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              htmlFor="password"
            >
              Enter your password
            </label>
            <input
              className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
              id="password"
              required
              value={password}
              type="password"
              onChange={(e) => {
                clearMsg();
                setPassword(e.target.value);
              }}
            />
            <CustomButton
              className="bg-red-400 hover:bg-red-500 w-full mt-2"
              onClick={() => {
                if (password !== userData?.password) {
                  setErrorMsg("Wrong password");
                  return;
                }
                clearMsg();
                DeleteAccount();
                navigate("/");
              }}
            >
              Delete
            </CustomButton>
            <CustomButton
              variant={"actionDark"}
              className="w-60 text-2xl mt-4"
              onClick={() => {
                setDeleteWindow(false);
              }}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
