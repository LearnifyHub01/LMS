import { useEffect, useState } from "react";

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const questions = [
    "Hello! What are you looking for in this platform?",
    "Great! Are you interested in free or paid courses?",
    "Awesome! Would you like a demo course suggestion?"
  ];

  // Initial chatbot appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true);
      setMessages([{ text: "Hi there! I'm here to assist you.", isUser: false }]);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Handle question asking with typing effect
  useEffect(() => {
    if (step < questions.length && messages.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, { text: questions[step], isUser: false }]);
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, messages.length]);

  const handleResponse = (response: string) => {
    setMessages(prev => [...prev, { text: response, isUser: true }]);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your responses! I'll process them and get back to you.", 
          isUser: false 
        }]);
        setTimeout(() => setShowChat(false), 2000);
      }, 1000);
      console.log("User Responses:", messages.filter(msg => msg.isUser).map(msg => msg.text));
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chatbot Popup */}
      {showChat && (
        <div className="fixed bottom-20 right-5 w-96 max-h-[70vh] flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-white font-semibold">Course Assistant</h2>
            </div>
            <button 
              onClick={() => setShowChat(false)} 
              className="text-white hover:text-red-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-3 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none shadow'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg shadow">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Response Buttons */}
          {step < questions.length && !isTyping && (
            <div className="p-4 border-t bg-white">
              <div className="flex gap-3 justify-center">
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => handleResponse("Yes")}
                >
                  Yes
                </button>
                <button 
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => handleResponse("No")}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;