import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(userId, courseId) {
  return model.findOneAndUpdate(
    { user: userId, course: courseId },
    {
      $setOnInsert: {
        _id: `${userId}-${courseId}`,
        user: userId,
        course: courseId,
      },
    },
    { upsert: true, new: true },
  );
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export function unenrollAllUsersFromCourse(courseId) {
  return model.deleteMany({ course: courseId });
}

export function getEnrollmentsForUser(userId) {
  return model.find({ user: userId });
}
