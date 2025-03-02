// import React, { useState } from "react";
// import { FaQuestionCircle, FaPlus, FaMinus } from "react-icons/fa";

// type FAQItem = {
//   question: string;
//   answer: string;
// };

// const faqData: FAQItem[] = [
//   {
//     question: "What distinguishes this Learning Management System?",
//     answer:
//       "Our LMS is a sophisticated platform tailored for creating, managing, and delivering high-quality online courses. It offers robust tools for educators and learners alike, ensuring an intuitive and seamless experience comparable to industry leaders.",
//   },
//   {
//     question: "How can I begin my learning journey with a course?",
//     answer:
//       'To get started, create an account, explore our comprehensive course catalog, and select "Enroll" on your desired course. For premium offerings, complete the secure payment process, and you’ll gain immediate access to your learning materials.',
//   },
//   {
//     question: "Is it possible to develop and share my own educational content?",
//     answer:
//       "Absolutely. Upon registering as an instructor, you’ll access our advanced course creation suite. This allows you to design engaging content, set competitive pricing, and publish your courses to a global audience with ease.",
//   },
//   {
//     question: "Does the platform support mobile learning?",
//     answer:
//       "While a dedicated mobile application is in development, our platform is fully optimized for mobile browsers, providing a responsive and fluid experience across all devices for uninterrupted learning on the go.",
//   },
// ];

// const FAQ = (props: Props) => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const toggleFAQ = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#383838] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
//       <div className="max-w-4xl w-full space-y-12">
//         {/* Header */}
//         <div className="text-center relative">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2d2d2d] dark:text-[#f3f4f6] tracking-tight">
//             Frequently Asked Questions
//           </h1>
//           <div className="mt-2 w-24 h-1 mx-auto bg-[#FF8C00] dark:bg-[#FFA500] rounded-full" />
//           <p className="mt-4 text-lg text-[#4B4B4B] dark:text-[#D1D5DB] font-medium max-w-2xl mx-auto">
//             Explore key insights about our cutting-edge Learning Management
//             System.
//           </p>
//         </div>

//         {/* FAQ List */}
//         <div className="space-y-6">
//           {faqData.map((item, index) => (
//             <div
//               key={index}
//               className={`bg-[#F5F5F5] dark:bg-[#4A4A4A] shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 border border-[#D1D1D1] dark:border-[#5A5A5A] ${
//                 activeIndex === index
//                   ? "ring-2 ring-[#FF8C00] dark:ring-[#FFA500]"
//                   : ""
//               }`}
//             >
//               <button
//                 onClick={() => toggleFAQ(index)}
//                 className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none bg-gradient-to-r from-[#F0F0F0] to-[#E8E8E8] dark:from-[#424242] dark:to-[#3C3C3C] hover:from-[#E8E8E8] hover:to-[#E0E0E0] dark:hover:from-[#4A4A4A] dark:hover:to-[#444444] transition-colors duration-300"
//               >
//                 <div className="flex items-center space-x-4">
//                   <FaQuestionCircle className="text-[#FF8C00] dark:text-[#FFA500] w-6 h-6 shrink-0" />
//                   <span className="text-xl font-semibold text-[#2d2d2d] dark:text-[#f3f4f6]">
//                     {item.question}
//                   </span>
//                 </div>
//                 <span className="text-[#FF8C00] dark:text-[#FFA500]">
//                   {activeIndex === index ? (
//                     <FaMinus className="w-5 h-5" />
//                   ) : (
//                     <FaPlus className="w-5 h-5" />
//                   )}
//                 </span>
//               </button>

//               {activeIndex === index && (
//                 <div className="px-6 py-5 bg-[#ECECEC] dark:bg-[#404040] text-[#4B4B4B] dark:text-[#D1D5DB] border-t border-[#D1D1D1] dark:border-[#5A5A5A] animate-slide-down transition-all duration-300">
//                   <p className="text-base leading-relaxed">{item.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <p className="text-[#4B4B4B] dark:text-[#D1D5DB] text-lg">
//             Have additional inquiries?{" "}
//             <a
//               href="mailto:learnifyhubplatform@gmail.com?subject=Query%20About%20Learnify%20LMS&body=Hello%20Learnify%20Team,%0D%0A%0D%0AI%20have%20a%20question%20about%20your%20platform:%20[Your%20query%20here].%0D%0A%0D%0AThank%20you,%0D%0A[Your%20Name]"
//               className="inline-block bg-[#FF8C00] dark:bg-[#FFA500] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#E07B00] dark:hover:bg-[#CC8400] transition-colors duration-300 shadow-sm hover:shadow-md"
//             >
//               Contact Us
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;

