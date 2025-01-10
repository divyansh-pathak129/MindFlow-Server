const { createTransport } = require('nodemailer');

async function sendMail(email, subject, text) {
  const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: "7ee17a002@smtp-brevo.com",
        pass: "gUdZ3tsKm4qcvXNT",
    },
});

  console.log("Transponder Created", email, text)
  
const mailContent = `
        <!DOCTYPE html>
         <html lang="en">
           <head>
             <meta charset="UTF-8" />
             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
             <meta http-equiv="X-UA-Compatible" content="ie=edge" />
             <title>Static Template</title>

             <link
               href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
               rel="stylesheet"
             />
           </head>
           <body
             style="
               margin: 0;
               font-family: 'Poppins', sans-serif;
               background: #ffffff;
               font-size: 14px;
             "
           >
             <div
               style="
                 max-width: 680px;
                 margin: 0 auto;
                 padding: 45px 30px 60px;
                 background: #f4f7ff;
                 background-image: url(https://vibgvvzzunbfcqwcjfbk.supabase.co/storage/v1/object/sign/mindflow-data/Mail%20Stuff/loginBg.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtaW5kZmxvdy1kYXRhL01haWwgU3R1ZmYvbG9naW5CZy5wbmciLCJpYXQiOjE3MzU0ODkzNjUsImV4cCI6MzMyNzE0ODkzNjV9.puUaSE97BkxD2GhBeKK4B7oIa4Jxbuk1TWuAeXl1iic&t=2024-12-29T16%3A22%3A46.921Z);
                 background-repeat: no-repeat;
                 background-size: 800px 452px;
                 background-position: top center;
                 font-size: 14px;
                 color: #434343;
               "
             >
               <header>
                 <table style="width: 100%">
                   <tbody>
                     <tr style="height: 0">
                       <td>
                         <img
                           alt=""
                           src="https://vibgvvzzunbfcqwcjfbk.supabase.co/storage/v1/object/sign/mindflow-data/Mail%20Stuff/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtaW5kZmxvdy1kYXRhL01haWwgU3R1ZmYvbG9nby5wbmciLCJpYXQiOjE3MzU0ODk0MTQsImV4cCI6MzMyNzE0ODk0MTR9.jhPLW-5kq8_BwV6DcpRQEOEPgbJyWou2H42lHydKCIQ&t=2024-12-29T16%3A23%3A35.782Z"
                           height="60px"
                         />
                       </td>
                       <td style="text-align: right">
                         <span style="font-size: 16px; line-height: 30px; color: #ffffff"
                           >MindFlow</span
                         >
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </header>

               <main>
                 <div
                   style="
                     margin: 0;
                     margin-top: 70px;
                     padding: 92px 30px 115px;
                     background: #ffffff;
                     border-radius: 30px;
                     text-align: center;
                   "
                 >
                   <div style="width: 100%; max-width: 489px; margin: 0 auto">
                     <h1
                       style="
                         margin: 0;
                         font-size: 24px;
                         font-weight: 500;
                         color: #1f1f1f;
                       "
                     >
                       Your OTP
                     </h1>
                     <p
                       style="
                         margin: 0;
                         margin-top: 17px;
                         font-size: 16px;
                         font-weight: 500;
                       "
                     >
                       Hey Dude,
                     </p>
                     <p
                       style="
                         margin: 0;
                         margin-top: 17px;
                         font-weight: 500;
                         letter-spacing: 0.56px;
                       "
                     >
                       Welcome to MindFlow! 🎉 Your One-Time Password (OTP) for secure
                       access is:
                     </p>
                     <p
                       style="
                         margin: 0;
                         margin-top: 60px;
                         font-size: 40px;
                         font-weight: 600;
                         letter-spacing: 25px;
                         color: #e4a248;
                       "
                     >
                       ${text}
                     </p>
                     <p
                       style="
                         margin: 0;
                         margin-top: 17px;
                         font-weight: 500;
                         letter-spacing: 0.56px;
                       "
                     >
                       Please use it to complete your verification process. If you didn’t
                       request this OTP, please ignore this email or contact us
                       immediately. Thank you for choosing MindFlow—your companion for
                       better focus and productivity! Best regards, The MindFlow Team
                     </p>
                   </div>
                 </div>

                 <p
                   style="
                     max-width: 400px;
                     margin: 0 auto;
                     margin-top: 90px;
                     text-align: center;
                     font-weight: 500;
                     color: #8c8c8c;
                   "
                 >
                   Need help? Ask at
                   <a
                     href="mailto:archisketch@gmail.com"
                     style="color: #e4a248; text-decoration: none"
                     >divyansh@mindflowdash.online</a
                   >
                   or visit our
                   <a
                     href="https://mindflowdash.online/contact"
                     target="_blank"
                     style="color: #e4a248; text-decoration: none"
                     >Help Center</a
                   >
                 </p>
               </main>

               <footer
                 style="
                   width: 100%;
                   max-width: 490px;
                   margin: 20px auto 0;
                   text-align: center;
                   border-top: 1px solid #e6ebf1;
                 "
               >
                 <p
                   style="
                     margin: 0;
                     margin-top: 40px;
                     font-size: 16px;
                     font-weight: 600;
                     color: #434343;
                   "
                 >
                   MindFlow
                 </p>
                 <p style="margin: 0; margin-top: 8px; color: #434343">
                   Pune, Maharashtra
                 </p>
                 <div style="margin: 0; margin-top: 16px"></div>
                 <p style="margin: 0; margin-top: 16px; color: #434343">
                   Copyright © 2024 Company. All rights reserved.
                 </p>
               </footer>
             </div>
           </body>
         </html>
         `


