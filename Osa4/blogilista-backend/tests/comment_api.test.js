const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const testHelper = require("../utils/test_helper");

describe("Comments are fetched from the db", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = testHelper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test("comments are fetched", async () => {
    const id = Blog.find({})[0];
    console.log(id);
    await api.get(`/blogs/${id}/comments`).expect(200);
  });
});
