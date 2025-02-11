// 'use client'
// import Image from "next/image";
// import React, { FC } from "react";
// import { FaSearch } from "react-icons/fa";
// import Image1 from "../../../public/assests/f993a37eb635feef43e96323100d5fa5.png";
// import { FaBook } from "react-icons/fa";
// import { motion } from "framer-motion";
// type Props = {};

// const Hero: FC<Props> = () => {
//   return (
//     <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-[#DDE6ED] dark:bg-[#27374D] relative">
//       {/* Left Side - Image */}
//       <div className="image-container">
//         <Image
//           src={Image1}
//           alt="Hero Image"
//           className="object-cover w-full h-full rounded-full"
//           layout="intrinsic"
//           priority
//         />
//       </div>

//       <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left space-y-8">
//         {/* Heading Section */}
//         <h1 className="text-4xl lg:text-5xl font-thin text-gray-800 dark:text-white relative">
//           Welcome to{" "}
//           <span className="relative">
//             LearnifyHub
//             <svg
//               viewBox="0 0 286 73"
//               fill="none"
//               className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
//             >
//               <motion.path
//                 initial={{ pathLength: 0 }}
//                 whileInView={{ pathLength: 1 }}
//                 transition={{
//                   duration: 1.25,
//                   ease: "easeInOut",
//                 }}
//                 d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
//                 stroke="#FACC15"
//                 strokeWidth="3"
//               />
//             </svg>
//           </span>
//         </h1>

//         {/* Subheading */}
//         <p className="lg:text-xl text-gray-600 dark:text-white">
//           Elevate your skills, master your goals - start learning now.
//         </p>

//         {/* Search Bar */}
//         <form className="flex w-full items-center max-w-lg">
//           <label htmlFor="search" className="sr-only">
//             Search
//           </label>
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaBook className="w-5 h-6 text-gray-500 dark:text-gray-400" />
//             </div>
//             <input
//               type="text"
//               id="search"
//               className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               style={{ width: "400px" }}
//               placeholder="Search Courses..."
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="ml-2 mr-16 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             <FaSearch className="w-4 h-4" />
//             <span className="sr-only">Search</span>
//           </button>
//         </form>

//         {/* Trust Statement */}
//         <div className="text-center lg:text-left">
//           <h5 className="text-lg text-gray-700 dark:text-gray-300">
//             500k+ people already trust us.{" "}
//             <a
//               href="/courses"
//               className="text-blue-600 underline hover:text-blue-800 transition-colors"
//             >
//               View Courses
//             </a>
//           </h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

// import React, { ReactNode, useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { FiArrowUpRight } from "react-icons/fi";

// export const Hero = () => {
//   return (
//     <div className="bg-white">
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         subheading="Collaborate"
//         heading="Built for all of us."
//       >
//         <ExampleContent />
//       </TextParallaxContent>
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         subheading="Quality"
//         heading="Never compromise."
//       >
//         <ExampleContent />
//       </TextParallaxContent>
//       <TextParallaxContent
//         imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         subheading="Modern"
//         heading="Dress for the best."
//       >
//         <ExampleContent />
//       </TextParallaxContent>
//     </div>
//   );
// };

// const IMG_PADDING = 12;

// const TextParallaxContent = ({
//   imgUrl,
//   subheading,
//   heading,
//   children,
// }: {
//   imgUrl: string;
//   subheading: string;
//   heading: string;
//   children: ReactNode;
// }) => {
//   return (
//     <div
//       style={{
//         paddingLeft: IMG_PADDING,
//         paddingRight: IMG_PADDING,
//       }}
//     >
//       <div className="relative h-[150vh]">
//         <StickyImage imgUrl={imgUrl} />
//         <OverlayCopy heading={heading} subheading={subheading} />
//       </div>
//       {children}
//     </div>
//   );
// };

// const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["end end", "end start"],
//   });

//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
//   const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

//   return (
//     <motion.div
//       style={{
//         backgroundImage: url(${imgUrl}),
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: calc(100vh - ${IMG_PADDING * 2}px),
//         top: IMG_PADDING,
//         scale,
//       }}
//       ref={targetRef}
//       className="sticky z-0 overflow-hidden rounded-3xl"
//     >
//       <motion.div
//         className="absolute inset-0 bg-neutral-950/70"
//         style={{
//           opacity,
//         }}
//       />
//     </motion.div>
//   );
// };

