import firebase from '@/firebase'

const firestore = firebase.firestore();

const GroupService = {
    async getDepartments() {
        let departments = [];
        try {
            let departmentData = await firestore.collection('department').get();
            departmentData.forEach(d => departments.push({ id: d.id, name: d.data().name }));
        } catch (e) {
            console.log("Error getting year list: ", e);
        }
        return departments;
    },
    async getYears(departmentId) {
        let years = [];
        try {
            let yearData = await firestore.collection('department').doc(departmentId).collection('year').get();
            yearData.forEach(y => years.push({ id: y.id, name: y.data().name }));
        } catch (e) {
            console.log("Error getting year list: ", e);
        }
        return years;
    },
    async getRegulations() {
        return [
            { id: '2013', name: 'Regulation 2013' },
            { id: '2017', name: 'Regulation 2017' },
        ]
    },
    async getSubjects(departmentId, yearId, regulationId) {
        let subjects = [];
        try {
            let subjectData = await firestore
                .collection('department').doc(departmentId)
                .collection('year').doc(yearId)
                .collection('regulation').doc(regulationId)
                .collection('subject')
                .get();
            subjectData.forEach(s => subjects.push({ id: s.id, name: s.data().name }));
        } catch (e) {
            console.log("Error getting subject list: ", e);
        }
        return subjects;
    }
};

export default GroupService;