import config from "../config/config";
import { Client, Databases, Query } from "appwrite";

export class Database {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID);
    this.database = new Databases(this.client);
  }

  // Create Post in Database
  async createPost({ title, content, featuredImage, user_ID, status, slug }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          user_ID,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: Create Post  :: error", error);
    }
  }

  // Update Post in Database
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: Update Post  :: error", error);
    }
  }

  // Delete Post in Database
  async deletePost(slug) {
    try {
      await this.database.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: Delete Post  :: error", error);
    }
  }

  // Get Post in Database
  async getPost(slug) {
    try {
      await this.database.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: Get Post  :: error", error);
      return false;
    }
  }

  // Get All Post in Database
  async getPosta(queries = [Query.equal("status", "active")]) {
    try {
      await this.database.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        queries
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: Get Posts  :: error", error);
      return false;
    }
  }
}

const database = new Database();

export default database;
