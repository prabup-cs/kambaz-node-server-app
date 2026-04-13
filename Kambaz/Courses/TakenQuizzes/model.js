import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("TakenQuizModel", schema);
export default model;