import React, { useState } from "react";
import { FaQuestionCircle, FaPlus, FaMinus } from "react-icons/fa";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[][] = [
  [
    {
      question: "What makes this LMS unique?",
      answer:
        "Our LMS stands out with its intuitive design, advanced analytics, and seamless integration of interactive tools.",
    },
    {
      question: "How do I enroll in a course?",
      answer:
        "Sign up, browse our course library, click 'Enroll,' and complete payment for premium courses.",
    },
    {
      question: "Can I track my progress?",
      answer:
        "Yes, track completion rates, quiz scores, and personalized milestones.",
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a 7-day free trial for select courses.",
    },
  ],
  [
    {
      question: "Who can create courses?",
      answer:
        "Anyone can sign up and use our course builder to create content.",
    },
    {
      question: "What tools are available for instructors?",
      answer: "Multimedia uploads, quiz generators, and real-time analytics.",
    },
    {
      question: "How are courses priced?",
      answer: "Instructors set prices with options for free or paid access.",
    },
    {
      question: "Can I collaborate?",
      answer: "Yes, co-authoring features enable teamwork.",
    },
  ],
  [
    {
      question: "Is it mobile-friendly?",
      answer: "Yes, fully responsive with a mobile app in development.",
    },
    {
      question: "What learner support is available?",
      answer: "24/7 support, forums, and live Q&A sessions.",
    },
    {
      question: "Are certificates provided?",
      answer: "Yes, earn verifiable digital certificates.",
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Self-paced courses with lifetime access.",
    },
  ],
  [
    {
      question: "How secure is my data?",
      answer: "Top-tier encryption and global privacy standards.",
    },
    {
      question: "What payment methods?",
      answer: "Cards, PayPal, and select cryptocurrencies.",
    },
    {
      question: "Can I request custom courses?",
      answer: "Contact us for tailored course development.",
    },
    {
      question: "How often is content updated?",
      answer: "Regularly updated by instructors.",
    },
  ],
];

const FAQSection = ({ items }: { items: FAQItem[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-6 w-full space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="faq-item bg-white dark:bg-[#383838] rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-300"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between bg-white dark:bg-[#383838] hover:bg-gray-50 dark:hover:bg-[#424242] transition-colors duration-300 rounded-lg focus:outline-none"
          >
            <div className="flex items-center space-x-3">
              <FaQuestionCircle className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span
                className={`text-base sm:text-lg font-medium transition-colors duration-300 ${
                  activeIndex === index
                    ? "text-blue-500 dark:text-blue-500"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {item.question}
              </span>
            </div>
            <span className="text-blue-500 dark:text-blue-500 transition-transform duration-300">
              {activeIndex === index ? (
                <FaMinus className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <FaPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </span>
          </button>
          {activeIndex === index && (
            <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 dark:bg-[#404040] text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-600 animate-slide-down">
              <p className="text-sm sm:text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FAQ = () => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const sections = [
    "Getting Started",
    "For Instructors",
    "Learning Experience",
    "Platform Details",
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#383838] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-500">
      <div className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl">
        <div className="text-center relative">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2d2d2d] dark:text-[#f3f4f6] tracking-tight">
            Frequently Asked Questions
          </h1>{" "}
          <div className="mt-2 w-24 h-1 mx-auto bg-[#2a67ea] dark:bg-[#2a67ea] rounded-full" />
          <p className="mt-2 text-lg text-[#4B4B4B] dark:text-[#D1D5DB] font-medium max-w-2xl mx-auto">
            {" "}
            Explore key insights about our cutting-edge Learning Management
            System.
          </p>
        </div>

        {/* Section Buttons */}
        <div className="flex flex-wrap justify-center mt-4 gap-2 sm:gap-3 mb-8">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-md transition-all duration-300 w-full sm:w-auto ${
                activeSection === index
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-white dark:bg-[#424242] text-blue-500 dark:text-blue-500 border border-blue-500 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-[#4A4A4A]"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* FAQ Section Content */}
        {faqData[activeSection] ? (
          <FAQSection items={faqData[activeSection]} />
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No FAQs available.
          </p>
        )}

        {/* Contact Section */}
        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            Need more help?{" "}
            <a
              href="mailto:learnifyhubplatform@gmail.com?subject=Query%20About%20Learnify%20LMS"
              className="inline-block bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-md font-medium hover:bg-blue-600 transition-colors duration-300 shadow-sm"
            >
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
