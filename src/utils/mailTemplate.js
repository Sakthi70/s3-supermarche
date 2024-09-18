export const registerTemplate =(name,otp)=> {
    let origin = window.origin;
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification Email</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            padding: 20px;
            text-align: center;
            color: black;
        }
        .logo {
            max-width: 200px;
            margin: 0 auto;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            background: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666;
        }
        .social-links img {
            width: 24px;
            margin: 0 10px;
        }
        a {
            text-decoration: none;
            color: #007bff;
        }
        @media (max-width: 600px) {
            .container {
                width: 100%;
                box-shadow: none;
            }
            .otp {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${origin}/assets/images/S3/s3-logo.png" alt="Company Logo" class="logo">
            <h1>OTP Verification</h1>
        </div>
        <div class="content">
            <p>Hi ${name},</p>
            <p>Your OTP for verification is:</p>
            <div class="otp">${otp}</div>
            <p>Please do not share it with anyone.</p>
        </div>
        <div class="footer">
            <div class="social-links">
                <a href="https://facebook.com" target="_blank">
                    <img src="${origin}/assets/images/social/fb.png" alt="Facebook">
                </a>
                <a href="https://instagram.com" target="_blank">
                    <img src="${origin}/assets/images/social/insta.png" alt="Instagram">
                </a>
                <a href="https://x.com" target="_blank">
                    <img src="${origin}/assets/images/social/x.png" alt="X">
                </a>
            </div>
            <p>
                <a href="privacy-policy-url.html">Privacy Policy</a> | 
                <a href="contact-us-url.html">Contact Us</a>
            </p>
            <p>&copy; 2024 S3 Supermarche. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
}

export const registerPlainTemplate =(name, otp) => {
    return `
Hi ${name},

Your OTP for verification is: **${otp}**

Please do not share it with anyone.

---

**Follow us on social media:**
- Facebook: [facebook.com/yourcompany](https://facebook.com/yourcompany)
- Twitter: [twitter.com/yourcompany](https://twitter.com/yourcompany)
- LinkedIn: [linkedin.com/company/yourcompany](https://linkedin.com/company/yourcompany)

---

**Quick Links:**
- [Privacy Policy](https://yourcompany.com/privacy-policy)
- [Contact Us](https://yourcompany.com/contact-us)

---

&copy; 2024 S3 Supermarche. All rights reserved.
`
}


export const resetPasswordTemplate =(otp)=> {
    let origin = window.origin;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo {
            max-width: 150px;
        }
        .content {
            margin-bottom: 20px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
        }
        a {
            color: #007BFF;
            text-decoration: none;
        }
        .social-links img {
            width: 24px;
            margin: 0 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${origin}/assets/images/S3/s3-logo.png" alt="Company Logo" class="logo" />
        </div>
        <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hi,</p>
            <p>We received a request to reset your password. Use the OTP below to reset your password:</p>
            <div class="otp">${otp}</div>
            <p>If you didn't request a password reset, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Thank you for being a valued member of our community!</p>
            <div class="social-links">
                <a href="https://facebook.com/yourcompany"><img src="${origin}/assets/images/social/fb.png" alt="Facebook" /></a>
                <a href="https://twitter.com/yourcompany"><img src="${origin}/assets/images/social/x.png" alt="Twitter" /></a>
                <a href="https://instagram.com/yourcompany"><img src="${origin}/assets/images/social/insta.png" alt="Instagram" /></a>
            </div>
            <p>
                <a href="https://yourcompany.com/privacy-policy">Privacy Policy</a> | 
                <a href="https://yourcompany.com/contact-us">Contact Us</a>
            </p>
            <p>&copy; 2024 S3 Supermarche. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
}

export const getplainResetTemplate =(otp)=> {
    return `Hi,

We received a request to reset your password. Use the OTP below to reset your password:

Your OTP: ${otp}

If you didn't request a password reset, please ignore this email.

Thank you for being a valued member of S3 Supermarche!

Links:

Privacy Policy
Contact Us
© 2024 S3 Supermarche. All rights reserved.`
}