import config from "../config/confirg";
import { Client, ID, Databases, Storage, Query, } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID)
        this.databases= new Databases(this.client)
        this.bucket= new Storage(this.client)
    }

    async createPost({tittle, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatebaseID,
                config.appwriteCollectionID,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service error is : ",error)
        }
    }

    async updatePost(slug, {tittle, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatebaseID,
                config.appwriteCollectionID,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service error is : ",error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
               config.appwriteDatebaseID,
               config.appwriteCollectionID,
               slug
            )

            return true
            
        } catch (error) {
            console.log("Appwrite Services is ", error);
            return false 
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteCollectionID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Error for getPost provide ",error )
        }
    }

    async getPosts(quries = [Query.equal("status","active")]){
        try {
            return await this.databases.getDocument(
                config.appwriteDatebaseID,
                config.appwriteCollectionID,
                quries,
            )
        } catch (error) {
            console.log("Here is Appwrite getPosts error :",error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.databases.getDocument(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Here is Appwrite Uploadfile error :",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.databases.deleteDocument(
                config.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Here is Appwrite Delete file error :",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileId
        )
    }
    
}



const service = Service()
export default service