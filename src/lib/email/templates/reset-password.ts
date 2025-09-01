export const resetPasswordTemplate = (name: string, resetUrl: string) => {
  return {
    subject: "Reset Your Password - CONCES",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
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
            background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            display: inline-block;
            background: white;
            width: 80px;
            height: 80px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .logo svg {
            width: 40px;
            height: 40px;
            fill: #e53e3e;
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
        
        .warning-box {
            background: #fff5f5;
            border: 1px solid #feb2b2;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .warning-box h3 {
            color: #c53030;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        
        .warning-box h3 svg {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            fill: #c53030;
        }
        
        .warning-box p {
            color: #742a2a;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        
        .button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 10px 30px rgba(229, 62, 62, 0.3);
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(229, 62, 62, 0.4);
        }
        
        .security-tips {
            background: #f7fafc;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .security-tips h3 {
            color: #2d3748;
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .security-tips ul {
            list-style: none;
            padding: 0;
        }
        
        .security-tips li {
            color: #4a5568;
            font-size: 14px;
            margin: 10px 0;
            padding-left: 25px;
            position: relative;
        }
        
        .security-tips li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #48bb78;
            font-weight: bold;
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
            color: #e53e3e;
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
        
        .footer-text {
            color: #718096;
            font-size: 12px;
        }
        
        @media only screen and (max-width: 600px) {
            .container {
                border-radius: 0;
            }
            
            .header, .content {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .greeting {
                font-size: 18px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"/>
                </svg>
            </div>
            <h1>Password Reset Request</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hello ${name},</div>
            
            <div class="message">
                We received a request to reset the password for your CONCES account. 
                If you made this request, click the button below to reset your password.
            </div>
            
            <div class="warning-box">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z"/>
                    </svg>
                    Important Security Notice
                </h3>
                <p>
                    If you didn't request a password reset, please ignore this email. 
                    Your password will remain unchanged and your account is secure.
                </p>
            </div>
            
            <div class="button-container">
                <a href="${resetUrl}" class="button">Reset My Password</a>
            </div>
            
            <div class="message" style="text-align: center; color: #718096; font-size: 14px;">
                This link will expire in 1 hour for security reasons.
            </div>
            
            <div class="security-tips">
                <h3>Security Tips for Your New Password:</h3>
                <ul>
                    <li>Use at least 8 characters</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Add numbers and special characters</li>
                    <li>Avoid using personal information</li>
                    <li>Don't reuse passwords from other accounts</li>
                </ul>
            </div>
            
            <div class="link-section">
                <div class="link-label">Or copy and paste this link in your browser:</div>
                <a href="${resetUrl}" class="link-text">${resetUrl}</a>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                If you're having trouble, contact our support team at support@conces.com<br><br>
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

We received a request to reset the password for your CONCES account.

Reset your password by clicking this link:
${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, please ignore this email.

Security Tips for Your New Password:
- Use at least 8 characters
- Include uppercase and lowercase letters
- Add numbers and special characters
- Avoid using personal information
- Don't reuse passwords from other accounts

Best regards,
The CONCES Team
    `,
  };
};
