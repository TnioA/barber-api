import ContextFirebase from "../Entities/ContextFirebase";

export class FirebaseRepository {
    public database: any;
    
    constructor() {
        this.database = ContextFirebase.connection;
    }

    async getAll(collection: string, query: any = null){
        try{
            var querySnapshot = query !== null ? await this.database.collection(collection).where(query.column, query.operator, query.value).get()
            : await this.database.collection(collection).get();
        
            var response: any[] = [];
            querySnapshot.forEach((doc: any) => {
                response.push(doc.data());
            });

            return response;
        }catch(ex: any){
            console.log(ex);
            return [];
        }
    }

    async getFirstById(collection: string, id: string){
        try{
            var querySnapshot = await this.database.collection(collection).doc(id).get();
            if (!querySnapshot.exists) {
                return null;
            }

            return querySnapshot.data();
        }catch(ex: any){
            console.log(ex);
            return null;
        }
    }

    async getFirst(collection: string, query: any = null){    
        try{
            var querySnapshot = query !== null ? await this.database.collection(collection).where(query.column, query.operator, query.value).get()
                : await this.database.collection(collection).get();

            var response: any[] = [];
            querySnapshot.forEach((x: any) => {
                response.push(x.data());
            });

            return response.length > 0 ? response[0] : null;
        }catch(ex: any){
            console.log(ex);
            return null;
        }
    }

    async add(collection: string, content: any){     
        try{ 
            var docRef = await this.database.collection(collection).doc();
            content.id = docRef.id;
            await docRef.set(content);

            return content;
        }catch(ex: any){
            console.log(ex);
            return null;
        }
    }

    async update(collection: string, content: any){
        try{
            await this.database.collection(collection).doc(content.id).update(content);

            return content;
        }catch(ex: any){
            console.log(ex);
            return null;
        }
    }
}