import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = require("../../key.json");

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