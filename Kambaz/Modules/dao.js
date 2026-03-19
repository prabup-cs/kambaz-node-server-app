import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((module) => module.course === courseId);
  }

  function createModule(courseId, module) {
    const newModule = {
      ...module,
      _id: uuidv4(),
      course: courseId,
      lessons: [],
    };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function deleteModule(moduleId) {
    db.modules = db.modules.filter((m) => m._id !== moduleId);
  }

  function updateModule(moduleId, moduleUpdates) {
    const module = db.modules.find((m) => m._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  }

  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
