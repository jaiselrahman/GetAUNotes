const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.subscribe = functions.https.onCall((data, context) => {
    console.log('Topic', data.topic);
    return admin.messaging().subscribeToTopic(data.token, '/topics/' + data.topic)
        .then(response => {
            console.log('Successfully subscribed to topic:', response);
            return { success: true }
        })
        .catch(error => {
            console.log('Error subscribing to topic:', error);
            return { success: false }
        });
})

exports.unsubscribe = functions.https.onCall((data, context) => {
    console.log('Topic', data.topic);
    return admin.messaging().unsubscribeFromTopic(data.token, '/topics/' + data.topic)
        .then(response => {
            console.log('Successfully unsubscribed from topic:', response);
            return { success: true }
        })
        .catch(error => {
            console.log('Error unsubscribing from topic:', error);
            return { success: false }
        });
})