const mailOptions = {
    from: 'no-reply@mindflowdash.online',
    to: email,
    subject: subject,
    html: mailContent
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
}


// const nodemailer = require("nodemailer")

// async function sendMail(email, subject, text) {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.HOST,
//             service: process.env.SERVICE,
//             port: Number(process.env.EMAIL_PORT),
//             secure: false, // Adjust this based on your setup
//             auth: {
//                 user: process.env.USER,
//                 pass: process.env.PASS,
//             },
//         });

//         console.log("Transponder Created OTP Values are",email, text)

//         const mailContent = `
//        <!DOCTYPE html>
//         <html lang="en">
//           <head>
//             <meta charset="UTF-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//             <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//             <title>Static Template</title>

//             <link
//               href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
//               rel="stylesheet"
//             />
//           </head>
//           <body
//             style="
//               margin: 0;
//               font-family: 'Poppins', sans-serif;
//               background: #ffffff;
//               font-size: 14px;
//             "
//           >
//             <div
//               style="
//                 max-width: 680px;
//                 margin: 0 auto;
//                 padding: 45px 30px 60px;
//                 background: #f4f7ff;
//                 background-image: url(https://vibgvvzzunbfcqwcjfbk.supabase.co/storage/v1/object/sign/mindflow-data/Mail%20Stuff/loginBg.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtaW5kZmxvdy1kYXRhL01haWwgU3R1ZmYvbG9naW5CZy5wbmciLCJpYXQiOjE3MzU0ODkzNjUsImV4cCI6MzMyNzE0ODkzNjV9.puUaSE97BkxD2GhBeKK4B7oIa4Jxbuk1TWuAeXl1iic&t=2024-12-29T16%3A22%3A46.921Z);
//                 background-repeat: no-repeat;
//                 background-size: 800px 452px;
//                 background-position: top center;
//                 font-size: 14px;
//                 color: #434343;
//               "
//             >
//               <header>
//                 <table style="width: 100%">
//                   <tbody>
//                     <tr style="height: 0">
//                       <td>
//                         <img
//                           alt=""
//                           src="https://vibgvvzzunbfcqwcjfbk.supabase.co/storage/v1/object/sign/mindflow-data/Mail%20Stuff/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtaW5kZmxvdy1kYXRhL01haWwgU3R1ZmYvbG9nby5wbmciLCJpYXQiOjE3MzU0ODk0MTQsImV4cCI6MzMyNzE0ODk0MTR9.jhPLW-5kq8_BwV6DcpRQEOEPgbJyWou2H42lHydKCIQ&t=2024-12-29T16%3A23%3A35.782Z"
//                           height="60px"
//                         />
//                       </td>
//                       <td style="text-align: right">
//                         <span style="font-size: 16px; line-height: 30px; color: #ffffff"
//                           >MindFlow</span
//                         >
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </header>

