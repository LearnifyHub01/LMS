import React from "react";
import ReviewCard from "../Review/ReviewCard";

interface Review {
  name: string;
  avatar: string;
  profession: string;
  comment: string;
}

// Export reviews array with typed data
export const reviews: Review[] = [
  {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Web Developer",
    comment:
      "This LMS transformed my learning experience! The courses are well-structured, and the interface is super intuitive. Highly recommend!",
  },
  {
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Data Science Student",
    comment:
      "The variety of courses and the quality of content are outstanding. I’ve gained practical skills I can apply immediately.",
  },
  {
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Graphic Designer",
    comment:
      "I love how engaging the lessons are! The instructors are knowledgeable, and the platform is easy to navigate.",
  },
  {
    name: "James Carter",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    profession: "Software Engineer",
    comment:
      "A fantastic platform for upskilling. The progress tracking keeps me motivated, and the content is top-notch.",
  },
  {
    name: "Aisha Patel",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    profession: "Marketing Specialist",
    comment:
      "Affordable and packed with value! This LMS has helped me level up my career with practical, real-world knowledge.",
  },
  {
    name: "Aisha Patel",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    profession: "Marketing Specialist",
    comment:
      "Affordable and packed with value! This LMS has helped me level up my career with practical, real-world knowledge.",
  },
];

type Props = {};

const Reviews: React.FC<Props> = () => {
  return (
    <div className="w-full bg-[#DDE6ED] dark:bg-[#27374D] py-2">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Voices of Excellence: Our Learners’ Experiences
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how our cutting-edge Learning Management System empowers
            professionals and students alike to achieve their goals with
            confidence and skill.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard item={review} key={index} />
          ))}
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Reviews;
