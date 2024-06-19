import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = require("../../barberapp-e511c-firebase-adminsdk-3drvt-08ec6ef6c3.json");

export default new class FirebaseProvider {
    public connection: any = null;

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: "db-cangacostore.appspot.com"
        });

        this.connection = getFirestore();
    }
}