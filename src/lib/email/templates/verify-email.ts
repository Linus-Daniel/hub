export const verifyEmailTemplate = (name: string, verificationUrl: string) => {
  return {
    subject: "Verify Your Email - CONCES",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
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
        }
        
        .logo {
            display: inline-block;
            background: #F4B400;
            width: 80px;
            height: 80px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 10px 30px rgba(244, 180, 0, 0.3);
        }
        
        .logo-text {
            font-size: 36px;
            font-weight: bold;
            color: #0B1D3A;
        }
        
        .header h1 {
            color: #ffffff;
            font-size: 28px;
            margin: 0;
            font-weight: 700;
        }
        
        .content {
            padding: 40px 30px;
            background: #ffffff;
        }
        
        .greeting {
            font-size: 20px;
            color: #0B1D3A;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            color: #4a5568;
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 1.8;
        }
        
        .icon-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .icon {
            display: inline-block;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        
        .icon svg {
            width: 50px;
            height: 50px;
            fill: white;
        }
        
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        
        .button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #F4B400 0%, #f6c238 100%);
            color: #0B1D3A;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 10px 30px rgba(244, 180, 0, 0.3);
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(244, 180, 0, 0.4);
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e2e8f0, transparent);
            margin: 30px 0;
        }
        
        .security-notice {
            background: #f7fafc;
            border-left: 4px solid #1ABC9C;
            padding: 15px 20px;
            margin: 30px 0;
            border-radius: 8px;
        }
        
        .security-notice h3 {
            color: #1ABC9C;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .security-notice p {
            color: #4a5568;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .link-section {
            background: #f9fafb;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            word-break: break-all;
        }
        
        .link-label {
            color: #718096;
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .link-text {
            color: #667eea;
            font-size: 14px;
            text-decoration: none;
            word-break: break-all;
        }
        
        .footer {
            background: #f7fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-links {
            margin-bottom: 20px;
        }
        
        .footer-links a {
            color: #0B1D3A;
            text-decoration: none;
            margin: 0 15px;
            font-size: 14px;
            font-weight: 500;
        }
        
        .footer-text {
            color: #718096;
            font-size: 12px;
            margin-top: 20px;
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
        
        @media only screen and (max-width: 600px) {
            .container {
                border-radius: 0;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .greeting {
                font-size: 18px;
            }
            
            .button {
                padding: 14px 30px;
                font-size: 15px;
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
            <h1>Verify Your Email Address</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hello ${name}!</div>
            
            <div class="message">
                Welcome to CONCES - Nigeria's premier Engineering & Tech Talent Network. 
                We're excited to have you join our community of brilliant minds and innovators.
            </div>
            
            <div class="icon-container">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                </div>
            </div>
            
            <div class="message">
                To get started and unlock all features of your account, please verify your email address 
                by clicking the button below:
            </div>
            
            <div class="button-container">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            
            <div class="security-notice">
                <h3>Security Notice</h3>
                <p>This verification link will expire in 24 hours for your security. 
                If you didn't create an account with CONCES, please ignore this email.</p>
            </div>
            
            <div class="link-section">
                <div class="link-label">Or copy and paste this link in your browser:</div>
                <a href="${verificationUrl}" class="link-text">${verificationUrl}</a>
            </div>
            
            <div class="divider"></div>
            
            <div class="message" style="text-align: center; color: #718096; font-size: 14px;">
                Once verified, you'll have access to:
                <ul style="text-align: left; margin: 15px 0; padding-left: 30px; color: #4a5568;">
                    <li style="margin: 8px 0;">Connect with top Nigerian companies</li>
                    <li style="margin: 8px 0;">Showcase your skills and projects</li>
                    <li style="margin: 8px 0;">Access exclusive job opportunities</li>
                    <li style="margin: 8px 0;">Build your professional network</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-links">
                <a href="${process.env.NEXTAUTH_URL}/about">About</a>
                <a href="${process.env.NEXTAUTH_URL}/help">Help Center</a>
                <a href="${process.env.NEXTAUTH_URL}/privacy">Privacy</a>
                <a href="${process.env.NEXTAUTH_URL}/terms">Terms</a>
            </div>
            
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
                <a href="#" aria-label="GitHub">
                    <svg width="20" height="20" fill="#0B1D3A" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
Hello ${name},

Welcome to CONCES - Nigeria's premier Engineering & Tech Talent Network!

Please verify your email address by clicking the link below:
${verificationUrl}

This link will expire in 24 hours.

If you didn't create an account with CONCES, please ignore this email.

Best regards,
The CONCES Team
    `,
  };
};
