import firebase from '@/firebase'
import FileUtil from '@/util/FileUtil'

const firestore = firebase.firestore();
const storage = firebase.storage();

const NoteService = {
    async getNotes(group) {
        let notes = [];

        let notesData = await firestore
            .collection('department').doc(group.department)
            .collection('year').doc(group.year)
            .collection('regulation').doc(group.regulation)
            .collection('subject').doc(group.subject)
            .collection('notes')
            .get();

        notesData.forEach(n => {
            const note = n.data();
            notes.push({
                id: n.id,
                name: note.name,
                size: note.size,
                type: note.type,
                url: note.url,
                group: group
            });
        });

        return notes;
    },
    uploadNotes(file, group, progress, error, success) {
        const filePath = `${group.department}/${group.year}/${group.regulation}/${group.subject}/${file.name}`

        const uploadTask = storage.ref()
            .child(filePath)
            .put(file);

        uploadTask.on(
            "state_changed",
            progress,
            error,
            async () => {
                await firestore.collection('department').doc(group.department)
                    .collection('year').doc(group.year)
                    .collection('regulation').doc(group.regulation)
                    .collection('subject').doc(group.subject)
                    .collection('notes').doc()
                    .set({
                        name: uploadTask.snapshot.metadata.name,
                        size: FileUtil.getSize(uploadTask.snapshot.metadata.size),
                        type: FileUtil.getExtension(uploadTask.snapshot.metadata.name),
                        url: await uploadTask.snapshot.ref.getDownloadURL()
                    });
                success();
            }
        );
        return uploadTask;
    },
    deleteNote(note) {
        const noteRef = firestore
            .collection('department').doc(note.group.department)
            .collection('year').doc(note.group.year)
            .collection('regulation').doc(note.group.regulation)
            .collection('subject').doc(note.group.subject)
            .collection('notes').doc(note.id);
        return firestore.runTransaction(async (transaction) => {
            try {
                await transaction.delete(noteRef);
                await storage.refFromURL(note.url).delete();
            } catch (e) {
                if (e.code !== 'storage/object-not-found') throw e;
            }
        })
    }
}

export default NoteService;