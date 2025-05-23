const Service = require("../models/service.model.js");
const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(404).json({ message: "No service found" });
            return;
        }
        res.status(200).json({ message: response });
        
    } catch (error) {
        console.error('Services', error);
        
    }
};

module.exports = services;