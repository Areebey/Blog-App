import config from "../config/confirg";
import { Client, Account, ID} from 'appwrite';

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email, password});
            }else{
                return userAccount
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log(error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service, Get user error", error);            
        }

        return null;
    }

    async logout(){
        try {
           return await this.account.deleteSession();
        } catch (error) {
            console.log("Appwite service, Logout", error);
        }
    }

}

const authService =  new AuthService()

export default authService