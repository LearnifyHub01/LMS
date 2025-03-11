// // import Ratings from "@/app/utils/Ratings";
// // import Image from "next/image";
// // import Link from "next/link";
// // import React, { FC } from "react";
// // import { AiOutlineUnorderedList } from "react-icons/ai";

// // type Props = {
// //   item: any;
// //   isProfile?: boolean;
// // };

// // const CourseCard: FC<Props> = ({ item, isProfile }: Props) => {
// //   return (
// //     <Link
// //       href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
// //     >
// //       <div className="w-full min-h[35vh] dark:bg-slate-500 dark:bg-opacity-20 backfrop-blur border dark:border-white border-black rounded-lg p-3 shadow-sm dark:shadow-inner">
// //         <Image
// //           src={item.thumbnail.url}
// //           width={500}
// //           height={300}
// //           objectFit="contain"
// //           className="rounded-lg"
// //           alt=""
// //         />
// //         <br />
// //         <h1 className="font-Poppins text-[16px] text-black dark:text-white">
// //           {item.name}
// //         </h1>
// //         <div className="w-full flex items-center justify-between pt-2">
// //           <Ratings rating={item.rating} />
// //           <h5
// //             className={`text-black dark:text-white ${
// //               isProfile && "hidden 800px:inline"
// //             }`}
// //           >
// //             {item.purchased} Students
// //           </h5>
// //         </div>
// //         <div className="w-full flex items-center justify-between pt-3">
// //           <div className="flex">
// //             <h3 className="text-black dark:text-white">
// //               {item.price === 0 ? "Free" : item.price + " ₹"}
// //             </h3>
// //             <h5 className="text-black dark:text-white pl-3 text-[14px] mt-[-5px] line-through opacity-80 ">
// //               {item.estimatedPrice} ₹
// //             </h5>
// //           </div>
// //           <div className="flex items-center pb-2">
// //             <AiOutlineUnorderedList size={20} />
// //             <h5 className="pl-2 text-black dark:text-white">
// //               {item.courseData?.length} Lectures
// //             </h5>
// //           </div>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // };

// // export default CourseCard;

// // import Ratings from "@/app/utils/Ratings";
// // import Image from "next/image";
// // import Link from "next/link";
// // import React, { FC } from "react";
// // import { MdOutlineSchool } from "react-icons/md";
// // import { motion } from "framer-motion";

// // type Props = {
// //   item: any;
// //   isProfile?: boolean;
// // };

// // const CourseCard: FC<Props> = ({ item, isProfile }: Props) => {
// //   return (
// //     <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
// //       <motion.div
// //         className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
// //         whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
// //         transition={{ duration: 0.3 }}
// //       >
// //         {/* Thumbnail */}
// //         <div className="relative h-60">
// //           <Image
// //             src={item.thumbnail.url}
// //             fill
// //             objectFit="cover"
// //             className="rounded-t-xl"
// //             alt={item.name}
// //           />
// //           <motion.div
// //             className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-center justify-center"
// //             initial={{ opacity: 0 }}
// //             whileHover={{ opacity: 1 }}
// //             transition={{ duration: 0.25 }}
// //           >
// //             <div className="flex items-center text-white bg-gray-800/80 px-4 py-2 rounded-full">
// //               <MdOutlineSchool size={20} />
// //               <span className="ml-2 text-sm font-medium">
// //                 {item.courseData?.length} Lessons
// //               </span>
// //             </div>
// //           </motion.div>
// //           {item.price === 0 && (
// //             <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
// //               Free
// //             </span>
// //           )}
// //         </div>

// //         {/* Content */}
// //         <div className="p-6">
// //           <h1 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-3">
// //             {item.name}
// //           </h1>
// //           <div className="flex items-center justify-between mb-4">
// //             <Ratings rating={item.rating} />
// //             <span
// //               className={`text-sm text-gray-600 dark:text-gray-400 ${
// //                 isProfile && "hidden sm:inline"
// //               }`}
// //             >
// //               {item.purchased} Students
// //             </span>
// //           </div>
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-baseline gap-2">
// //               <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
// //                 {item.price === 0 ? "Free" : `${item.price} ₹`}
// //               </span>
// //               {item.price !== 0 && (
// //                 <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
// //                   {item.estimatedPrice} ₹
// //                 </span>
// //               )}
// //             </div>
// //             <MdOutlineSchool
// //               size={24}
// //               className="text-gray-700 dark:text-gray-300"
// //             />
// //           </div>
// //         </div>
// //       </motion.div>
// //     </Link>
// //   );
// // };

