import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
  return model.find({}, { name: 1, description: 1 });
}

export async function findCoursesForEnrolledUser(userId, db) {
  const { enrollments } = db;
  const courses = await model.find({}, { name: 1, description: 1 });
  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id,
    ),
  );
  return enrolledCourses;
}

export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function createCourse(course) {
  const { _id, ...courseWithoutId } = course;
  const newCourse = { ...courseWithoutId, _id: uuidv4() };
  return model.create(newCourse);
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