// const OverlayCopy = ({
//   subheading,
//   heading,
// }: {
//   subheading: string;
//   heading: string;
// }) => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start end", "end start"],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
//   const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

//   return (
//     <motion.div
//       style={{
//         y,
//         opacity,
//       }}
//       ref={targetRef}
//       className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
//     >
//       <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
//         {subheading}
//       </p>
//       <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
//     </motion.div>
//   );
// };

// const ExampleContent = () => (
//   <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
//     <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
//       Additional content explaining the above card here
//     </h2>
//     <div className="col-span-1 md:col-span-8">
//       <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
//         blanditiis soluta eius quam modi aliquam quaerat odit deleniti minima
//         maiores voluptate est ut saepe accusantium maxime doloremque nulla
//         consectetur possimus.
//       </p>
//       <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
//         reiciendis blanditiis aliquam aut fugit sint.
//       </p>
//       <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
//         Learn more <FiArrowUpRight className="inline" />
//       </button>
//     </div>
//   </div>
// );

// export default Hero;

// "use client";
// import Image from "next/image";
// import React, { FC } from "react";
// import { FaSearch } from "react-icons/fa";
// import Image1 from "../../../public/assests/f993a37eb635feef43e96323100d5fa5.png";
// import { FaBook } from "react-icons/fa";
// import Marquee from "react-fast-marquee";

// type Props = {};

// const Hero: FC<Props> = () => {
//   return (
//     <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-[#DDE6ED] dark:bg-[#27374D] relative overflow-hidden">
//       {/* Background Scrolling Text using react-fast-marquee */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <Marquee gradient={false} speed={30}>
//           <span className="w-fit whitespace-nowrap text-[10vmax] font-black uppercase leading-[0.75] text-slate-300">
//             Live Inspired
//           </span>
//         </Marquee>
//       </div>

//       {/* Left Side - Image */}
//       <div className="image-container relative z-10">
//         <Image
//           src={Image1}
//           alt="Hero Image"
//           className="object-cover w-full h-full rounded-full"
//           layout="intrinsic"
//           priority
//         />
//       </div>

//       {/* Right Side - Content */}
//       <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left space-y-8 relative z-10">
//         {/* Heading Section */}
//         <h1 className="text-4xl lg:text-5xl font-thin text-gray-800 dark:text-white relative">
//           Welcome to <span className="relative">LearnifyHub</span>
//         </h1>

//         {/* Subheading */}
//         <p className="lg:text-xl text-gray-600 dark:text-white">
//           Elevate your skills, master your goals - start learning now.
//         </p>

//         {/* Search Bar */}
//         <form className="flex w-full items-center max-w-lg">
//           <label htmlFor="search" className="sr-only">
//             Search
//           </label>
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaBook className="w-5 h-6 text-gray-500 dark:text-gray-400" />
//             </div>
//             <input
//               type="text"
//               id="search"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               style={{ width: "400px" }}
//               placeholder="Search Courses..."
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="ml-2 mr-16 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             <FaSearch className="w-4 h-4" />
//             <span className="sr-only">Search</span>
//           </button>
//         </form>

//         {/* Trust Statement */}
//         <div className="text-center lg:text-left">
//           <h5 className="text-lg text-gray-700 dark:text-gray-300">
//             500k+ people already trust us.{" "}
//             <a
//               href="/courses"
//               className="text-blue-600 underline hover:text-blue-800 transition-colors"
//             >
//               View Courses
//             </a>
//           </h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;


// 'use client'
// import React, { FC } from "react";
// import Image1 from "../../../public/assests/f993a37eb635feef43e96323100d5fa5.png";
// import { FaSearch } from "react-icons/fa";
// import Image from "next/image";

