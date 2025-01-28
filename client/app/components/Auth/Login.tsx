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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);


  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Enter Your Email
        </label>
        <input
          type="email"
          id="email"
          name=""
          value={values.email}
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} 
           ${styles.input}`}
          onChange={handleChange}
          required
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-9">
          <label className={`${styles.label}`} htmlFor="password">
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text "}
            id="password"
            value={values.password}
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } 
         ${styles.input}`}
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
            <span className="text-red-500 absolute pt-1 block">
              {errors.password}
            </span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm w-full"
          >
            Login
          </button>
          <br />

          <h5 className="text-center pt-4 font-Poppins text-[16px] text-black dark:text-white ">
            or join with
          </h5>
          <div className="flex items-center justify-center my-3">
            <FcGoogle size={30} className="cursor-pointer mr-1"
              onClick={() => signIn("google")}
            />
            <AiFillGithub size={30} className="cursor-pointer ml-1"
              onClick={() => signIn("github")}

            />
          </div>
          <h5 className="text-center pt-2 text-[16px]">
            Not have any account?{" "}
            <span
              className="text-[#2190ff] pl-1 cursor-pointer"
              onClick={() => setRoute("Sign-Up")}
            >
              Sign up
            </span>
          </h5>
        </div>
      </form>
      <br />
    </div>
  );
};

export default Login;

// import React, { FC, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { styles } from "../../styles/style";

// type Props = {
//   setRoute: (route: string) => void;
// };

// const schema = Yup.object({
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// });

// const Login: FC<Props> = ({ setRoute }) => {
//   const [show, setShow] = useState(false);

//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema: schema,
//     onSubmit: async ({ email, password }) => {
//       console.log(email, password);
//     },
//   });

//   const { errors, touched, values, handleChange, handleSubmit } = formik;

//   return (
//     <div className="w-full">
//       <h1 className={`${styles.title}`}>Login</h1>
//       <form onSubmit={handleSubmit}>
//         {/* Email Field */}
//         <label className={`${styles.label}`} htmlFor="email">
//           Enter Your Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={values.email}
//           placeholder="loginmail@gmail.com"
//           className={`${
//             errors.email && touched.email && "border-red-500"
//           } ${styles.input}`}
//           onChange={handleChange}
//           required
//         />
//         {errors.email && touched.email && (
//           <span className="text-red-500 pt-2 block">{errors.email}</span>
//         )}

//         {/* Password Field */}
//         <div className="w-full mt-5 relative mb-3"> {/* Increased margin-bottom */}
//           <label className={`${styles.label}`} htmlFor="password">
//             Enter Your Password
//           </label>
//           <input
//             type={!show ? "password" : "text"}
//             id="password"
//             value={values.password}
//             placeholder="password!@%"
//             className={`${
//               errors.password && touched.password && "border-red-500"
//             } ${styles.input}`} // Increased padding to accommodate eye icon
//             onChange={handleChange}
//             required
//           />

//           {/* Eye Icon */}
//           <span
//             onClick={() => setShow(!show)}
//             className="absolute bottom-3 right-2 z-10 cursor-pointer"
//           >
//             {show ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
//           </span>

//           {/* Password Error Message */}
//           {errors.password && touched.password && (
//             <span className="text-red-500 pt-2 absolute block">{errors.password}</span>
//           )}
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white p-2 rounded-md mt-8 w-full hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//           <br />

//           {/* Social Media Icons */}
//           <h5 className="text-center pt-4 font-Poppins text-[16px] text-black dark:text-white ">
//             or join with
//           </h5>
//           <div className="flex items-center justify-center my-3">
//             <FcGoogle size={30} className="cursor-pointer mr-1" />
//             <AiFillGithub size={30} className="cursor-pointer ml-1" />
//           </div>
//           <h5 className="text-center pt-2 text-[16px]">
//             Not have any account?{" "}
//             <span
//               className="text-[#2190ff] pl-1 cursor-pointer"
//               onClick={() => setRoute("Sign-Up")}
//             >
//               Sign up
//             </span>
//           </h5>
//         </div>
//       </form>
//       <br />
//     </div>
//   );
// };

// export default Login;
