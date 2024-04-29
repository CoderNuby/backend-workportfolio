const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;