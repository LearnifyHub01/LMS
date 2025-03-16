import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import avatar from "../../../public/assests/download5.png";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReviewInCourseMutation,
} from "@/redux/features/courses/coursesApi";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  refetch,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [reviews, setReviews] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const storeUser = useSelector((state: any) => state.user.user);

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === (user?._id || "")
  );

  const handleQuestion = () => {
    if (question.trim() === "") {
      toast.error("Question can't be empty");
      return;
    }
    addNewQuestion({
      question,
      courseId: id,
      contentId: data[activeVideo]._id,
    });
  };

  const handleAnswerSubmit = () => {
    if (answer.trim() === "") {
      toast.error("Answer can't be empty");
      return;
    }
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
    }
    if (answerSuccess) {
      setAnswer("");
      setQuestionId("");
      refetch();
      toast.success("Answer added successfully");
    }
    if (reviewSuccess) {
      setReviews("");
      setRating(1);
      refetch();
      toast.success("Review added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    refetch,
  ]);

  const handleReviewSubmit = async () => {
    if (reviews.length === 0) {
      toast.error("Reviews can't be empty");
    } else {
      addReviewInCourse({ review: reviews, rating, courseId: id });
    }
  };

  const tabItems = ["Overview", "Resources", "Q&A", "Reviews"];

  return (
    <div className="w-full max-w-[1200px] py-6 mx-auto px-4 md:px-6">
      {/* Video Player */}
      <div className="overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
      </div>

      {/* Navigation Controls */}
      <div className="w-full flex items-center justify-between my-5 gap-2 md:gap-4">
        <button
          className={`flex-1 min-h-[45px] flex items-center justify-center rounded-lg font-medium transition-all duration-300 ${
            activeVideo === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
              : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg active:scale-98 dark:from-blue-700 dark:to-blue-600"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
          disabled={activeVideo === 0}
        >
          <AiOutlineArrowLeft className="mr-2" />
          <span className="hidden sm:inline">Previous Lesson</span>
          <span className="inline sm:hidden">Previous</span>
        </button>

        <button
          className={`flex-1 min-h-[45px] flex items-center justify-center rounded-lg font-medium transition-all duration-300 ${
            data.length - 1 === activeVideo
              ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg active:scale-98 dark:from-blue-600 dark:to-blue-700"
          }`}
          onClick={() =>
            setActiveVideo(
              data.length - 1 === activeVideo ? activeVideo : activeVideo + 1
            )
          }
          disabled={data.length - 1 === activeVideo}
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <span className="inline sm:hidden">Next</span>
          <AiOutlineArrowRight className="ml-2" />
        </button>
      </div>

      {/* Lesson Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white transition-colors">
        {data[activeVideo].title}
      </h1>

      {/* Tab Navigation */}
      <div className="w-full flex gap-2 md:gap-6 border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto no-scrollbar">
        {tabItems.map((text, index) => (
          <button
            key={index}
            className={`py-3 px-3 text-base md:text-lg font-medium cursor-pointer transition-all duration-300 whitespace-nowrap relative
              ${
                activeBar === index
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
            {activeBar === index && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[300px] rounded-lg transition-all">
        {activeBar === 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
            <p className="text-base md:text-lg whitespace-pre-line mb-6 dark:text-white text-gray-700 leading-relaxed">
              {data[activeVideo].description}
            </p>
          </div>
        )}

        {activeBar === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold dark:text-white text-gray-800 mb-4">
              Additional Resources
            </h3>
            {data[activeVideo]?.links?.length > 0 ? (
              data[activeVideo]?.links.map((item: any, index: number) => (
                <div
                  className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
                  key={index}
                >
                  <h2 className="font-medium text-gray-800 dark:text-white mb-2">
                    {item.title && item.title}
                  </h2>
                  <a
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline break-all flex items-center"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                    {item.url}
                  </a>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p className="text-gray-500 dark:text-gray-400">
                  No resources available for this lesson.
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  Resources will appear here when added by the instructor.
                </p>
              </div>
            )}
          </div>
        )}

        {activeBar === 2 && (
          <div className="space-y-6">
            <div className="flex w-full flex-col space-y-4">
              <div className="flex w-full items-start gap-3 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
                <Image
                  src={storeUser?.avatar?.url || avatar}
                  alt="Profile Picture"
                  height={50}
                  width={50}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0 transition-all hover:border-blue-500 dark:hover:border-blue-400"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Ask a Question
                  </h3>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Have a question about this lesson? Ask here..."
                    className="w-full min-h-[120px] p-4 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white resize-none transition-all text-gray-700"
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button
                      className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                        questionCreationLoading
                          ? "bg-blue-400 text-white cursor-not-allowed dark:bg-blue-600"
                          : "bg-blue-600 text-white hover:bg-blue-700 active:scale-98 dark:bg-blue-700 dark:hover:bg-blue-600"
                      }`}
                      onClick={
                        questionCreationLoading ? () => {} : handleQuestion
                      }
                      disabled={questionCreationLoading}
                    >
                      {questionCreationLoading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        "Submit Question"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-8"></div>

            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        )}

        {activeBar === 3 && (
          <div className="w-full">
            {!isReviewExists ? (
              <div className="space-y-6 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <Image
                    src={storeUser?.avatar?.url || avatar}
                    alt="Profile Picture"
                    height={50}
                    width={50}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0 transition-all hover:border-blue-500 dark:hover:border-blue-400"
                  />
                  <div className="flex-grow">
                    <h5 className="text-lg font-semibold mb-3 dark:text-white text-gray-800">
                      Write a Review
                    </h5>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                      <h3 className="text-base font-medium mb-2 dark:text-white text-gray-800">
                        Rating <span className="text-red-500">*</span>
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="cursor-pointer transform hover:scale-110 transition-all"
                              color="rgb(246,186,0)"
                              size={28}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="cursor-pointer transform hover:scale-110 transition-all"
                              color="rgb(246,186,0)"
                              size={28}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                        <span className="ml-2 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-sm">
                          {rating === 1 && "Poor"}
                          {rating === 2 && "Fair"}
                          {rating === 3 && "Good"}
                          {rating === 4 && "Very Good"}
                          {rating === 5 && "Excellent"}
                        </span>
                      </div>
                    </div>
                    <textarea
                      value={reviews}
                      onChange={(e) => setReviews(e.target.value)}
                      placeholder="Share your experience with this course..."
                      className="w-full min-h-[120px] p-4 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white resize-none transition-all text-gray-700"
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        className={`px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-98 transition-all dark:bg-blue-700 dark:hover:bg-blue-600 ${
                          reviewCreationLoading && "cursor-no-drop"
                        }`}
                        onClick={
                          reviewCreationLoading ? () => {} : handleReviewSubmit
                        }
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-14 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <svg
                  className="w-16 h-16 mx-auto text-blue-500 dark:text-blue-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
                  Thank You for Your Review!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You have already submitted a review for this course.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <div className="w-full space-y-6">
      <h3 className="text-xl font-semibold dark:text-white text-gray-800 mb-4 flex items-center">
        <BiMessage className="mr-2 text-blue-500 dark:text-blue-400" />
        Questions & Answers
      </h3>

      {data[activeVideo].questions.length > 0 ? (
        data[activeVideo].questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            setQuestionId={setQuestionId}
            answerCreationLoading={answerCreationLoading}
          />
        ))
      ) : (
        <div className="text-center py-14 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">
            No Questions Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Be the first to ask a question about this lesson!
          </p>
        </div>
      )}
    </div>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  index,
  setQuestionId,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  const handleReplyClick = () => {
    setReplyActive(!replyActive);
    setQuestionId(item._id);
    setAnswer("");
  };

  return (
    <div className="p-5 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
      <div className="flex gap-3">
        <Image
          src={item.user?.avatar?.url || avatar}
          alt="Profile Picture"
          height={50}
          width={50}
          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
        />
        <div className="flex-grow">
          <h5 className="font-medium text-gray-800 dark:text-white flex items-center gap-1">
            {item.user.name}
            {item.user.role === "admin" && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 ml-2 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <VscVerifiedFilled className="mr-1" />
                Instructor
              </span>
            )}
          </h5>
          <p className="text-gray-600 dark:text-gray-300 mt-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            {item.question}
          </p>

          <div className="flex items-center mt-3">
            <button
              className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition-all"
              onClick={handleReplyClick}
            >
              {!replyActive ? (
                <>
                  {item.questionReplies.length !== 0 ? (
                    <>
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                      View Replies ({item.questionReplies.length})
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        ></path>
                      </svg>
                      Reply
                    </>
                  )}
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    ></path>
                  </svg>
                  Hide Replies
                </>
              )}
            </button>
            <div className="flex items-center ml-4 text-gray-500 dark:text-gray-400">
              <BiMessage size={16} className="mr-1" />
              <span>{item.questionReplies.length}</span>
            </div>
          </div>
        </div>
      </div>

      {replyActive && (
        <div className="mt-4 pl-10 border-l-2 border-blue-100 dark:border-blue-900 space-y-4">
          {item.questionReplies.length > 0 && (
            <div className="space-y-4 mb-4">
              {item.questionReplies.map((reply: any, replyIndex: number) => (
                <div
                  key={replyIndex}
                  className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all hover:shadow-sm"
                >
                  <Image
                    src={reply.user?.avatar?.url || avatar}
                    alt="Profile Picture"
                    height={40}
                    width={40}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-600 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h5 className="font-medium text-gray-800 dark:text-white text-sm">
                        {reply.user.name}
                      </h5>
                      {reply.user.role === "admin" && (
                        <span className="inline-flex items-center justify-center px-1.5 py-0.5 ml-2 text-xs font-medium rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <VscVerifiedFilled className="mr-0.5 text-xs" />
                          Instructor
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      {reply.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 items-start">
            <Image
              src={user?.avatar?.url || avatar}
              alt="Profile Picture"
              height={40}
              width={40}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
            />
            <div className="flex-grow">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your reply..."
                className={`w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white resize-none transition-all text-sm ${
                  answerCreationLoading ? "opacity-70" : ""
                }`}
                disabled={answerCreationLoading}
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button
                  className={`px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-all ${
                    answer === "" || answerCreationLoading
                      ? "bg-blue-400 cursor-not-allowed dark:bg-blue-600"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-98 dark:bg-blue-700 dark:hover:bg-blue-600"
                  }`}
                  type="submit"
                  disabled={answer === "" || answerCreationLoading}
                  onClick={handleAnswerSubmit}
                >
                  {answerCreationLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
