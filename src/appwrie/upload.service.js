import config from "../config/config";
import { Client, Storage, ID } from "appwrite";

export class Storage {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectID);
    this.bucket = new Storage(this.client);
  }

  // Upload File
  async uploadFile(file) {
    try {
      await this.bucket.createFile(config.appwriteBucketID, ID.unique(), file);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: Upload File :: error", error);
      return false;
    }
  }

  // Delete File
  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketID, fileID);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: Delete File :: error", error);
      return false;
    }
  }

  // Files Preview
  async getFilePreview(fileID) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketID, fileID);
    } catch (error) {
      console.log("Appwrite Service :: Get File Preview :: error", error);
    }
  }
}

const storage = new Storage();

export default storage;
