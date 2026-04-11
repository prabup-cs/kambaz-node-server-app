import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";

import mongoose from "mongoose";

export async function findModulesForCourse(courseId) {
  const db = mongoose.connection.db;
  console.log("database name:", db.databaseName);
  const collections = await db.listCollections().toArray();
  console.log(
    "collections:",
    collections.map((c) => c.name),
  );
  const course = await db.collection("courses").findOne({ _id: courseId });
  console.log("raw course:", JSON.stringify(course));
  return course?.modules || [];
}

export async function createModule(courseId, module) {
  const newModule = { ...module, _id: uuidv4() };
  await model.updateOne({ _id: courseId }, { $push: { modules: newModule } });
  return newModule;
}

export async function deleteModule(courseId, moduleId) {
  const status = await model.updateOne(
    { _id: courseId },
    { $pull: { modules: { _id: moduleId } } },
  );
  return status;
}

export async function updateModule(courseId, moduleId, moduleUpdates) {
  const course = await model.findById(courseId);
  const module = course.modules.id(moduleId);
  Object.assign(module, moduleUpdates);
  await course.save();
  return module;
}
