export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailData {
  name: string;
  email: string;
  courseName?: string;
  demoDate?: string;
  demoTime?: string;
  meetingLink?: string;
  coursePrice?: string;
  instructorName?: string;
  companyName?: string;
  phone?: string;
  trainingInterest?: string;
}

// Base email template with common styling
const getBaseTemplate = (content: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DAxGENAI - Data Analytics Training</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .button:hover {
            background: linear-gradient(135deg, #0284c7 0%, #7c3aed 100%);
        }
        .footer {
            background-color: #1e293b;
            color: #94a3b8;
            padding: 30px 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #0ea5e9;
            text-decoration: none;
        }
        .highlight-box {
            background-color: #f1f5f9;
            border-left: 4px solid #0ea5e9;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .info-item {
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        .info-label {
            font-weight: 600;
            color: #475569;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .info-value {
            color: #1e293b;
            font-size: 16px;
        }
        @media (max-width: 600px) {
            .container {
                margin: 0;
                box-shadow: none;
            }
            .content {
                padding: 20px 15px;
            }
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 DAxGENAI</h1>
            <p>Transform Your Career with Data Analytics & AI</p>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>© 2024 DAxGENAI. All rights reserved.</p>
            <p>
                <a href="mailto:training@daxgenai.com">training@daxgenai.com</a> | 
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </p>
            <p>Online Training Worldwide</p>
        </div>
    </div>
</body>
</html>
`;

// Demo Booking Confirmation Email
export const getDemoBookingConfirmation = (data: EmailData): EmailTemplate => {
  const content = `
    <h2 style="color: #1e293b; margin-bottom: 20px;">🎉 Demo Session Confirmed!</h2>
    
    <p>Hi ${data.name},</p>
    
    <p>Thank you for booking your free demo session with DAxGENAI! We're excited to show you how our personalized training can transform your career in data analytics and AI.</p>
    
    <div class="highlight-box">
      <h3 style="margin-top: 0; color: #0ea5e9;">📅 Your Demo Session Details</h3>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Date</div>
          <div class="info-value">${data.demoDate}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Time</div>
          <div class="info-value">${data.demoTime}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Duration</div>
          <div class="info-value">60 minutes</div>
        </div>
        <div class="info-item">
          <div class="info-label">Format</div>
          <div class="info-value">Video Call</div>
        </div>
      </div>
    </div>
    
    <p><strong>What to expect during your demo:</strong></p>
    <ul style="color: #475569; line-height: 1.8;">
      <li>Personalized assessment of your current skills and goals</li>
      <li>Live demonstration of our training methodology</li>
      <li>Sample lesson from one of our courses</li>
      <li>Q&A session about your specific needs</li>
      <li>Customized learning path recommendation</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.meetingLink}" class="button">Join Demo Session</a>
    </div>
    
    <div class="highlight-box">
      <h4 style="margin-top: 0; color: #0ea5e9;">📋 Preparation Tips</h4>
      <ul style="color: #475569; line-height: 1.6;">
        <li>Test your microphone and camera beforehand</li>
        <li>Have your questions ready about data analytics training</li>
        <li>Think about your career goals and timeline</li>
        <li>Prepare any specific topics you'd like to discuss</li>
      </ul>
    </div>
    
    <p>If you need to reschedule or have any questions, please reply to this email or call us at <strong>+1 (555) 123-4567</strong>.</p>
    
    <p>We look forward to meeting you!</p>
    
    <p>Best regards,<br>
    <strong>The DAxGENAI Team</strong></p>
  `;

  return {
    subject: `Demo Session Confirmed - ${data.demoDate} at ${data.demoTime}`,
    html: getBaseTemplate(content),
    text: `
Demo Session Confirmed!

Hi ${data.name},

Thank you for booking your free demo session with DAxGENAI!

Your Demo Session Details:
- Date: ${data.demoDate}
- Time: ${data.demoTime}
- Duration: 60 minutes
- Format: Video Call

Meeting Link: ${data.meetingLink}

What to expect:
- Personalized assessment of your skills and goals
- Live demonstration of our training methodology
- Sample lesson from one of our courses
- Q&A session about your specific needs
- Customized learning path recommendation

Preparation Tips:
- Test your microphone and camera beforehand
- Have your questions ready about data analytics training
- Think about your career goals and timeline
- Prepare any specific topics you'd like to discuss

If you need to reschedule or have questions, please reply to this email or call us at +1 (555) 123-4567.

We look forward to meeting you!

Best regards,
The DAxGENAI Team
    `
  };
};

// Course Enrollment Confirmation
export const getCourseEnrollmentConfirmation = (data: EmailData): EmailTemplate => {
  const content = `
    <h2 style="color: #1e293b; margin-bottom: 20px;">🎓 Welcome to DAxGENAI Training!</h2>
    
    <p>Hi ${data.name},</p>
    
    <p>Congratulations! You've successfully enrolled in <strong>${data.courseName}</strong>. You're now on your way to mastering data analytics and AI!</p>
    
    <div class="highlight-box">
      <h3 style="margin-top: 0; color: #0ea5e9;">📚 Course Details</h3>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Course</div>
          <div class="info-value">${data.courseName}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Investment</div>
          <div class="info-value">₹${data.coursePrice}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Duration</div>
          <div class="info-value">3 Months</div>
        </div>
        <div class="info-item">
          <div class="info-label">Format</div>
          <div class="info-value">1-on-1 Sessions</div>
        </div>
      </div>
    </div>
    
    <p><strong>What happens next:</strong></p>
    <ol style="color: #475569; line-height: 1.8;">
      <li>You'll receive a welcome call within 24 hours</li>
      <li>We'll schedule your first training session</li>
      <li>You'll get access to our learning platform</li>
      <li>Your personalized learning path will be created</li>
    </ol>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://daxgenai.com/dashboard" class="button">Access Your Dashboard</a>
    </div>
    
    <div class="highlight-box">
      <h4 style="margin-top: 0; color: #0ea5e9;">🎯 Your Success Journey</h4>
      <p style="color: #475569; margin-bottom: 15px;">With our personalized approach, you'll:</p>
      <ul style="color: #475569; line-height: 1.6;">
        <li>Learn at your own pace with dedicated support</li>
        <li>Work on real-world projects and case studies</li>
        <li>Receive personalized feedback and guidance</li>
        <li>Build a portfolio of practical work</li>
        <li>Get career guidance and job search support</li>
      </ul>
    </div>
    
    <p>If you have any questions or need assistance, don't hesitate to reach out:</p>
    <ul style="color: #475569; line-height: 1.6;">
      <li>Email: <a href="mailto:training@daxgenai.com">training@daxgenai.com</a></li>
      <li>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></li>
      <li>WhatsApp: Available for quick questions</li>
    </ul>
    
    <p>Welcome to the DAxGENAI family! 🚀</p>
    
    <p>Best regards,<br>
    <strong>${data.instructorName}</strong><br>
    Senior Data Analyst & Instructor<br>
    DAxGENAI Training Platform</p>
  `;

  return {
    subject: `Welcome to ${data.courseName} - Your Learning Journey Begins!`,
    html: getBaseTemplate(content),
    text: `
Welcome to DAxGENAI Training!

Hi ${data.name},

Congratulations! You've successfully enrolled in ${data.courseName}. You're now on your way to mastering data analytics and AI!

Course Details:
- Course: ${data.courseName}
- Investment: ₹${data.coursePrice}
- Duration: 3 Months
- Format: 1-on-1 Sessions

What happens next:
1. You'll receive a welcome call within 24 hours
2. We'll schedule your first training session
3. You'll get access to our learning platform
4. Your personalized learning path will be created

Access your dashboard: https://daxgenai.com/dashboard

Your Success Journey:
With our personalized approach, you'll:
- Learn at your own pace with dedicated support
- Work on real-world projects and case studies
- Receive personalized feedback and guidance
- Build a portfolio of practical work
- Get career guidance and job search support

Contact us:
- Email: training@daxgenai.com
- Phone: +1 (555) 123-4567
- WhatsApp: Available for quick questions

Welcome to the DAxGENAI family! 🚀

Best regards,
${data.instructorName}
Senior Data Analyst & Instructor
DAxGENAI Training Platform
    `
  };
};

// Marketing Newsletter
export const getMarketingNewsletter = (data: EmailData): EmailTemplate => {
  const content = `
    <h2 style="color: #1e293b; margin-bottom: 20px;">📊 This Week in Data Analytics & AI</h2>
    
    <p>Hi ${data.name},</p>
    
    <p>Here's your weekly dose of insights, trends, and opportunities in the world of data analytics and AI!</p>
    
    <div class="highlight-box">
      <h3 style="margin-top: 0; color: #0ea5e9;">🔥 Trending This Week</h3>
      <ul style="color: #475569; line-height: 1.8;">
        <li><strong>AI-Powered Analytics:</strong> How ChatGPT is revolutionizing data analysis workflows</li>
        <li><strong>Python 3.12:</strong> New features that data scientists need to know</li>
        <li><strong>Power BI Updates:</strong> Latest visualization capabilities and AI features</li>
        <li><strong>Job Market:</strong> Data Analyst salaries increased by 15% this quarter</li>
      </ul>
    </div>
    
    <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin: 25px 0;">
      <h3 style="color: #0ea5e9; margin-top: 0;">💡 Success Story of the Week</h3>
      <p style="color: #475569; font-style: italic; margin-bottom: 15px;">
        "After completing the DAxGENAI Python course, I landed a Data Analyst role at a Fortune 500 company with a 40% salary increase. The personalized training made all the difference!" - Sarah M., Former Marketing Manager
      </p>
      <p style="color: #64748b; font-size: 14px;">Want to be our next success story? Book a free demo today!</p>
    </div>
    
    <div class="info-grid">
      <div class="info-item">
        <h4 style="color: #0ea5e9; margin-top: 0;">🎯 Career Tip</h4>
        <p style="color: #475569; font-size: 14px;">Build a portfolio of 3-5 real-world projects to stand out in job interviews. Focus on projects that solve actual business problems.</p>
      </div>
      <div class="info-item">
        <h4 style="color: #0ea5e9; margin-top: 0;">📈 Industry Insight</h4>
        <p style="color: #475569; font-size: 14px;">Companies are increasingly using AI tools for data analysis. Learning to work with ChatGPT and Claude is becoming essential.</p>
      </div>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://daxgenai.com/demo" class="button">Book Free Demo Session</a>
    </div>
    
    <div class="highlight-box">
      <h4 style="margin-top: 0; color: #0ea5e9;">🎓 Featured Course: Introduction to Data Analysis with AI</h4>
      <p style="color: #475569; margin-bottom: 15px;">Perfect for beginners! Learn data analysis fundamentals enhanced with AI tools.</p>
      <ul style="color: #475569; line-height: 1.6;">
        <li>✅ 32 hours of personalized training</li>
        <li>✅ AI tools integration (ChatGPT, Claude)</li>
        <li>✅ Real-world projects and case studies</li>
        <li>✅ Certificate upon completion</li>
        <li>✅ 30-day money-back guarantee</li>
      </ul>
      <p style="text-align: center; margin-top: 20px;">
        <a href="https://daxgenai.com/courses" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">Learn More →</a>
      </p>
    </div>
    
    <p>Ready to transform your career? Take the first step today!</p>
    
    <p>Best regards,<br>
    <strong>The DAxGENAI Team</strong></p>
    
    <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
      You're receiving this email because you showed interest in data analytics training. 
      <a href="#" style="color: #0ea5e9;">Unsubscribe</a> | 
      <a href="#" style="color: #0ea5e9;">Update preferences</a>
    </p>
  `;

  return {
    subject: '📊 This Week in Data Analytics & AI - Success Stories & Career Tips',
    html: getBaseTemplate(content),
    text: `
This Week in Data Analytics & AI

Hi ${data.name},

Here's your weekly dose of insights, trends, and opportunities in the world of data analytics and AI!

🔥 Trending This Week:
- AI-Powered Analytics: How ChatGPT is revolutionizing data analysis workflows
- Python 3.12: New features that data scientists need to know
- Power BI Updates: Latest visualization capabilities and AI features
- Job Market: Data Analyst salaries increased by 15% this quarter

💡 Success Story of the Week:
"After completing the DAxGENAI Python course, I landed a Data Analyst role at a Fortune 500 company with a 40% salary increase. The personalized training made all the difference!" - Sarah M., Former Marketing Manager

🎯 Career Tip:
Build a portfolio of 3-5 real-world projects to stand out in job interviews. Focus on projects that solve actual business problems.

📈 Industry Insight:
Companies are increasingly using AI tools for data analysis. Learning to work with ChatGPT and Claude is becoming essential.

🎓 Featured Course: Introduction to Data Analysis with AI
Perfect for beginners! Learn data analysis fundamentals enhanced with AI tools.
- 32 hours of personalized training
- AI tools integration (ChatGPT, Claude)
- Real-world projects and case studies
- Certificate upon completion
- 30-day money-back guarantee

Book your free demo: https://daxgenai.com/demo
Learn more about courses: https://daxgenai.com/courses

Ready to transform your career? Take the first step today!

Best regards,
The DAxGENAI Team
    `
  };
};

// Password Reset Email
export const getPasswordResetEmail = (data: EmailData): EmailTemplate => {
  const content = `
    <h2 style="color: #1e293b; margin-bottom: 20px;">🔐 Reset Your Password</h2>
    
    <p>Hi ${data.name},</p>
    
    <p>We received a request to reset your password for your DAxGENAI account. If you didn't make this request, you can safely ignore this email.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://daxgenai.com/reset-password?token=RESET_TOKEN" class="button">Reset Password</a>
    </div>
    
    <div class="highlight-box">
      <h4 style="margin-top: 0; color: #0ea5e9;">🔒 Security Notice</h4>
      <ul style="color: #475569; line-height: 1.6;">
        <li>This link will expire in 1 hour</li>
        <li>Never share your password with anyone</li>
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication for extra security</li>
      </ul>
    </div>
    
    <p>If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #0ea5e9; font-size: 14px;">
      https://daxgenai.com/reset-password?token=RESET_TOKEN
    </p>
    
    <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:support@daxgenai.com">support@daxgenai.com</a>.</p>
    
    <p>Best regards,<br>
    <strong>The DAxGENAI Security Team</strong></p>
  `;

  return {
    subject: 'Reset Your DAxGENAI Password',
    html: getBaseTemplate(content),
    text: `
Reset Your Password

Hi ${data.name},

We received a request to reset your password for your DAxGENAI account. If you didn't make this request, you can safely ignore this email.

Reset your password: https://daxgenai.com/reset-password?token=RESET_TOKEN

Security Notice:
- This link will expire in 1 hour
- Never share your password with anyone
- Use a strong, unique password
- Enable two-factor authentication for extra security

If you have any questions or need assistance, please contact our support team at support@daxgenai.com.

Best regards,
The DAxGENAI Security Team
    `
  };
};

// Welcome Email for New Users
export const getWelcomeEmail = (data: EmailData): EmailTemplate => {
  const content = `
    <h2 style="color: #1e293b; margin-bottom: 20px;">🎉 Welcome to DAxGENAI!</h2>
    
    <p>Hi ${data.name},</p>
    
    <p>Welcome to the DAxGENAI community! We're thrilled to have you join thousands of professionals who are transforming their careers through personalized data analytics and AI training.</p>
    
    <div class="highlight-box">
      <h3 style="margin-top: 0; color: #0ea5e9;">🚀 What You Can Do Now</h3>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">📚</div>
          <div class="info-value">Explore Our Courses</div>
        </div>
        <div class="info-item">
          <div class="info-label">🎯</div>
          <div class="info-value">Book Free Demo</div>
        </div>
        <div class="info-item">
          <div class="info-label">💬</div>
          <div class="info-value">Chat with AI Tutor</div>
        </div>
        <div class="info-item">
          <div class="info-label">📊</div>
          <div class="info-value">Take Skills Assessment</div>
        </div>
      </div>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://daxgenai.com/demo" class="button">Book Your Free Demo Session</a>
    </div>
    
    <div class="highlight-box">
      <h4 style="margin-top: 0; color: #0ea5e9;">🎓 Why Choose DAxGENAI?</h4>
      <ul style="color: #475569; line-height: 1.6;">
        <li><strong>Personalized Training:</strong> One-on-one sessions tailored to your needs</li>
        <li><strong>Expert Instructors:</strong> Senior Data Analysts with real industry experience</li>
        <li><strong>AI Integration:</strong> Learn to use ChatGPT, Claude, and other AI tools</li>
        <li><strong>Career Support:</strong> Resume review, mock interviews, and job search guidance</li>
        <li><strong>Flexible Scheduling:</strong> Sessions that fit your busy schedule</li>
        <li><strong>Money-Back Guarantee:</strong> 30-day satisfaction guarantee</li>
      </ul>
    </div>
    
    <p><strong>Ready to start your journey?</strong> Here are your next steps:</p>
    <ol style="color: #475569; line-height: 1.8;">
      <li>Book a free demo session to see our training in action</li>
      <li>Take our skills assessment to get a personalized learning path</li>
      <li>Explore our course catalog and choose your path</li>
      <li>Connect with our AI tutor for instant answers to your questions</li>
    </ol>
    
    <p>We're here to support you every step of the way. Don't hesitate to reach out if you have any questions!</p>
    
    <p>Best regards,<br>
    <strong>The DAxGENAI Team</strong></p>
    
    <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
      Follow us on social media for tips, insights, and success stories:<br>
      <a href="#" style="color: #0ea5e9;">LinkedIn</a> | 
      <a href="#" style="color: #0ea5e9;">Twitter</a> | 
      <a href="#" style="color: #0ea5e9;">YouTube</a>
    </p>
  `;

  return {
    subject: '🎉 Welcome to DAxGENAI - Your Data Analytics Journey Starts Here!',
    html: getBaseTemplate(content),
    text: `
Welcome to DAxGENAI!

Hi ${data.name},

Welcome to the DAxGENAI community! We're thrilled to have you join thousands of professionals who are transforming their careers through personalized data analytics and AI training.

What You Can Do Now:
- 📚 Explore Our Courses
- 🎯 Book Free Demo
- 💬 Chat with AI Tutor
- 📊 Take Skills Assessment

Book your free demo: https://daxgenai.com/demo

Why Choose DAxGENAI?
- Personalized Training: One-on-one sessions tailored to your needs
- Expert Instructors: Senior Data Analysts with real industry experience
- AI Integration: Learn to use ChatGPT, Claude, and other AI tools
- Career Support: Resume review, mock interviews, and job search guidance
- Flexible Scheduling: Sessions that fit your busy schedule
- Money-Back Guarantee: 30-day satisfaction guarantee

Ready to start your journey? Here are your next steps:
1. Book a free demo session to see our training in action
2. Take our skills assessment to get a personalized learning path
3. Explore our course catalog and choose your path
4. Connect with our AI tutor for instant answers to your questions

We're here to support you every step of the way. Don't hesitate to reach out if you have any questions!

Best regards,
The DAxGENAI Team
    `
  };
};

// Export all templates
export const emailTemplates = {
  demoBookingConfirmation: getDemoBookingConfirmation,
  courseEnrollmentConfirmation: getCourseEnrollmentConfirmation,
  marketingNewsletter: getMarketingNewsletter,
  passwordReset: getPasswordResetEmail,
  welcome: getWelcomeEmail
};
