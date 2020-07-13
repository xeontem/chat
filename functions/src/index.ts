import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const firestore = admin.firestore();

export const addChatWithUser = functions.https.onCall((data, context) => {
  return Promise.all([
    admin.auth().getUser(context.auth.uid),
    admin.auth().getUserByEmail(data.email)
  ])
    .then(([curUser, friendUser]) => {
      return [
        { email: friendUser.email, uid: curUser.uid },
        { email: curUser.email, uid: friendUser.uid }
      ];
    })
    .then(users => {
      return Promise.all(users.map(userData => {
        return firestore.collection('usersData').doc(userData.uid).collection('chats').doc(userData.email).set({});
      }));
    })
    .then(() => {
      const msg = 'successfully added chat btw users!';
      console.log(msg);
      return msg;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
});

export const addMessage = functions.https.onCall((data, context) => {
  return Promise.all([
    admin.auth().getUser(context.auth.uid),
    admin.auth().getUserByEmail(data.friendEmail)
  ])
    .then(([curUser, friendUser]) => {
      return [
        { email: curUser.email, uid: curUser.uid, friendEmail: friendUser.email, senderMail: curUser.email },
        { email: friendUser.email, uid: friendUser.uid, friendEmail: curUser.email, senderMail: curUser.email }
      ];
    })
    .then(users => {
      return Promise.all(users.map(userData => {
        return firestore.collection('usersData').doc(userData.uid).collection('chats').doc(userData.friendEmail).collection('messages').add({
          message: data.msg, author: userData.senderMail, date: Date.now()
        });
      }));
    })
    .then(() => {
      const msg = 'successfully added message to both users!';
      console.log(msg);
      return msg;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
});
