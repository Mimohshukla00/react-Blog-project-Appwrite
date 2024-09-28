import config from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client;
  account;

  constructor() {
    if (!config.appwriteUrl || !config.appwriteProjectId) {
      throw new Error("Appwrite configuration is missing.");
    }

    this.client = new Client();
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Optionally call another method if needed
        return userAccount;
      }
    } catch (error) {
      this.handleError("createAccount", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      this.handleError("login", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      this.handleError("getCurrentUser", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      this.handleError("logout", error);
    }
  }

  handleError(method, error) {
    console.error(`Appwrite service :: ${method}`, error);
    throw error; // Re-throw for further error handling
  }
}

const authService = new AuthService();
export default authService;
