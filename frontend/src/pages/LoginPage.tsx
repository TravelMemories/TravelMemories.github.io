import React from "react";

function LoginPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-5xl font-bold text-white mb-10">Login</h1>
      <div className="w-80 space-y-6 bg-white p-10 rounded-lg shadow-md">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            htmlFor="email"> Email </label>
          <input
            className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
            id="email"
            placeholder="m@example.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-gray-300 p-2 rounded-md"
            id="password"
            required
            type="password"
          />
        </div>
        <button
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 w-full bg-gradient-to-r from-purple-600 to-red-600 text-white p-2 rounded-md transition-colors hover:from-purple-700 hover:to-red-700"
          type="submit"
        >
          Login
        </button>
        <button className="text-sm text-right block underline text-gray-700" onClick={() => {}}>
          Forgot your password?
        </button>
      </div>
      <div className="mt-4 text-center text-sm text-white">
        Don't have an account?{' '}
        <button className="underline" onClick={() => {}}>
          Sign up
        </button>
      </div>
    </div>
  );
}


export default LoginPage;
