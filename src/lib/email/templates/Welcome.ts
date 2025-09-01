export const welcomeTemplate = (name: string) => {
  return {
    subject: "Welcome to CONCES - Let's Get Started!",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to CONCES</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #1ABC9C 0%, #16a085 100%);
            padding: 20px;
            margin: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #0B1D3A 0%, #1a365d 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(244,180,0,0.1) 0%, transparent 70%);
            animation: pulse 15s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.3; }
        }
        
        .logo {
            display: inline-block;
            background: linear-gradient(135deg, #F4B400 0%, #f6c238 100%);
            width: 100px;
            height: 100px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 15px 40px rgba(244, 180, 0, 0.4);
            position: relative;
            z-index: 1;
        }
        
        .logo-text {
            font-size: 48px;
            font-weight: bold;
            color: #0B1D3A;
        }
        
        .header h1 {
            color: #ffffff;
            font-size: 32px;
            margin: 0;
            font-weight: 700;
            position: relative;
            z-index: 1;
        }
        
        .header p {
            color: #F4B400;
            font-size: 16px;
            margin-top: 10px;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            color: #0B1D3A;
            margin-bottom: 20px;
            font-weight: 700;
            text-align: center;
        }
        
        .celebration {
            text-align: center;
            margin: 30px 0;
            font-size: 60px;
        }
        
        .message {
            color: #4a5568;
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 1.8;
        }
        
        .features-grid {
            display: grid;
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature {
            display: flex;
            align-items: start;
            gap: 15px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .feature-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .feature-icon svg {
            width: 20px;
            height: 20px;
            fill: white;
        }
        
        .feature-content h3 {
            color: #0B1D3A;
            font-size: 16px;
            margin: 0 0 8px 0;
            font-weight: 600;
        }
        
        .feature-content p {
            color: #718096;
            font-size: 14px;
            margin: 0;
            line-height: 1.6;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        
        .cta-section h2 {
            color: #0B1D3A;
            font-size: 20px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .cta-section p {
            color: #4a5568;
            margin-bottom: 20px;
            font-size: 14px;
        }
        
        .button-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .button {
            display: inline-block;
            padding: 14px 30px;
            background: linear-gradient(135deg, #0B1D3A 0%, #1a365d 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 10px 25px rgba(11, 29, 58, 0.2);
            transition: all 0.3s ease;
        }
        
        .button-secondary {
            background: linear-gradient(135deg, #F4B400 0%, #f6c238 100%);
            color: #0B1D3A;
            box-shadow: 0 10px 25px rgba(244, 180, 0, 0.2);
        }
        
        .stats-section {
            display: flex;
            justify-content: space-around;
            padding: 30px 0;
            border-top: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
            margin: 30px 0;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-number {
            font-size: 28px;
            font-weight: 700;
            color: #0B1D3A;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 12px;
            color: #718096;
            text-transform: uppercase;
        }
        
        .footer {
            background: #f7fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .social-icons {
            margin: 20px 0;
        }
        
        .social-icons a {
            display: inline-block;
            margin: 0 10px;
            width: 36px;
            height: 36px;
            background: #e2e8f0;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .social-icons a:hover {
            background: #cbd5e0;
            transform: translateY(-2px);
        }
        
        .footer-text {
            color: #718096;
            font-size: 12px;
            margin-top: 20px;
        }
        
        @media only screen and (max-width: 600px) {
            .header h1 {
                font-size: 26px;
            }
            
            .stats-section {
                flex-direction: column;
                gap: 20px;
            }
            
            .button-group {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <span class="logo-text">C</span>
            </div>
            <h1>Welcome to CONCES!</h1>
            <p>Your journey to excellence starts here</p>
        </div>
        
        <div class="content">
            <div class="greeting">Congratulations, ${name}! 🎉</div>
            
            <div class="message">
                Your account has been successfully created and verified. You're now part of Nigeria's most vibrant 
                community of engineering and tech professionals. Here's what awaits you:
            </div>
            
            <div class="features-grid">
                <div class="feature">
                    <div class="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.591a.75.75 0 101.06 1.06l1.591-1.591zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.591-1.591a.75.75 0 10-1.06 1.06l1.591 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.591a.75.75 0 001.06 1.06l1.591-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06L6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.591z"/>
                        </svg>
                    </div>
                    <div class="feature-content">
                        <h3>Complete Your Profile</h3>
                        <p>Stand out by adding your skills, education, and experience</p>
                    </div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"/>
                            <path fill-rule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"/>
                        </svg>
                    </div>
                    <div class="feature-content">
                        <h3>Connect with Companies</h3>
                        <p>Get discovered by top Nigerian and international companies</p>
                    </div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z"/>
                            <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z"/>
                            <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z"/>
                        </svg>
                    </div>
                    <div class="feature-content">
                        <h3>Learn and Grow</h3>
                        <p>Access exclusive courses and skill development resources</p>
                    </div>
                </div>
            </div>
            
            <div class="stats-section">
                <div class="stat">
                    <div class="stat-number">5,000+</div>
                    <div class="stat-label">Active Members</div>
                </div>
                <div class="stat">
                    <div class="stat-number">200+</div>
                    <div class="stat-label">Partner Companies</div>
                </div>
                <div class="stat">
                    <div class="stat-number">1,500+</div>
                    <div class="stat-label">Job Placements</div>
                </div>
            </div>
            
            <div class="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Complete your profile to unlock all features and get discovered by recruiters</p>
                <div class="button-group">
                    <a href="${process.env.NEXTAUTH_URL}/dashboard/profile" class="button">Complete Profile</a>
                    <a href="${process.env.NEXTAUTH_URL}/jobs" class="button button-secondary">Browse Jobs</a>
                </div>
            </div>
            
            <div class="message" style="text-align: center; color: #718096; font-size: 14px; margin-top: 30px;">
                Need help getting started? Check out our 
                <a href="${process.env.NEXTAUTH_URL}/help" style="color: #0B1D3A; font-weight: 600;">Help Center</a> 
                or reply to this email with any questions.
            </div>
        </div>
        
        <div class="footer">
            <div class="social-icons">
                <a href="#" aria-label="Twitter">
                    <svg width="20" height="20" fill="#0B1D3A" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                    <svg width="20" height="20" fill="#0B1D3A" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>
            </div>
            
            <div class="footer-text">
                © 2024 CONCES. All rights reserved.<br>
                Nigeria's Brightest Engineering & Tech Talent Network
            </div>
        </div>
    </div>
</body>
</html>
    `,
    text: `
Welcome to CONCES, ${name}!

Congratulations! Your account has been successfully created and verified.

You're now part of Nigeria's most vibrant community of engineering and tech professionals.

What's Next?
1. Complete Your Profile - Stand out by adding your skills, education, and experience
2. Connect with Companies - Get discovered by top Nigerian and international companies  
3. Learn and Grow - Access exclusive courses and skill development resources

Get Started:
- Complete Profile: ${process.env.NEXTAUTH_URL}/dashboard/profile
- Browse Jobs: ${process.env.NEXTAUTH_URL}/jobs

Join our community:
- 5,000+ Active Members
- 200+ Partner Companies
- 1,500+ Job Placements

Need help? Visit our Help Center at ${process.env.NEXTAUTH_URL}/help

Best regards,
The CONCES Team
    `,
  };
};