//               <main>
//                 <div
//                   style="
//                     margin: 0;
//                     margin-top: 70px;
//                     padding: 92px 30px 115px;
//                     background: #ffffff;
//                     border-radius: 30px;
//                     text-align: center;
//                   "
//                 >
//                   <div style="width: 100%; max-width: 489px; margin: 0 auto">
//                     <h1
//                       style="
//                         margin: 0;
//                         font-size: 24px;
//                         font-weight: 500;
//                         color: #1f1f1f;
//                       "
//                     >
//                       Your OTP
//                     </h1>
//                     <p
//                       style="
//                         margin: 0;
//                         margin-top: 17px;
//                         font-size: 16px;
//                         font-weight: 500;
//                       "
//                     >
//                       Hey Dude,
//                     </p>
//                     <p
//                       style="
//                         margin: 0;
//                         margin-top: 17px;
//                         font-weight: 500;
//                         letter-spacing: 0.56px;
//                       "
//                     >
//                       Welcome to MindFlow! 🎉 Your One-Time Password (OTP) for secure
//                       access is:
//                     </p>
//                     <p
//                       style="
//                         margin: 0;
//                         margin-top: 60px;
//                         font-size: 40px;
//                         font-weight: 600;
//                         letter-spacing: 25px;
//                         color: #e4a248;
//                       "
//                     >
//                       ${text}
//                     </p>
//                     <p
//                       style="
//                         margin: 0;
//                         margin-top: 17px;
//                         font-weight: 500;
//                         letter-spacing: 0.56px;
//                       "
//                     >
//                       Please use it to complete your verification process. If you didn’t
//                       request this OTP, please ignore this email or contact us
//                       immediately. Thank you for choosing MindFlow—your companion for
//                       better focus and productivity! Best regards, The MindFlow Team
//                     </p>
//                   </div>
//                 </div>

//                 <p
//                   style="
//                     max-width: 400px;
//                     margin: 0 auto;
//                     margin-top: 90px;
//                     text-align: center;
//                     font-weight: 500;
//                     color: #8c8c8c;
//                   "
//                 >
//                   Need help? Ask at
//                   <a
//                     href="mailto:archisketch@gmail.com"
//                     style="color: #e4a248; text-decoration: none"
//                     >divyansh@mindflowdash.online</a
//                   >
//                   or visit our
//                   <a
//                     href="https://mindflowdash.online/contact"
//                     target="_blank"
//                     style="color: #e4a248; text-decoration: none"
//                     >Help Center</a
//                   >
//                 </p>
//               </main>

//               <footer
//                 style="
//                   width: 100%;
//                   max-width: 490px;
//                   margin: 20px auto 0;
//                   text-align: center;
//                   border-top: 1px solid #e6ebf1;
//                 "
//               >
//                 <p
//                   style="
//                     margin: 0;
//                     margin-top: 40px;
//                     font-size: 16px;
//                     font-weight: 600;
//                     color: #434343;
//                   "
//                 >
//                   MindFlow
//                 </p>
//                 <p style="margin: 0; margin-top: 8px; color: #434343">
//                   Pune, Maharashtra
//                 </p>
//                 <div style="margin: 0; margin-top: 16px"></div>
//                 <p style="margin: 0; margin-top: 16px; color: #434343">
//                   Copyright © 2024 Company. All rights reserved.
//                 </p>
//               </footer>
//             </div>
//           </body>
//         </html>
//         `

//         await transporter.sendMail({
//             from: process.env.USER,
//             to: email,
//             subject: subject,
//             html: mailContent,
//         });

//         console.log('Email sent successfully');
//     } catch (err) {
//         console.error('Error while sending email:', err);
//     }
// }


module.exports= {sendMail}



