// components/AuthPage.jsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faArrowLeft, 
  faEnvelope, 
  faCheck 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGoogle, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

const AuthPage = () => {
  // State for form management
  const [activeTab, setActiveTab] = useState('signin');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);
  
  // Form state
  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    terms: false
  });
  
  const [resetForm, setResetForm] = useState({
    email: ''
  });

  // Tagline rotation effect
  const taglines = [
    "Connect with top companies seeking fresh talent",
    "Showcase your skills to industry leaders",
    "Build your professional portfolio and network",
    "Access exclusive career opportunities"
  ];
  
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Form handlers
  const handleSigninSubmit = (e) => {
    e.preventDefault();
    // Add validation and submission logic
    console.log('Signin submitted:', signinForm);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Add validation and submission logic
    console.log('Signup submitted:', signupForm);
    setShowSignupSuccess(true);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    // Add validation and submission logic
    console.log('Reset submitted:', resetForm);
    setShowResetSuccess(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    if (activeTab === 'signin') {
      setSigninForm({
        ...signinForm,
        [name]: fieldValue
      });
    } else if (showForgotPassword) {
      setResetForm({
        ...resetForm,
        [name]: fieldValue
      });
    } else {
      setSignupForm({
        ...signupForm,
        [name]: fieldValue
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Head>
        <title>CONCES - Authentication</title>
        <meta name="description" content="Join Nigeria's Brightest Engineering & Tech Talent Network" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </Head>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding Panel (hidden on mobile) */}
        <div className="hidden lg:block w-full lg:w-1/2 bg-navy relative">
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-navy/90 z-10"></div>
          <img 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/345b123eaa-f9ac9ccb3b2273f784ee.png" 
            alt="professional illustration of diverse Nigerian students working on laptops, engineering sketches, tech elements, modern flat style" 
          />
          
          <div className="relative z-20 flex flex-col h-full justify-center px-6 lg:px-12 text-white">
            <h1 className="text-2xl lg:text-4xl font-bold font-montserrat mb-6">
              Join Nigeria's Brightest Engineering & Tech Talent Network
            </h1>
            
            <div className="h-16 mb-8">
              <p className="text-lg lg:text-xl transition-opacity duration-500">
                {taglines[currentTagline]}
              </p>
            </div>
            
            <div>
              <p className="text-white/70 mb-6">Trusted by leading organizations:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
                {['MTN', 'Interswitch', 'Flutterwave', 'Andela'].map((company) => (
                  <div key={company} className="bg-white/10 h-12 rounded-md flex items-center justify-center">
                    <div className="text-white font-bold">{company}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-gray-50">
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 w-full max-w-md transition-all duration-300">
            {/* Logo */}
            <div className="flex justify-center mb-6 lg:mb-8">
              <div className="bg-navy p-3 rounded-lg">
                <FontAwesomeIcon icon={faGraduationCap} className="text-gold text-xl" />
              </div>
            </div>
            
            {/* Form Tabs */}
            <div className="flex border-b border-gray-200 mb-6 lg:mb-8">
              <button 
                onClick={() => {
                  setActiveTab('signin');
                  setShowForgotPassword(false);
                  setShowResetSuccess(false);
                }}
                className={`flex-1 py-3 font-medium text-center relative ${
                  activeTab === 'signin' && !showForgotPassword && !showResetSuccess 
                    ? 'text-navy' 
                    : 'text-gray-500'
                }`}
              >
                Sign In
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transform transition-transform duration-300 ${
                  activeTab === 'signin' && !showForgotPassword && !showResetSuccess 
                    ? '' 
                    : 'scale-x-0'
                }`}></span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('signup');
                  setShowForgotPassword(false);
                  setShowResetSuccess(false);
                }}
                className={`flex-1 py-3 font-medium text-center relative ${
                  activeTab === 'signup' && !showSignupSuccess 
                    ? 'text-navy' 
                    : 'text-gray-500'
                }`}
              >
                Sign Up
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transform transition-transform duration-300 ${
                  activeTab === 'signup' && !showSignupSuccess 
                    ? '' 
                    : 'scale-x-0'
                }`}></span>
              </button>
            </div>
            
            {/* Sign In Form */}
            {activeTab === 'signin' && !showForgotPassword && !showResetSuccess && (
              <form onSubmit={handleSigninSubmit} className="transition-all duration-300">
                <div className="mb-4 lg:mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signin-email">
                    Email
                  </label>
                  <input 
                    id="signin-email"
                    name="email"
                    type="email" 
                    placeholder="you@example.com"
                    value={signinForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    required
                  />
                </div>
                
                <div className="mb-4 lg:mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signin-password">
                    Password
                  </label>
                  <input 
                    id="signin-password"
                    name="password"
                    type="password" 
                    placeholder="••••••••"
                    value={signinForm.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    required
                  />
                </div>
                
                <div className="flex justify-between items-center mb-4 lg:mb-6">
                  <div className="flex items-center">
                    <input 
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox" 
                      checked={signinForm.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm font-medium text-navy hover:text-gold transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-navy hover:bg-navy/90 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300 hover:shadow-lg"
                >
                  Sign In
                </button>
                
                <div className="relative flex items-center justify-center mb-4 lg:mb-6">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">or continue with</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FontAwesomeIcon icon={faGoogle} className="text-gray-700 mr-2" />
                    <span className="text-gray-700 font-medium">Google</span>
                  </button>
                  <button 
                    type="button"
                    className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-gray-700 mr-2" />
                    <span className="text-gray-700 font-medium">LinkedIn</span>
                  </button>
                </div>
              </form>
            )}
            
            {/* Sign Up Form */}
            {activeTab === 'signup' && !showSignupSuccess && (
              <form onSubmit={handleSignupSubmit} className="transition-all duration-300">
                <div className="mb-4 lg:mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-name">
                    Full Name
                  </label>
                  <input 
                    id="signup-name"
                    name="name"
                    type="text" 
                    placeholder="John Doe"
                    value={signupForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    required
                  />
                </div>
                
                <div className="mb-4 lg:mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-email">
                    Email
                  </label>
                  <input 
                    id="signup-email"
                    name="email"
                    type="email" 
                    placeholder="you@example.com"
                    value={signupForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    required
                  />
                </div>
                
                <div className="mb-4 lg:mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-password">
                    Password
                  </label>
                  <input 
                    id="signup-password"
                    name="password"
                    type="password" 
                    placeholder="••••••••"
                    value={signupForm.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    required
                  />
                </div>
                
                <div className="mb-4 lg:mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-confirm-password">
                    Confirm Password
                  </label>
                  <input 
                    id="signup-confirm-password"
                    name="confirmPassword"
                    type="password" 
                    placeholder="••••••••"
                    value={signupForm.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    required
                  />
                </div>
                
                <div className="mb-4 lg:mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="signup-role">
                    Role (Optional)
                  </label>
                  <select 
                    id="signup-role"
                    name="role"
                    value={signupForm.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="student">Student</option>
                    <option value="alumni">Alumni</option>
                    <option value="recruiter">Recruiter</option>
                  </select>
                </div>
                
                <div className="flex items-start mb-4 lg:mb-6">
                  <div className="flex items-center h-5">
                    <input 
                      id="terms"
                      name="terms"
                      type="checkbox" 
                      checked={signupForm.terms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <span className="text-navy hover:text-gold cursor-pointer">Terms of Service</span> and <span className="text-navy hover:text-gold cursor-pointer">Privacy Policy</span>
                  </label>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-navy hover:bg-navy/90 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300 hover:shadow-lg"
                >
                  Create Account
                </button>
                
                <div className="relative flex items-center justify-center mb-4 lg:mb-6">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">or continue with</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FontAwesomeIcon icon={faGoogle} className="text-gray-700 mr-2" />
                    <span className="text-gray-700 font-medium">Google</span>
                  </button>
                  <button 
                    type="button"
                    className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-gray-700 mr-2" />
                    <span className="text-gray-700 font-medium">LinkedIn</span>
                  </button>
                </div>
              </form>
            )}
            
            {/* Forgot Password Form */}
            {showForgotPassword && !showResetSuccess && (
              <form onSubmit={handleResetSubmit} className="transition-all duration-300">
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex items-center text-navy hover:text-gold mb-4 lg:mb-6 transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Back to Sign In
                </button>
                
                <h2 className="text-xl lg:text-2xl font-bold text-navy mb-3 lg:mb-4">Reset Password</h2>
                <p className="text-gray-600 mb-4 lg:mb-6">Enter your email address and we'll send you a link to reset your password.</p>
                
                <div className="mb-4 lg:mb-5">
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="reset-email">
                    Email
                  </label>
                  <input 
                    id="reset-email"
                    name="email"
                    type="email" 
                    placeholder="you@example.com"
                    value={resetForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-navy hover:bg-navy/90 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                >
                  Send Reset Link
                </button>
              </form>
            )}
            
            {/* Reset Password Success */}
            {showResetSuccess && (
              <div className="text-center transition-all duration-300">
                <div className="flex justify-center mb-4 lg:mb-6">
                  <div className="bg-teal p-3 lg:p-4 rounded-full">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl lg:text-2xl" />
                  </div>
                </div>
                
                <h2 className="text-xl lg:text-2xl font-bold text-navy mb-3 lg:mb-4">Check Your Email</h2>
                <p className="text-gray-600 mb-6 lg:mb-8">We've sent a password reset link to your email address. Please check your inbox and follow the instructions.</p>
                
                <button 
                  onClick={() => {
                    setShowResetSuccess(false);
                    setShowForgotPassword(false);
                  }}
                  className="text-navy hover:text-gold font-medium transition-colors"
                >
                  Return to Sign In
                </button>
              </div>
            )}
            
            {/* Sign Up Success */}
            {showSignupSuccess && (
              <div className="text-center transition-all duration-300">
                <div className="flex justify-center mb-4 lg:mb-6">
                  <div className="bg-teal p-3 lg:p-4 rounded-full">
                    <FontAwesomeIcon icon={faCheck} className="text-white text-xl lg:text-2xl" />
                  </div>
                </div>
                
                <h2 className="text-xl lg:text-2xl font-bold text-navy mb-3 lg:mb-4">Welcome to CONCES!</h2>
                <p className="text-gray-600 mb-6 lg:mb-8">Your account has been created successfully. You're now part of Nigeria's brightest talent network.</p>
                
                <button 
                  className="w-full bg-navy hover:bg-navy/90 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg"
                >
                  Continue to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;