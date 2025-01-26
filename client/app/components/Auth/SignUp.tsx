import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation(); //data is come from api response register reducer

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
    // onSubmit: async ({ email, password, name }) => {
    //   console.log("Form Submitted with:", { email, password, name });
    //   const data = { name, email, password };
    //   await register(data);
    // },
    
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Join to LearnifyHub</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="name">
            Enter Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name" // This should match Formik's field name
            value={values.name}
            placeholder="John Wick"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
            onChange={handleChange}
            required
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Enter Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email" // Properly add the "name" attribute
            value={values.email}
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
            onChange={handleChange}
            required
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="w-full relative mb-9">
          <label className={`${styles.label}`} htmlFor="password">
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            id="password"
            name="password"
            value={values.password}
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
            onChange={handleChange}
            required
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-2.5 right-3 z-1 cursor-pointer dark:text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-2.5 right-3 z-1 cursor-pointer dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 absolute pt-2 block">
              {errors.password}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm w-full"
          >
            Sign Up
          </button>
          <br />

          <h5 className="text-center pt-4 font-Poppins text-[16px] text-black dark:text-white ">
            or join with
          </h5>
          <div className="flex items-center justify-center my-3">
            <FcGoogle size={30} className="cursor-pointer mr-1" />
            <AiFillGithub size={30} className="cursor-pointer ml-1" />
          </div>
          <h5 className="text-center pt-2 text-[16px]">
            Already have an account?{" "}
            <span
              className="text-[#2190ff] pl-1 cursor-pointer"
              onClick={() => setRoute("Login")}
            >
              Sign in
            </span>
          </h5>
        </div>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
