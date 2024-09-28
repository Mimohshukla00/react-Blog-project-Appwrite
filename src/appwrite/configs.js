import config from "../config/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId).this.databases = new Databases(
      this.client
    ).this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite :: create post", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite :: update post", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite :: delete post", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("appwrite :: get post", error);
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite :: get posts", error);
      return false;
    }
  }

  //   file upload files

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        file,
        config.appwriteBucketId,
        ID.unique()
      );
    } catch (error) {
      console.log("appwrite :: upload file", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(fileId, config.appwriteBucketId);
      return true;
    } catch (error) {
      console.log("appwrite :: delete file", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(fileId, config.appwriteBucketId);
  }
}

const service = new Service();

export default service;
