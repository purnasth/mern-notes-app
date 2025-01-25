import React from "react";
import PasswordInput from "../../components/Input/PasswordInput";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={() => {}}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input type="text" placeholder="Email" className="input-box" />
            <PasswordInput placeholder="Password" />

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p>
              Not registered?{" "}
              <a href="/signup" className="text-pink-500 underline">
                Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
