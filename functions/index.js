const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.firestore.document('department/{departmentId}/year/{yearId}/regulation/{regulationId}/subject/{subjectId}/notes/{noteId}')
    .onCreate((snapshot, context) => {
        const grp = context.params;
        const topic = `${grp.departmentId}-${grp.yearId}-${grp.regulationId}`;
        const url = `/n/${grp.departmentId}/${grp.yearId}/${grp.regulationId}/${grp.subjectId}`;

        const message = {
            data: {
                title: 'New Note Added!',
                body: snapshot.data().name,
                url: url,
            },
            topic: topic
        };

        return admin.messaging().send(message).then(response => {
            console.log('Sent notification topic:', topic);
            return { success: true }
        })
            .catch(error => {
                console.log('Error sending notification to topic:', error);
                return { success: false }
            });
    });

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
