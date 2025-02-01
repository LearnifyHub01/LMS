// import React, { FC, useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   AiOutlineEye,
//   AiOutlineEyeInvisible,
//   AiFillGithub,
// } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { styles } from "../../styles/style";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import toast from "react-hot-toast";
// import { signIn } from "next-auth/react";

// type Props = {
//   setRoute: (route: string) => void;
//   setOpen: (open: boolean) => void;
// };

// const schema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string()
//     .required("Password is required"),
// });

// const Login: FC<Props> = ({ setRoute, setOpen }) => {
//   const [show, setShow] = useState(false);
//   const [login, { isSuccess, error }] = useLoginMutation();

//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema: schema,
//     onSubmit: async ({ email, password }) => {
//       await login({ email, password });
//     },
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Login Successfully");
//       setOpen(false);
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         toast.error(errorData.data.message);
//       }
//     }
//   }, [isSuccess, error]);


//   const { errors, touched, values, handleChange, handleSubmit } = formik;

//   return (
//     <div className="w-full">
//       <h1 className={`${styles.title}`}>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label className={`${styles.label}`} htmlFor="email">
//           Enter Your Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name=""
//           value={values.email}
//           placeholder="loginmail@gmail.com"
//           className={`${errors.email && touched.email && "border-red-500"} 
//            ${styles.input}`}
//           onChange={handleChange}
//           required
//         />
//         {errors.email && touched.email && (
//           <span className="text-red-500 pt-2 block">{errors.email}</span>
//         )}
//         <div className="w-full mt-5 relative mb-9">
//           <label className={`${styles.label}`} htmlFor="password">
//             Enter Your Password
//           </label>
//           <input
//             type={!show ? "password" : "text "}
//             id="password"
//             value={values.password}
//             placeholder="password!@%"
//             className={`${
//               errors.password && touched.password && "border-red-500"
//             } 
//          ${styles.input}`}
//             onChange={handleChange}
//             required
//           />
//           {!show ? (
//             <AiOutlineEyeInvisible
//               className="absolute bottom-2.5 right-3 z-1 cursor-pointer dark:text-white"
//               size={20}
//               onClick={() => setShow(true)}
//             />
//           ) : (
//             <AiOutlineEye
//               className="absolute bottom-2.5 right-3 z-1 cursor-pointer dark:text-white"
//               size={20}
//               onClick={() => setShow(false)}
//             />
//           )}
//           {errors.password && touched.password && (
//             <span className="text-red-500 absolute pt-1 block">
//               {errors.password}
//             </span>
//           )}
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm w-full"
//           >
//             Login
//           </button>
//           <br />

//           <h5 className="text-center pt-4 font-Poppins text-[16px] text-black dark:text-white ">
//             or join with
//           </h5>
          // <div className="flex items-center justify-center my-3">
          //   <FcGoogle size={30} className="cursor-pointer mr-1"
          //     onClick={() => signIn("google")}
          //   />
          //   <AiFillGithub size={30} className="cursor-pointer ml-1"
          //     onClick={() => signIn("github")}

          //   />
          // </div>
//           <h5 className="text-center pt-2 text-[16px]">
//             Not have any account?{" "}
//             <span
            //   className="text-[#2190ff] pl-1 cursor-pointer"
            //   onClick={() => setRoute("Sign-Up")}
            // >
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
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Log in</h1>
          
          <p className="text-center text-gray-500 dark:text-gray-400">continue your learning journey</p>
          <form  onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              value={values.email}
              placeholder="Email"
              className={`w-full p-2 mt-4 border rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${errors.email && touched.email && "border-red-500"}`}
              onChange={handleChange}
              required
            />
            {errors.email && touched.email && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
            <div className="w-full mt-5 relative mb-9">
              <input
                type={!show ? "password" : "text"}
                id="password"
                value={values.password}
                placeholder="Password"
                className={`w-full p-2 mt-4 border rounded-md focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 ${errors.password && touched.password && "border-red-500"}`}
                onChange={handleChange}
                required
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="absolute bottom-2.5 right-3 z-1 cursor-pointer text-gray-700 dark:text-gray-300"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute bottom-2.5 right-3 z-1 cursor-pointer text-gray-700 dark:text-gray-300"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
              {errors.password && touched.password && (
                <span className="text-red-500 absolute pt-1 block">{errors.password}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4  bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Log in
            </button>
          
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Not have any account?{" "}<span
              className="text-[#2190ff] pl-1 cursor-pointer"
              onClick={() => setRoute("Sign-Up")}
            >
              Sign in
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
        </div>
     
      );
};

export default Login;