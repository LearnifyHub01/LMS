import React, { FC } from "react";
import Link from "next/link";

interface TeachModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void;
}

const TeachModal: FC<TeachModalProps> = ({ open, setOpen, setRoute }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl m-4">
        <div className="relative">
          <button
            className="text-lg absolute top-0 right-0 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Join Our Teaching Community</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Become a teacher at LearnifyHub and share your expertise with thousands of eager learners. Create engaging courses, 
            inspire students, and earn while doing what you love. Join our community of passionate educators today!
          </p>
          <Link href="/teach">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full"
              onClick={() => {
                setOpen(false);
                setRoute("");
              }}
            >
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeachModal;