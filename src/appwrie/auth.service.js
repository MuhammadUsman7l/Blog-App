import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID);
    this.account = new Account(this.client);
  }

  // Sign Up
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.createAccount(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite Service :: CreateAccount :: error", error);
    }
  }

  //Sign in
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite Service :: Login :: error", error);
    }
  }

  // Log out
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service :: Logout :: error", error);
    }
    return null;
  }

  // Current State
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: Current User  :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
