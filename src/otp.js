import { Fragment, useEffect, useState } from "react";
import React from "react";
import "./App.css";

const VerifyOTPForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOTP] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <Fragment>
      <form>
        <div>
          <h3>OTP</h3>
          <p></p>

          <div>
            <input
              required
              value={otp}
              type="text"
              placeholder="OTP"
              onChange={(e) => {
                setErrorMessage("");
                setOTP(e.target.value);
              }}
            />
          </div>
          <div>
            <label>{errorMessage}</label>
          </div>

          {minutes > 0 || seconds > 0 ? (
            <p>
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes} :{" "}
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p dir="ltr">Didnt get code?</p>
          )}
          <div className="buttons">
            <button
              className="b2"
              onClick={resendOTP}
              disabled={minutes > 0 || seconds > 0}
              style={{
                color: `${minutes > 0 || seconds > 0 ? "#AEADAD" : "#FF5630"}`,
              }}
            >
              Resend OTP
            </button>

            <button className="b1">Verify</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default VerifyOTPForm;
