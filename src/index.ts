import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

export const helloWorld = functions.https.onRequest((req, res) => {
  // Enable CORS using the `cors` express middleware.
  return cors({ origin: true })(req, res, () => {
    res.send('Hello from Clikalia Pets!\n\n');
  })
});

export const pets = functions.https.onRequest(async (req, res) => {
  const ref = await admin.database().ref('/pets')

  return cors({ origin: true })(req, res, () => {
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function (snapshot) {
      res.send(snapshot.val());
    }, function (errorObject) {
      res.status(500).send(errorObject);
    });
  })
})