// type Props = {};
// const Hero: FC<Props> = () => {
//   return (
//     <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-[#DDE6ED] dark:bg-[#27374D] relative overflow-hidden">
//       {/* Continuous Scroll */}
//       <div className="absolute top-10 w-full overflow-hidden select-none">
//         <div className="marquee-wrapper">
//           <div className="marquee-container">
//             <span className="marquee-text">Get motivated</span>
//             <span className="marquee-text">Get motivated</span>
//           </div>
//           <div className="marquee-container">
//             <span className="marquee-text">Live inspired</span>
//             <span className="marquee-text">Live inspired</span>
//           </div>
//           <div className="marquee-container">
//             <span className="marquee-text">Find your passion</span>
//             <span className="marquee-text">Find your passion</span>
//           </div>
//           <div className="marquee-container">
//             <span className="marquee-text">Build an empire</span>
//             <span className="marquee-text">Build an empire</span>
//           </div>
//         </div>
//       </div>

//       {/* Left Side - Image */}
//       <div className="image-container">
//         <Image
//           src={Image1}
//           alt="Hero Image"
//           className="object-cover w-full h-full rounded-full"
//           layout="intrinsic"
//           priority
//         />
//       </div>

//       <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left space-y-8">
//         {/* Heading Section */}
//         <h1 className="text-4xl lg:text-5xl font-thin text-gray-800 dark:text-white relative">
//           Welcome to{" "}
//           <span className="relative">
//             LearnifyHub
//           </span>
//         </h1>

//         {/* Subheading */}
//         <p className="lg:text-xl text-gray-600 dark:text-white">
//           Elevate your skills, master your goals - start learning now.
//         </p>

//         {/* Search Bar */}
//         <form className="flex w-full items-center max-w-lg">
//           <label htmlFor="search" className="sr-only">
//             Search
//           </label>
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaSearch className="w-5 h-6 text-gray-500 dark:text-gray-400" />
//             </div>
//             <input
//               type="text"
//               id="search"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search Courses..."
//               required
//             />
//           </div>
//         </form>

//         {/* Trust Statement */}
//         <div className="text-center lg:text-left">
//           <h5 className="text-lg text-gray-700 dark:text-gray-300">
//             500k+ people already trust us.{" "}
//             <a
//               href="/courses"
//               className="text-blue-600 underline hover:text-blue-800 transition-colors"
//             >
//               View Courses
//             </a>
//           </h5>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Hero;

// "use client";
// import Image from "next/image";
// import React, { FC } from "react";
// import { FaSearch } from "react-icons/fa";
// import Image1 from "../../../public/assests/f993a37eb635feef43e96323100d5fa5.png";
// import { FaBook } from "react-icons/fa";
// import Marquee from "react-fast-marquee";

// type Props = {};

// const Hero: FC<Props> = () => {
//   return (
//     <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-[#DDE6ED] dark:bg-[#27374D] relative overflow-hidden">
//       {/* Marquee Background Text */}
//       <div className="absolute top-0 left-0 w-full z-0">
//         <Marquee gradient={false} speed={30} direction="left">
//           <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-500 opacity-30">
//             FOCUS
//           </span><br />
//           <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-500 opacity-30">
//             FOCUS
//           </span><br />
//           <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-500 opacity-30">
//             FOCUS
//           </span>
//         </Marquee>
//       </div>
//       <div className="absolute top-17 left-0 w-full z-0">
//         <Marquee gradient={false} speed={30} direction="left">
//           <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-500 opacity-30">
//             GROW
//           </span>
//           <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-500 opacity-30">
//             GROW
//           </span>
//           <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-500 opacity-30">
//             GROW
//           </span>
//         </Marquee>
//       </div>


//       {/* Left Side - Image */}
//       <div className="image-container z-10">
//         <Image
//           src={Image1}
//           alt="Hero Image"
//           className="object-cover w-full h-full rounded-full"
//           layout="intrinsic"
//           priority
//         />
//       </div>

//       <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left space-y-8 z-10">
//         {/* Heading Section */}
//         <h1 className="text-4xl lg:text-5xl font-thin text-gray-800 dark:text-white relative">
//           Welcome to <span className="relative">LearnifyHub</span>
//         </h1>

//         {/* Subheading */}
//         <p className="lg:text-xl text-gray-600 dark:text-white">
//           Elevate your skills, master your goals - start learning now.
//         </p>

