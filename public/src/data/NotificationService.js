import firebase from '@/firebase';

const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
const functions = firebase.functions();

let localStorage;

const NotificationService = {
    use(_localStorage) {
        localStorage = _localStorage;
    },
    isSupported() {
        return messaging !== null;
    },
    async requestPermission() {
        try {
            await messaging.requestPermission();
        } catch (e) {
            console.log(e.code);
            throw e;
        }
    },
    async subscribeTo(group) {
        let subscribedGroup = this.getSubscribedGroup();
        if (subscribedGroup) await this.unsubscribeFrom(group);

        let token = await messaging.getToken()
        let topic = `${group.department}-${group.year}-${group.regulation}`;

        try {
            let subscribe = functions.httpsCallable('subscribe');
            await subscribe({ topic: topic, token: token });
            this._setSubscribedGroup(group);
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    async unsubscribeFrom(group) {
        let token = await messaging.getToken()
        let topic = `${group.department}-${group.year}-${group.regulation}`;

        try {
            let unsubscribe = functions.httpsCallable('unsubscribe');
            await unsubscribe({ topic: topic, token: token });
            this._setSubscribedGroup({});
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    getSubscribedGroup() {
        return JSON.parse(localStorage.notify || '{}');
    },
    _setSubscribedGroup(group) {
        localStorage.notify = JSON.stringify(group);
    }
}

export default NotificationService;