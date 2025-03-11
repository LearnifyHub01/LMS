import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import { Rating } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import {
  IoCheckmarkDone,
  IoCloseCircle,
  IoCloseOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import CourseContentList from "./CourseContentList";
import imagethumbnail from "../../../public/assests/charlesdeluvio-Lks7vei-eAg-unsplash.jpg";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  data: any;
};

const loadRazorpayScript = async () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.id = "razorpay-script";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function CourseDetails({ data }: Props) {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);
  const courseId = data._id;

  const handleOrder = async (amount: number) => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      console.error("❌ Razorpay SDK failed to load");
      alert("Razorpay SDK failed to load. Please refresh and try again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/make-payment",
        { amount }
      );

      if (!response.data || !response.data.order_id) {
        alert("Failed to get order ID from server.");
        return;
      }

      const { order_id } = response.data;

      if (typeof window !== "undefined" && window.Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: "INR",
          name: "LearnifyHub",
          description: "Purchase Course",
          order_id,
          handler: async function (response: any) {
            const paymentData = {
              courseId,
              payment_Info: {
                id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
            };

            const verifyPayment = await axios.post(
              "http://localhost:8080/api/v1/create-order",
              paymentData,
              { withCredentials: true }
            );
            console.log("verify payment", verifyPayment);
            if (verifyPayment.data.success) {
              toast.success(verifyPayment.data.message);
              window.location.reload();
            } else {
              alert(" Payment Verification Failed.");
            }
          },
          prefill: {
            email: user?.email || "user@example.com",
          },
          theme: { color: "#528FF0" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        console.error(" Razorpay SDK not loaded");
        alert("Razorpay SDK not loaded. Please refresh and try again.");
      }
    } catch (error) {
      console.error(" Payment initiation error:", error);
      alert("Something went wrong while processing your payment.");
    }
  };

  console.log(data.demoUrl);
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.rating} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What will you learn from this Course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDone
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-black dark:text-white text-[25px] font-Poppins font-[600]">
              What the prerequisites for the starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDone
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <h1 className="text-black dark:text-white text-[25px] font-Poppins font-[600]">
              Course Overview
            </h1>
            <CourseContentList data={data?.courseData} isDemo={true} />
            <br />
            <br />
            <h1 className="text-black dark:text-white text-[25px] font-Poppins font-[600]">
              Course Details
            </h1>
            <p className="text-black dark:text-white text-[18px] mt-[20px] whitespace-pre-line  w-full overflow-hidden ">
              {data.description}
            </p>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.rating} />
                <div className="mb-2 800px:mb-[unset]">
                  <h5 className="text-black dark:text-white text-[18px] font-Poppins">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}{" "}
                    Course Rating • {data?.reviews?.length} Reviews
                  </h5>
                </div>
                <br />
                {(data?.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div className="w-full pb-4" key={index}>
                      <div className="flex">
                        <div className="w-[50px] h-[50px]">
                          <div className="w-[50px] h-[50px] bg-slate-600 flex rounded-[50px] items-center justify-center cursor-pointer">
                            <h1 className="text-black dark:text-white uppercase text-[18px] ">
                              {item.user.name.slice(0, 2)}
                            </h1>
                          </div>
                        </div>
                        <div className="hidden 800px:block pl-2">
                          <div className="flex items-center">
                            <h5 className="text-black dark:text-white p2-2 text-[18px]">
                              {item.user.name}
                              <Ratings rating={item.rating} />
                            </h5>
                          </div>
                          <p className="text-black dark:text-white">
                            {item.comment}
                          </p>
                          <small className="text-black dark:text-white">
                            {item.createdAt} •
                          </small>
                        </div>
                        <div className="pl-2 flex 800px:hidden items-center">
                          <h5 className="text-black dark:text-white text-[18px]"></h5>
                          <Ratings rating={item.rating} />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="top=[100px] w-full">
              <CoursePlayer
                videoUrl={data.demoUrl}
                title={data?.title}
                //thumnail={data?.thumbnail?.url || "imagethumbnail"}
              />
              {isPurchased ? null : (
                <div className="flex items-center">
                  <h1 className="text-black dark:text-white pt-5 text-[25px] ">
                    {data.price === 0 ? "FREE" : data.price + "₹"}
                  </h1>
                  <h5 className="text-black dark:text-white pl-3 text-[20px] mt-2 line-through opacity-80 ">
                    {data.estimatedPrice} ₹
                  </h5>
                  <h4 className="text-black dark:text-white pl-5 pt-4 text-[22px] ">
                    {discountPercentagePrice} % OFF
                  </h4>
                </div>
              )}
              <div className="flex items-center">
                {!user ? (
                  <div className="space-y-2">
                    <div className="text-gray-600 font-medium">
                      Please Login to View and Purchase Full Course
                    </div>
                  </div>
                ) : (
                  <>
                    {isPurchased ? (
                      <Link
                        className="inline-block px-5 py-2 mt-4 bg-green-500 text-white rounded-md font-medium hover:bg-green-600"
                        href={`/course-access/${data._id}`}
                      >
                        Enter to Course
                      </Link>
                    ) : (
                      <div
                        className="inline-block px-3 mt-2 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-700 cursor-pointer"
                        onClick={() => handleOrder(data.price)}
                      >
                        Buy Now {data.price} ₹
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <br />
            <p className="pb-1 text-black dark:text-white">
              Full lifetime access
            </p>
            <p className="pb-1 text-black dark:text-white">
              Source code included
            </p>
            <p className="pb-1 text-black dark:text-white">
              Certificate of complition
            </p>
            <p className="pb-1 text-black dark:text-white">Premium Support</p>
          </div>
        </div>
      </div>
      {open && (
        <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[500px] min-h-[500px] bg-white rounded-lg shadow p-3">
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={40}
                className="text-black cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;

// import CoursePlayer from "@/app/utils/CoursePlayer";
// import Ratings from "@/app/utils/Ratings";
// import { Rating } from "@mui/material";
// import Link from "next/link";
// import React, { useState } from "react";
// import {
//   IoCheckmarkDone,
//   IoCloseOutline,
// } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import CourseContentList from "./CourseContentList";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FaBook, FaStar, FaUserGraduate } from "react-icons/fa";

// type Props = {
//   data: any;
// };

// const loadRazorpayScript = async () => {
//   return new Promise((resolve) => {
//     if (document.getElementById("razorpay-script")) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.id = "razorpay-script";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// function CourseDetails({ data }: Props) {
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((state: any) => state.auth);

//   // Fallback values if data is undefined or missing properties
//   const safeData = data || {};
//   const discountPercentage =
//     safeData.estimatedPrice && safeData.price
//       ? ((safeData.estimatedPrice - safeData.price) / safeData.estimatedPrice) * 100
//       : 0;
//   const discountPercentagePrice = discountPercentage.toFixed(0);
//   const isPurchased =
//     user && user?.courses?.find((item: any) => item._id === safeData._id);
//   const courseId = safeData._id;

//   const handleOrder = async (amount: number) => {
//     const scriptLoaded = await loadRazorpayScript();

//     if (!scriptLoaded) {
//       console.error("❌ Razorpay SDK failed to load");
//       alert("Razorpay SDK failed to load. Please refresh and try again.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/v1/make-payment",
//         { amount }
//       );

//       if (!response.data || !response.data.order_id) {
//         alert("Failed to get order ID from server.");
//         return;
//       }

//       const { order_id } = response.data;

//       if (typeof window !== "undefined" && window.Razorpay) {
//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//           amount: amount * 100,
//           currency: "INR",
//           name: "LearnifyHub",
//           description: "Purchase Course",
//           order_id,
//           handler: async function (response: any) {
//             const paymentData = {
//               courseId,
//               payment_Info: {
//                 id: response.razorpay_payment_id,
//                 order_id: response.razorpay_order_id,
//                 signature: response.razorpay_signature,
//               },
//             };

//             const verifyPayment = await axios.post(
//               "http://localhost:8080/api/v1/create-order",
//               paymentData,
//               { withCredentials: true }
//             );
//             console.log("verify payment", verifyPayment);
//             if (verifyPayment.data.success) {
//               toast.success(verifyPayment.data.message);
//               window.location.reload();
//             } else {
//               alert("Payment Verification Failed.");
//             }
//           },
//           prefill: {
//             email: user?.email || "user@example.com",
//           },
//           theme: { color: "#528FF0" },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       } else {
//         console.error("Razorpay SDK not loaded");
//         alert("Razorpay SDK not loaded. Please refresh and try again.");
//       }
//     } catch (error) {
//       console.error("Payment initiation error:", error);
//       alert("Something went wrong while processing your payment.");
//     }
//   };

//   // If data is not provided, show a loading or error state
//   if (!data) {
//     return (
//       <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
//         <p className="text-base text-gray-700 dark:text-gray-300">
//           Loading course details...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-gray-900 min-h-screen">
//       {/* Header Section */}
//       <div className="bg-gray-800 text-white py-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold mb-4">{safeData.name || "Untitled Course"}</h1>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Ratings rating={safeData.rating || 0} />
//               <span className="text-base text-gray-300">
//                 {safeData.rating ? safeData.rating.toFixed(1) : "0.0"} (
//                 {safeData.reviews?.length || 0} Reviews)
//               </span>
//             </div>
//             <span className="text-base text-gray-300">
//               {safeData.purchased || 0} Students Enrolled
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10">
//         {/* Left Section */}
//         <div className="w-full lg:w-2/3 space-y-10">
//           {/* Video Preview */}
//           <div>
//             <CoursePlayer videoUrl={safeData.demoUrl} title={safeData.title} />
//           </div>

//           {/* What You'll Learn */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//               What You’ll Learn
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {safeData.benefits?.map((item: any, index: number) => (
//                 <div className="flex items-start gap-2" key={index}>
//                   <IoCheckmarkDone className="text-green-500 mt-1 flex-shrink-0" size={20} />
//                   <p className="text-base text-gray-700 dark:text-gray-300">
//                     {item.title}
//                   </p>
//                 </div>
//               )) || <p className="text-base text-gray-700 dark:text-gray-300">No benefits listed.</p>}
//             </div>
//           </div>

//           {/* Course Content */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//               Course Content
//             </h2>
//             <CourseContentList data={safeData.courseData} isDemo={true} />
//           </div>

//           {/* Description */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//               Description
//             </h2>
//             <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
//               {safeData.description || "No description available."}
//             </p>
//           </div>

//           {/* Prerequisites */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//               Requirements
//             </h2>
//             <ul className="space-y-2">
//               {safeData.prerequisites?.map((item: any, index: number) => (
//                 <li className="flex items-start gap-2" key={index}>
//                   <IoCheckmarkDone className="text-green-500 mt-1 flex-shrink-0" size={20} />
//                   <span className="text-base text-gray-700 dark:text-gray-300">
//                     {item.title}
//                   </span>
//                 </li>
//               )) || <li className="text-base text-gray-700 dark:text-gray-300">No prerequisites listed.</li>}
//             </ul>
//           </div>

//           {/* Reviews */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
//               Student Reviews
//             </h2>
//             <div className="flex items-center gap-2 mb-4">
//               <Ratings rating={safeData.rating || 0} />
//               <span className="text-base text-gray-600 dark:text-gray-300">
//                 {safeData.rating ? safeData.rating.toFixed(1) : "0.0"} (
//                 {safeData.reviews?.length || 0} Reviews)
//               </span>
//             </div>
//             <div className="space-y-6">
//               {safeData.reviews?.length > 0 ? (
//                 [...safeData.reviews].reverse().map((item: any, index: number) => (
//                   <div className="border-b border-gray-200 dark:border-gray-700 pb-6" key={index}>
//                     <div className="flex items-start gap-4">
//                       <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
//                         <span className="text-white text-base font-medium">
//                           {item.user?.name?.slice(0, 2).toUpperCase() || "AN"}
//                         </span>
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2">
//                           <h5 className="text-base font-medium text-gray-900 dark:text-white">
//                             {item.user?.name || "Anonymous"}
//                           </h5>
//                           <Ratings rating={item.rating || 0} />
//                         </div>
//                         <p className="text-base text-gray-700 dark:text-gray-300 mt-1">
//                           {item.comment || "No comment provided."}
//                         </p>
//                         <small className="text-sm text-gray-500 dark:text-gray-400">
//                           {item.createdAt || "Date not available"}
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-base text-gray-700 dark:text-gray-300">No reviews yet.</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Section (Sticky Purchase Area) */}
//         <div className="w-full lg:w-1/3">
//           <div className="lg:sticky lg:top-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-6">
//             <div className="space-y-2">
//               {!isPurchased && (
//                 <>
//                   <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                     {safeData.price === 0 ? "FREE" : `${safeData.price || 0}₹`}
//                   </h1>
//                   {safeData.estimatedPrice && (
//                     <div className="flex items-center gap-2">
//                       <span className="text-base text-gray-500 dark:text-gray-400 line-through">
//                         {safeData.estimatedPrice}₹
//                       </span>
//                       <span className="text-base text-green-500 font-medium">
//                         {discountPercentagePrice}% OFF
//                       </span>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//             <div>
//               {!user ? (
//                 <p className="text-base text-gray-600 dark:text-gray-300">
//                   Please login to purchase this course.
//                 </p>
//               ) : isPurchased ? (
//                 <Link
//                   href={`/course-access/${safeData._id}`}
//                   className="block w-full text-center py-3 bg-green-600 text-white rounded-md font-medium text-base hover:bg-green-700 transition"
//                 >
//                   Go to Course
//                 </Link>
//               ) : (
//                 <button
//                   onClick={() => handleOrder(safeData.price || 0)}
//                   className="w-full py-3 bg-blue-600 text-white rounded-md font-medium text-base hover:bg-blue-700 transition"
//                 >
//                   Buy Now {safeData.price || 0}₹
//                 </button>
//               )}
//             </div>
//             <ul className="space-y-3 text-base text-gray-700 dark:text-gray-300">
//               <li className="flex items-center gap-2">
//                 <FaBook className="text-blue-500 flex-shrink-0" size={16} />
//                 Full lifetime access
//               </li>
//               <li className="flex items-center gap-2">
//                 <FaStar className="text-blue-500 flex-shrink-0" size={16} />
//                 Source code included
//               </li>
//               <li className="flex items-center gap-2">
//                 <FaUserGraduate className="text-blue-500 flex-shrink-0" size={16} />
//                 Certificate of completion
//               </li>
//               <li className="flex items-center gap-2">
//                 <IoCheckmarkDone className="text-blue-500 flex-shrink-0" size={16} />
//                 Premium Support
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {open && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
//             <div className="flex justify-end">
//               <IoCloseOutline
//                 size={32}
//                 className="text-gray-900 dark:text-white cursor-pointer"
//                 onClick={() => setOpen(false)}
//               />
//             </div>
//             {/* Add modal content here if needed */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CourseDetails;