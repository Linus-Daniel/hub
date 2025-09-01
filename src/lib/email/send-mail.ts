
import transporter from './nodemailer';
import { verifyEmailTemplate } from './templates/verify-email';
import { resetPasswordTemplate } from './templates/reset-password';
import { welcomeTemplate } from './templates/Welcome';

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;
  const template = verifyEmailTemplate(name, verificationUrl);
  
  try {
    await transporter.sendMail({
      from: `"CONCES" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });
    
    console.log(`Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

export async function sendPasswordResetEmail(email: string, name: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  const template = resetPasswordTemplate(name, resetUrl);
  
  try {
    await transporter.sendMail({
      from: `"CONCES" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });
    
    console.log(`Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const template = welcomeTemplate(name);
  
  try {
    await transporter.sendMail({
      from: `"CONCES" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });
    
    console.log(`Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}