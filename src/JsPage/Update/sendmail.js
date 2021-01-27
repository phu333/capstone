// var express = require('express');
// var nodemailer = require('nodemailer');

// var app = express();

// const user = 'BaoNHNSE62490@fpt.edu.vn'
// app.post('/api/v1/Company/', function(req, res) {
//     var transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             type: 'OAuth2',
//             clientId: '440372110607-27hiojgr091rka0i09e3eahjcqkj87h6.apps.googleusercontent.com',
//             clientSecret: 'BKr4B-upw3KrcuJL-CqN-lIM'
//         }
//     });
//     var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
//         from: 'trauvangmayman97@gmail.com',
//         to: 'BaoNHNSE62490@fpt.edu.vn',//'0motlanxa@gmail.com',
//         subject: 'Test Nodemailer',
//         text: 'You recieved message from ' + user,
//         html: '<p>You have got a new message</b><ul><li>Username:' + user + '</li></ul>',
//         auth: {
//             user: 'trauvangmayman97@gmail.com',
//             refreshToken: '1//04hIE6MNpp3e7CgYIARAAGAQSNwF-L9Ir38kIf5UlWOOWLm6kt1Bjt2g-aR6vAlFfG89qcpE0TNhM-khSal44xKsBc1qHO95cuEE',
//             accessToken: 'ya29.a0AfH6SMAPxoBIeMwS_8HFvIpCgvJvzoorU54cQO2as2aBeJqmLmT30iqIgCMeJjwDjhO3X8rtWFeLltYlCiLlxmzgcdqstAKc7gTY2atAs3Nb-j1tpR8WJCs3h-DQ6IA6ocJ6Ft1Z-e2XrsVa92E5riEjxk1TKTc83SrDNUGTvlc',
//             expires: 1484314
//         }
//     }
//     transporter.sendMail(mainOptions, function (err, info) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Message sent: ' + info.response);
//         }
//     });
// });