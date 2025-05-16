const { Schema, model} = require("mongoose");


const serviceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: Array, required: true }
});

const Service = new model("Service", serviceSchema);

module.exports = Service;