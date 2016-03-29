import email from 'emailjs';
import { makeMiddleware } from 'api';

const apiCall = makeMiddleware;

export default router => {
  router.route('/mail')
    .put(apiCall(mail));
}

function sendMail(params) {
  const server = email.server.connect({
     user: 'ozgur.ucamaz@gmail.com',
     password: 'PASS',
     host: 'smtp.gmail.com',
     ssl: true
  });

  return new Promise((resolve, reject) => {
    server.send(params, function(err, message) {
      if (err) {
        reject(err);
      }
      resolve(message);
    });
  }).then(result => {
    const { header } = result;
    return { date: header.date, messageId: header['message-id'] };
  });
}


async function mail(body, params) {
  const mailInfo = await sendMail(body);
  return [mailInfo];
}