// // export default CourseCard;

// import Ratings from "@/app/utils/Ratings";
// import Image from "next/image";
// import Link from "next/link";
// import React, { FC } from "react";
// import { MdOutlineSchool } from "react-icons/md";
// import { motion } from "framer-motion";
// import imagethumbnail from "../../../public/assests/charlesdeluvio-Lks7vei-eAg-unsplash.jpg";
// import { profile } from "console";

// type Props = {
//   item: any;
//   isProfile?: boolean;
// };

// const CourseCard: FC<Props> = ({ item, isProfile }: Props) => {
//   console.log(isProfile)
//   return (
//     <Link
//       href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
//     >
//       <motion.div
//         className="w-full min-h-[35vh] bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
//         whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" }}
//         transition={{ duration: 0.3 }}
//       >
//         {/* Thumbnail */}
//         <div className="relative h-60">
//           <Image
//             src={item.thumbnail?.url || "imagethumbnail"}
//             fill
//             objectFit="cover"
//             className="rounded-t-xl"
//             alt={item.name}
//           />
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             whileHover={{ opacity: 1 }}
//             transition={{ duration: 0.25 }}
//           >
//             <div className="flex items-center text-white bg-gray-800/80 px-4 py-2 rounded-full">
//               <MdOutlineSchool size={20} />
//               <span className="ml-2 text-sm font-medium">
//                 {item.courseData?.length} Lessons
//               </span>
//             </div>
//           </motion.div>
//           {item.price === 0 && (
//             <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//               Free
//             </span>
//           )}
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <h1 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-3">
//             {item.name}
//           </h1>
//           <div className="flex items-center justify-between mb-4">
//             <Ratings rating={item.rating} />
//             <span
//               className={`text-sm text-gray-600 dark:text-gray-400 ${
//                 isProfile && "hidden sm:inline"
//               }`}
//             >
//               {item.purchased} Students
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-baseline gap-2">
//               <span className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">
//                 {item.price === 0 ? "Free" : `${item.price} ₹`}
//               </span>
//               {item.price !== 0 && (
//                 <span className="text-sm text-gray-500 dark:text-gray-500 line-through">
//                   {item.estimatedPrice} ₹
//                 </span>
//               )}
//             </div>
//             <MdOutlineSchool
//               size={24}
//               className="text-gray-700 dark:text-gray-300"
//             />
//           </div>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// export default CourseCard;
import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { MdOutlineSchool } from "react-icons/md";
import { motion } from "framer-motion";
import imagethumbnail from "../../../public/assests/charlesdeluvio-Lks7vei-eAg-unsplash.jpg";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <motion.div
        className="w-full min-h-[40vh] bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.03]"
      >
        {/* Thumbnail Section */}
        <div className="relative h-64">
          <Image
            src={item.thumbnail?.url || imagethumbnail}
            fill
            objectFit="cover"
            className="rounded-t-2xl"
            alt={item.name}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center text-white bg-gray-800/80 px-3 py-1 rounded-lg">
              <MdOutlineSchool size={18} />
              <span className="ml-2 text-sm font-medium">
                {item.courseData?.length} Lessons
              </span>
            </div>
          </motion.div>
          {item.price === 0 && (
            <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
              Free
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {item.name}
          </h2>
          <div className="flex items-center justify-between">
            <Ratings rating={item.rating} />
            <span className={`text-sm text-gray-600 dark:text-gray-400 ${isProfile ? "hidden sm:inline" : ""}`}>
              {item.purchased} Students
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400">
                {item.price === 0 ? "Free" : `${item.price} ₹`}
              </span>
              {item.price !== 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  {item.estimatedPrice} ₹
                </span>
              )}
            </div>
            <MdOutlineSchool size={24} className="text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CourseCard;
