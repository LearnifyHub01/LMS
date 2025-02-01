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
import { signIn } from "next-auth/react";
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
      <h1 className={`${styles.title}`}>Sign up</h1>
      <p className="text-center text-gray-500 dark:text-gray-400">start your learning with <b>LearnifyHub</b></p>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <input
            type="text"
            id="name"
            name="name" // This should match Formik's field name
            value={values.name}
            placeholder="Name"
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
          <input
            type="email"
            id="email"
            name="email" // Properly add the "name" attribute
            value={values.email}
            placeholder="Email"
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
          <input
            type={!show ? "password" : "text"}
            id="password"
            name="password"
            value={values.password}
            placeholder="Password"
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
        
          <button
              type="submit"
              className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Sign up
            </button>
          <br />
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          already have an account?{" "}<span
              className="text-[#2190ff] pl-1 cursor-pointer"
              onClick={() => setRoute("Login")}
            >
              Log in
            </span>
          </p>
          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300 dark:border-gray-600" />
            <span className="px-2 text-sm text-gray-500 dark:text-gray-400">or</span>
            <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          </div>
          <div className="flex items-center justify-center my-3">
                      <FcGoogle size={30} className="cursor-pointer mr-1"
                        onClick={() => signIn("google")}
                      />
                      <AiFillGithub size={30} className="cursor-pointer ml-1"
                        onClick={() => signIn("github")}
          
                      />
                    </div>
                    <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
            By signing up to create an account I accept Company's
            <a href="#" className="text-blue-600"> Terms of Use</a> and
            <a href="#" className="text-blue-600"> Privacy Policy</a>.
          </p>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
