const webpush = require('web-push');
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
// console.log(webpush.generateVAPIDKeys());
const fakeDatabase = []
const app = express()

app.use(cors())
app.use(express.json())
webpush.setVapidDetails('mailto:you@domain.com', 'BOLEQH95H-yTg-6soQPxmrVfY4NUTkD-d97anvX-L9ZC4B-MOSEkWeVvoQYwmSKYVo8JIGuUYaxVisfxsnPOl4E', 'yiBhuopruOLzrwfd_iwV39QqhuWBDtIx950sJ0ncqcU')
const vapidKeys = { // new
    publicKey: 'BOLEQH95H-yTg-6soQPxmrVfY4NUTkD-d97anvX-L9ZC4B-MOSEkWeVvoQYwmSKYVo8JIGuUYaxVisfxsnPOl4E', // new
    privateKey: 'yiBhuopruOLzrwfd_iwV39QqhuWBDtIx950sJ0ncqcU' // new
  }; // 

app.post('/subscription', (req, res) => {
    const subscription = req.body
    fakeDatabase.push(subscription)
  

  })
  
  app.post('/sendNotification', (req, res) => {
    console.log(req.body);
const notificationPayload=req.body;

    const options = {
        vapidDetails: {
            subject: 'mailto:devstyle6@example.com',
            publicKey: vapidKeys.publicKey,
            privateKey: vapidKeys.privateKey,
        },
        TTL: 6000,
    };
    const promises = []
    const promise=[];
   
fakeDatabase.forEach(subscription => {



  promises.push(
    webpush.sendNotification(
      subscription,
      JSON.stringify(notificationPayload).toString()
    )
  )
})

Promise.all(promises).then(() => res.sendStatus(200))
console.log(promise);
})
app.post('/Notification', (req, res) => {
  console.log(req.body);
const notificationPayload=req.body.payload;
const endpoint=req.body.notification;

  const options = {
      vapidDetails: {
          subject: 'mailto:devstyle6@example.com',
          publicKey: vapidKeys.publicKey,
          privateKey: vapidKeys.privateKey,
      },
      TTL: 6000,
  };
  const promises = []
  const promise=[];
 
// fakeDatabase.forEach(subscription => {


console.log("ello world1");
promises.push(
  webpush.sendNotification(
    endpoint,
    JSON.stringify(notificationPayload).toString()
  )
)
// })

Promise.all(promises).then(() => res.sendStatus(200))
console.log(promise);
})


// const payload = {
//     notification: {
//         title: 'Title',
//         body: 'This is my body',
//         icon: 'assets/icons/icon-384x384.png',
//         actions: [
//             { action: 'bar', title: 'Focus last' },
//             { action: 'baz', title: 'Navigate last' },
//         ],
//         data: {
//             onActionClick: {
//                 default: { operation: 'openWindow' },
//                 bar: {
//                     operation: 'focusLastFocusedOrOpen',
//                     url: '/signin',
//                 },
//                 baz: {
//                     operation: 'navigateLastFocusedOrOpen',
//                     url: '/signin',
//                 },
//             },
//         },
//     },
// };


// webpush.sendNotification(subscription, JSON.stringify(payload), options)
//     .then((_) => {
//         console.log('SENT!!!');
//         console.log(_);
//     })
//     .catch((_) => {
//         console.log(_);
//     });
const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log('Server started on port 3000')
      });