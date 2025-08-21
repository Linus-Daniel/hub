import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faBars, 
  faBriefcase, 
  faUserPlus, 
  faComment, 
  faEllipsisVertical, 
  faFaceSmile, 
  faPaperclip, 
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [chatStarted, setChatStarted] = useState(false);
  const [mobileChatStarted, setMobileChatStarted] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [mobileMessages, setMobileMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageInputRef = useRef(null);
  const mobileMessageInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const mobileMessagesEndRef = useRef(null);

  const skills = [
    "UI Design", "UX Research", "HTML/CSS", "JavaScript", 
    "React", "Figma", "Adobe XD", "Sketch", "Prototyping", "Responsive Design"
  ];

  const portfolioItems = [
    { id: 1, src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f3022e92cc-2a04e8e8412e3edd6095.png", alt: "modern UI design portfolio piece, minimalist interface with blue and gold accents" },
    { id: 2, src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ba6173455f-86ad43407f42fd1e7255.png", alt: "mobile app UI design, clean interface with navy and teal colors" },
    { id: 3, src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/425703d595-0fa704803957c22f7214.png", alt: "website design mockup with gold and navy color scheme, minimalist" },
    { id: 4, src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fb56764867-1aa38f0f4c3fa3beea05.png", alt: "UX wireframes and user flow diagrams, professional design process" },
    { id: 5, src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c5627bfe1a-722827aa3ced78577629.png", alt: "branding design project with logo variations and color palette" },
    { id: 6, src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/2d27290da6-f8137be8e9ed7a433017.png", alt: "responsive website design across multiple devices, clean UI" }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Michael Roberts",
      role: "Project Manager, TechFlow",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      text: "\"Sarah's work exceeded our expectations. Her attention to detail and user-focused approach transformed our product. Highly recommended!\""
    },
    {
      id: 2,
      name: "Emma Williams",
      role: "Founder, CreativeHub",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      text: "\"Working with Sarah was a pleasure. She brings both technical expertise and creative vision to every project. Our users love the new interface she designed.\""
    },
    {
      id: 3,
      name: "David Chen",
      role: "CTO, InnovateTech",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      text: "\"Sarah has a rare combination of design talent and technical knowledge. She delivered a beautiful, functional interface and was able to implement it flawlessly.\""
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToMobileBottom();
  }, [mobileMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToMobileBottom = () => {
    mobileMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startChat = () => {
    setChatStarted(true);
    
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          ...messages,
          {
            id: 1,
            sender: 'sarah',
            text: 'Hi there! Thanks for reaching out. How can I help with your project today?',
            time: '10:32 AM'
          }
        ]);
      }, 2000);
    }, 500);
  };

  const startMobileChat = () => {
    setMobileChatStarted(true);
    setMobileMessages([
      ...mobileMessages,
      {
        id: 1,
        sender: 'sarah',
        text: 'Hi there! Thanks for reaching out. How can I help with your project today?',
        time: '10:32 AM'
      }
    ]);
  };

  const sendMessage = () => {
    const messageText = messageInputRef.current.value.trim();
    if (messageText) {
      const newMessage = {
        id: messages.length + 2,
        sender: 'user',
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      messageInputRef.current.value = '';
      
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            ...messages,
            newMessage,
            {
              id: messages.length + 3,
              sender: 'sarah',
              text: 'Thanks for your message! I\'ll get back to you soon.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }, 2000);
      }, 1000);
    }
  };

  const sendMobileMessage = () => {
    const messageText = mobileMessageInputRef.current.value.trim();
    if (messageText) {
      const newMessage = {
        id: mobileMessages.length + 2,
        sender: 'user',
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMobileMessages([...mobileMessages, newMessage]);
      mobileMessageInputRef.current.value = '';
    }
  };

  const toggleMobileChat = () => {
    setShowMobileChat(!showMobileChat);
  };

  return (
    <div className="bg-softgray min-h-screen flex flex-col">
      <Head>
        <title>Sarah Johnson | UX/UI Designer & Front-end Developer</title>
        <meta name="description" content="Portfolio and profile of Sarah Johnson, UX/UI Designer & Front-end Developer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'Inter', sans-serif; }
          h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', sans-serif; }
          ::-webkit-scrollbar { display: none; }
          html, body { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </Head>

      {/* Header Section */}
      <header className="bg-white shadow-sm py-4 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <a href="/student-profile" className="flex items-center text-navy cursor-pointer">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              <span className="font-medium">Back to Directory</span>
            </a>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <span className="text-navy hover:text-gold transition cursor-pointer">Home</span>
                <span className="text-navy hover:text-gold transition cursor-pointer">Directory</span>
                <span className="text-navy hover:text-gold transition cursor-pointer">Events</span>
                <span className="text-navy hover:text-gold transition cursor-pointer">Resources</span>
              </div>
            </div>
            <div>
              <button className="md:hidden text-navy">
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row container mx-auto px-4 md:px-8 py-6 lg:py-12 gap-8">
        {/* Left Column - Profile Overview */}
        <div className="lg:w-1/2 flex-shrink-0">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                  alt="Student Profile" 
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-navy">Sarah Johnson</h1>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                    <span className="w-2 h-2 bg-teal rounded-full mr-2"></span>
                    Available for Projects
                  </span>
                </div>
                <p className="text-gray-600 mt-1 mb-4">UX/UI Designer & Front-end Developer</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-opacity-90 transition">
                    <FontAwesomeIcon icon={faBriefcase} />
                    <span>View Portfolio</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-lg hover:bg-opacity-90 transition">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <span>Hire Me</span>
                  </button>
                  <button 
                    onClick={toggleMobileChat}
                    className="flex items-center gap-2 px-4 py-2 border border-navy text-navy rounded-lg hover:bg-navy hover:text-white transition lg:hidden"
                  >
                    <FontAwesomeIcon icon={faComment} />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-navy mb-4">About Me</h2>
            <p className="text-gray-700 mb-4">
              I'm a passionate UX/UI designer and front-end developer with 3 years of experience creating intuitive digital experiences. I specialize in user-centered design and building accessible interfaces that delight users while meeting business objectives.
            </p>
            <blockquote className="border-l-4 border-gold pl-4 italic text-gray-600">
              "I can do all things through Christ who strengthens me." — Philippians 4:13
            </blockquote>
          </div>

          {/* Skills & Tools Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-navy mb-4">Skills & Tools</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-navy bg-opacity-10 text-navy rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio Gallery */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-navy mb-4">Portfolio Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {portfolioItems.map((item) => (
                <div key={item.id} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition">
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-navy mb-4">Testimonials</h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-softgray rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <Image 
                      src={testimonial.avatar} 
                      alt="Client" 
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-medium text-navy">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Contact Button (Sticky) */}
          <div className="fixed bottom-6 right-6 lg:hidden">
            <button 
              onClick={toggleMobileChat}
              className="w-14 h-14 rounded-full bg-teal shadow-lg flex items-center justify-center text-white"
            >
              <FontAwesomeIcon icon={faComment} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Right Column - Chat Interface (Desktop) */}
        <div className="lg:w-1/2 lg:block hidden">
          <div className="bg-white rounded-xl shadow-sm h-[800px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <Image 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                  alt="Sarah Johnson" 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-navy">Sarah Johnson</h3>
                  <div className="flex items-center text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Online
                  </div>
                </div>
              </div>
              <div>
                <button className="text-gray-500 hover:text-navy p-2">
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </div>
            </div>
            
            {/* Chat Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto">
              {!chatStarted ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-24 h-24 bg-teal bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faComment} className="text-4xl text-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Start a conversation</h3>
                  <p className="text-gray-600 mb-6">Send Sarah a message to discuss your project needs or ask any questions</p>
                  <button 
                    onClick={startChat}
                    className="px-6 py-3 bg-teal text-white rounded-lg hover:bg-opacity-90 transition"
                  >
                    <span>Start Chatting</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center text-xs text-gray-500 my-2">Today, 10:32 AM</div>
                  
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex items-end mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
                    >
                      {message.sender !== 'user' && (
                        <Image 
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                          alt="Sarah" 
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      {message.sender === 'user' && (
                        <span className="text-xs text-gray-500 mr-2">{message.time}</span>
                      )}
                      <div className={`max-w-[75%] ${message.sender === 'user' ? 'bg-navy text-white rounded-t-xl rounded-bl-xl' : 'bg-softgray text-gray-800 rounded-t-xl rounded-br-xl'} p-3`}>
                        <p>{message.text}</p>
                      </div>
                      {message.sender !== 'user' && (
                        <span className="text-xs text-gray-500 ml-2">{message.time}</span>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-end mb-4">
                      <Image 
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                        alt="Sarah" 
                        width={32}
                        height={32}
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
                <button className="p-2 text-gray-500 hover:text-navy">
                  <FontAwesomeIcon icon={faFaceSmile} />
                </button>
                <button className="p-2 text-gray-500 hover:text-navy">
                  <FontAwesomeIcon icon={faPaperclip} />
                </button>
                <div className="flex-grow relative">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal"
                    ref={messageInputRef}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                </div>
                <button 
                  onClick={sendMessage}
                  className="p-2 bg-teal text-white rounded-full hover:bg-opacity-90 transition"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Chat Modal */}
      <div className={`fixed inset-0 bg-white z-50 transform ${showMobileChat ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Mobile Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center">
            <button 
              onClick={toggleMobileChat}
              className="mr-3 text-navy"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <Image 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
              alt="Sarah Johnson" 
              width={40}
              height={40}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold text-navy">Sarah Johnson</h3>
              <div className="flex items-center text-sm text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online
              </div>
            </div>
          </div>
          
          {/* Mobile Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto">
            {!mobileChatStarted ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 bg-teal bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faComment} className="text-4xl text-teal" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-2">Start a conversation</h3>
                <p className="text-gray-600 mb-6">Send Sarah a message to discuss your project needs or ask any questions</p>
                <button 
                  onClick={startMobileChat}
                  className="px-6 py-3 bg-teal text-white rounded-lg hover:bg-opacity-90 transition"
                >
                  <span>Start Chatting</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-xs text-gray-500 my-2">Today, 10:32 AM</div>
                
                {mobileMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex items-end mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.sender !== 'user' && (
                      <Image 
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                        alt="Sarah" 
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    {message.sender === 'user' && (
                      <span className="text-xs text-gray-500 mr-2">{message.time}</span>
                    )}
                    <div className={`max-w-[75%] ${message.sender === 'user' ? 'bg-navy text-white rounded-t-xl rounded-bl-xl' : 'bg-softgray text-gray-800 rounded-t-xl rounded-br-xl'} p-3`}>
                      <p>{message.text}</p>
                    </div>
                    {message.sender !== 'user' && (
                      <span className="text-xs text-gray-500 ml-2">{message.time}</span>
                    )}
                  </div>
                ))}
                <div ref={mobileMessagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Mobile Message Composer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-navy">
                <FontAwesomeIcon icon={faFaceSmile} />
              </button>
              <button className="p-2 text-gray-500 hover:text-navy">
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal"
                  ref={mobileMessageInputRef}
                  onKeyPress={(e) => e.key === 'Enter' && sendMobileMessage()}
                />
              </div>
              <button 
                onClick={sendMobileMessage}
                className="p-2 bg-teal text-white rounded-full hover:bg-opacity-90 transition"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;