import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { FC, useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

// Props type definition
type Props = {
  setRoute: (route: string) => void;
};

// Type definition for the OTP verification number
type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

// Functional component for the verification screen
const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();

  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account Activated Successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const VerificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false); // Reset the error when the user types
    const newVerifynumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifynumber);
    
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const isOtpComplete = Object.values(verifyNumber).every((digit) => digit !== "");

  return (
    <div className="verification-container">
      <h1 className="text-2xl font-semibold text-center">Verify your Account</h1>

      <div className="w-full flex items-center justify-center mt-4">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} color="white" />
        </div>
      </div>

      <div className="code-inputs-container flex justify-center gap-4 mt-6">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            key={key}
            ref={inputRefs[index]}
            className={`verification-input ${
              invalidError ? "shake border-red-500" : "border-gray-400"
            }`}
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>

      {/* Error Message */}
      {invalidError && !isOtpComplete && (
        <p className="text-red-500 text-center mt-4">
          Please complete all the fields.
        </p>
      )}

      <div className="flex items-center justify-center mt-6">
        <button
          onClick={VerificationHandler}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Verify OTP
        </button>
      </div>

      <br />
      <h5 className="text-center pt-2 text-[16px]">
        Go back to Sign in?{" "}
        <span
          className="pl-1 text-[#2190ff] cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification