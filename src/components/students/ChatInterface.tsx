// components/ChatInterface.js
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: 'student' | 'visitor';
  timestamp: Date;
}

interface Student {
  name: string;
  image: string;
  isOnline?: boolean;
}

interface ChatInterfaceProps {
  student: Student;
  isMobile?: boolean;
  onClose: () => void;
}
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  FaceSmileIcon,
  PaperClipIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

export default function ChatInterface({ student, isMobile = false, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const startConversation = () => {
    setHasStarted(true);

    // Add initial message from student
    setTimeout(() => {
      const initialMessage = {
        id: 1,
        text: "Hi there! Thanks for reaching out. How can I help with your project today?",
        sender: "student" as const,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }, 1000);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "visitor" as const,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage("");

      // Simulate typing response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "That sounds like an interesting project! I'd love to learn more about your requirements.",
          "I have experience with similar projects. When would you like to schedule a call to discuss details?",
          "Great! I'm available for new projects. What's your timeline and budget range?",
          "I'd be happy to help with that! Can you share more details about the scope of work?",
        ];

        const response = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: "student" as const,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, response]);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm h-[800px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isMobile && (
          <button onClick={onClose} className="mr-3 text-navy">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        )}
        <div className="flex items-center">
          <img
            src={student.image}
            alt={student.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold text-navy">{student.name}</h3>
            <div className="flex items-center text-sm text-green-600">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  student.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              {student.isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-navy p-2">
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {!hasStarted ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-teal bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <ChatBubbleLeftIcon className="h-12 w-12 text-teal" />
            </div>
            <h3 className="text-xl font-semibold text-navy mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-600 mb-6">
              Send {student.name} a message to discuss your project needs or ask
              any questions
            </p>
            <button
              onClick={startConversation}
              className="px-6 py-3 bg-teal text-white rounded-lg hover:bg-opacity-90 transition"
            >
              Start Chatting
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-xs text-gray-500 my-2">
              Today,{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end mb-4 ${
                  message.sender === "visitor" ? "justify-end" : ""
                }`}
              >
                {message.sender === "student" && (
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}

                <div
                  className={`max-w-[75%] p-3 rounded-xl ${
                    message.sender === "visitor"
                      ? "bg-navy text-white rounded-br-none"
                      : "bg-softgray text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{message.text}</p>
                </div>

                <span className="text-xs text-gray-500 mx-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end mb-4">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="bg-softgray rounded-xl p-3 px-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Composer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-navy transition">
            <FaceSmileIcon className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-navy transition">
            <PaperClipIcon className="h-5 w-5" />
          </button>
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-teal text-white rounded-full hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
