import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const handleLogin = async () => {
    if (!captcha) {
      alert("Please verify reCAPTCHA");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
  email,
  password,
  captcha   //  THIS IS THE FIX
});

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed ");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Log in to your Account</h2>
        <p className="subtitle">Welcome Again, Glad to see you again</p>

        {/* EMAIL */}
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email or Username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <p className="forgot">Forgot your Password?</p>

        {/* RECAPTCHA */}
        <div className="captcha">
          <ReCAPTCHA
            sitekey="6LdLoa4sAAAAAKuIhv2hsbwNr_1O8-RF4Fr2-PJ3"
            onChange={(value) => setCaptcha(value)}
          />
        </div>

        <button onClick={handleLogin}>Log in</button>

        <p className="signup">
          Don’t have an account? <span>Sign up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;