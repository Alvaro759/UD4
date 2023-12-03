const mongoose = require("mongoose");

const db = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb://127.0.0.1:27017/concesionarios", {});
        console.log("Conexion correcta");
    } catch (err) {
        console.error("Error de conexion:", err);
    }
};

module.exports = db;

