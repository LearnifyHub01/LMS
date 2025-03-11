import React from "react";
import Image from "next/image";

interface Review {
  name: string;
  avatar: string;
  profession: string;
  comment: string;
}

interface Props {
  item: Review;
}

const ReviewCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-5">
        <Image
          src={item.avatar}
          alt={`${item.name}'s avatar`}
          width={60}
          height={60}
          className="rounded-full mr-4 p-1"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic font-roboto">
            {item.profession}
          </p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 font-roboto relative text-base leading-relaxed">
        <span className="absolute -top-4 -left-2 text-3xl text-indigo-500 opacity-50 font-serif">
          “
        </span>
        {item.comment}
        <span className="absolute -bottom-4 -right-2 text-3xl text-indigo-500 opacity-50 font-serif">
          ”
        </span>
      </p>
    </div>
  );
};

export default ReviewCard;