//         {/* Search Bar */}
//         <form className="flex w-full items-center max-w-lg">
//           <label htmlFor="search" className="sr-only">
//             Search
//           </label>
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaBook className="w-5 h-6 text-gray-500 dark:text-gray-400" />
//             </div>
//             <input
//               type="text"
//               id="search"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               style={{ width: "400px" }}
//               placeholder="Search Courses..."
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="ml-2 mr-16 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             <FaSearch className="w-4 h-4" />
//             <span className="sr-only">Search</span>
//           </button>
//         </form>

//         {/* Trust Statement */}
//         <div className="text-center lg:text-left">
//           <h5 className="text-lg text-gray-700 dark:text-gray-300">
//             500k+ people already trust us.{" "}
//             <a
//               href="/courses"
//               className="text-blue-600 underline hover:text-blue-800 transition-colors"
//             >
//               View Courses
//             </a>
//           </h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

"use client";
import Image from "next/image";
import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import Image1 from "../../../public/assests/f993a37eb635feef43e96323100d5fa5.png";
import { FaBook } from "react-icons/fa";
import Marquee from "react-fast-marquee";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-[#DDE6ED] dark:bg-[#27374D] relative overflow-hidden">
      {/* Marquee Background Text */}
      <div className="absolute top-0 left-0 w-full z-0">
        <Marquee gradient={false} speed={50} direction="left" loop={0} className="marquee-no-scrollbar">
          <span className="select-none whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
            grow daily&nbsp;grow daily&nbsp;grow daily&nbsp;grow daily&nbsp;
          </span>
        </Marquee>
      </div>
      <div className="absolute top-[170px] left-0 w-full z-0">
        <Marquee gradient={false} speed={50} direction="right" loop={0} className="marquee-no-scrollbar">
          <span className="select-none whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
             Stay Focused&nbsp;Stay Focused&nbsp;Stay Focused&nbsp;Stay Focused&nbsp;
          </span>
        </Marquee>
      </div>
      <div className="absolute top-[355px] left-0 w-full z-0">
        <Marquee gradient={false} speed={50} direction="left" loop={0} className="marquee-no-scrollbar">
          <span className="select-none whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
             Master Skills&nbsp;Master Skills&nbsp;Master Skills&nbsp;Master Skills&nbsp;
          </span>
        </Marquee>
      </div>
      <div className="absolute top-[530px] left-0 w-full z-0">
        <Marquee gradient={false} speed={50} direction="right" loop={0} className="marquee-no-scrollbar">
          <span className="select-none whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
             Unlock Potential&nbsp;Unlock Potential&nbsp;Unlock Potential&nbsp;Unlock Potential&nbsp;
          </span>
        </Marquee>
      </div>
   

      {/* Left Side - Image */}
      <div className="image-container z-10">
        <Image
          src={Image1}
          alt="Hero Image"
          className="object-cover select-none w-full h-full rounded-full"
          layout="intrinsic"
          priority
        />
      </div>  

      {/* Right Side - Text & Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left space-y-8 z-10">
        {/* Heading Section */}
        <h1 className="text-4xl select-none lg:text-5xl font-thin text-gray-800 dark:text-white relative">
          Welcome to <span className="relative">LearnifyHub</span>
        </h1>

        {/* Subheading */}
        <p className="lg:text-xl text-gray-600 dark:text-white">
          Elevate your skills, master your goals - start learning now.
        </p>

        {/* Search Bar */}
        <form className="flex w-full items-center max-w-lg">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaBook className="w-5 h-6 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ width: "400px" }}
              placeholder="Search Courses..."
              required
            />
          </div>
          <button
            type="submit"
            className="ml-2 mr-16 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FaSearch className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* Trust Statement */}
        <div className="text-center lg:text-left">
          <h5 className="text-lg text-gray-700 dark:text-gray-300">
            500k+ people already trust us.{" "}
            <a
              href="/courses"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              View Courses
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Hero;

// "use client";
// import Image from "next/image";
// import React, { FC } from "react";
// import { FaSearch } from "react-icons/fa";
// import Image1 from "../../../public/assests/f993a37eb635feef43e96323100d5fa5.png";
// import { FaBook } from "react-icons/fa";
// import { motion } from "framer-motion";

// type Props = {};

// const Hero: FC<Props> = () => {
//   return (
//     <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-between bg-[#DDE6ED] dark:bg-[#27374D] relative overflow-hidden">
//       {/* Marquee Effect - Text Moving Left */}
//       <motion.div
//         className="absolute top-0 left-0 w-full z-0 flex items-center"
//         initial={{ x: "0%" }} // Start off-screen from the right side
//         animate={{ x: "-120%" }} // Move off-screen to the left side
//         transition={{
//           repeat: Infinity,
//           duration: 25,
//           ease: "linear",
//         }}
//       >
//         <span className="whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
//           grow daily&nbsp;grow daily&nbsp;grow daily&nbsp;grow daily&nbsp;
//         </span>
//       </motion.div>

//       {/* Marquee Effect - Text Moving Right */}
//       <motion.div
//         className="absolute top-[150px] left-0 w-full z-0 flex items-center"
//         initial={{ x: "o%" }} // Start off-screen from the left side
//         animate={{ x: "120%" }} // Move off-screen to the right side
//         transition={{
//           repeat: Infinity,
//           duration: 25,
//           ease: "linear",
//         }}
//       >
//         <span className="whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
//           Stay Focused&nbsp;Stay Focused&nbsp;Stay Focused&nbsp;Stay Focused&nbsp;
//         </span>
//       </motion.div>

//       {/* Marquee Effect - Text Moving Left */}
//       <motion.div
//         className="absolute top-[300px] left-0 w-full z-0 flex items-center"
//         initial={{ x: "0%" }} // Start off-screen from the right side
//         animate={{ x: "-120%" }} // Move off-screen to the left side
//         transition={{
//           repeat: Infinity,
//           duration: 25,
//           ease: "linear",
//         }}
//       >
//         <span className="whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
//           Master Skills&nbsp;Master Skills&nbsp;Master Skills&nbsp;Master Skills&nbsp;
//         </span>
//       </motion.div>

//       {/* Marquee Effect - Text Moving Right */}
//       <motion.div
//         className="absolute top-[450px] left-0 w-full z-0 flex items-center"
//         initial={{ x: "0%" }} // Start off-screen from the left side
//         animate={{ x: "120%" }} // Move off-screen to the right side
//         transition={{
//           repeat: Infinity,
//           duration: 25,
//           ease: "linear",
//         }}
//       >
//         <span className="whitespace-nowrap text-[15vmax] font-black uppercase leading-[0.75] text-slate-400 opacity-30">
//           Unlock Potential&nbsp;Unlock Potential&nbsp;Unlock Potential&nbsp;Unlock Potential&nbsp;
//         </span>
//       </motion.div>

//       {/* Left Side - Image */}
//       <div className="image-container z-10">
//         <Image
//           src={Image1}
//           alt="Hero Image"
//           className="object-cover w-full h-full rounded-full"
//           layout="intrinsic"
//           priority
//         />
//       </div>

//       {/* Right Side - Text & Form */}
//       <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left space-y-8 z-10">
//         {/* Heading Section */}
//         <h1 className="text-4xl lg:text-5xl font-thin text-gray-800 dark:text-white relative">
//           Welcome to <span className="relative">LearnifyHub</span>
//         </h1>

//         {/* Subheading */}
//         <p className="lg:text-xl text-gray-600 dark:text-white">
//           Elevate your skills, master your goals - start learning now.
//         </p>

//         {/* Search Bar */}
//         <form className="flex w-full items-center max-w-lg">
//           <label htmlFor="search" className="sr-only">
//             Search
//           </label>
//           <div className="relative w-full">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <FaBook className="w-5 h-6 text-gray-500 dark:text-gray-400" />
//             </div>
//             <input
//               type="text"
//               id="search"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               style={{ width: "400px" }}
//               placeholder="Search Courses..."
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="ml-2 mr-16 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             <FaSearch className="w-4 h-4" />
//             <span className="sr-only">Search</span>
//           </button>
//         </form>

//         {/* Trust Statement */}
//         <div className="text-center lg:text-left">
//           <h5 className="text-lg text-gray-700 dark:text-gray-300">
//             500k+ people already trust us.{" "}
//             <a
//               href="/courses"
//               className="text-blue-600 underline hover:text-blue-800 transition-colors"
//             >
//               View Courses
//             </a>
//           </h5>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
