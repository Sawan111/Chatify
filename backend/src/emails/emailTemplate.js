export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Chatify</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    
    <div style="background: linear-gradient(to right, #36D1DC, #5B86E5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="color: white; margin: 0;">Welcome to Chatify!</h1>
    </div>

    <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px;">
      <p><strong>Hello ${name},</strong></p>
      <p>We're excited to have you join Chatify 🎉</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${clientURL}" 
           style="background: linear-gradient(to right, #36D1DC, #5B86E5); 
                  color: white; 
                  text-decoration: none; 
                  padding: 12px 30px; 
                  border-radius: 50px; 
                  display: inline-block;">
          Open Chatify
        </a>
      </div>

      <p>Happy messaging!</p>
      <p>– The Chatify Team</p>
    </div>

  </body>
  </html>
  `;
}