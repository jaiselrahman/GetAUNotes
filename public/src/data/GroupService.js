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
        if (departmentId == null) {
            return [
                { id: "1", name: "1st year" },
                { id: "2", name: "2nd year" },
                { id: "3", name: "3rd year" },
                { id: "4", name: "4th year" },
                { id: "5", name: "5th year" }
            ]
        }

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
    },
    async addSubjectGroup(group) {
        var batch = firestore.batch();

        var yearRef = firestore.collection('department').doc(group.department.id)
                .collection('year').doc(group.year.id);
        batch.set(yearRef, { name: group.year.name} );

        var regRef = yearRef.collection('regulation').doc(group.regulation.id);
        batch.set(regRef, { name: group.regulation.name });

        var subRef = regRef.collection('subject').doc(group.subject.id);
        batch.set(subRef, { name: group.subject.name });

        await batch.commit();
    }
};

export default GroupService;