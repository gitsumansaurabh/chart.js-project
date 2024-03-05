const express = require("express");
const { fetchAllData, createData } = require("../controllers/Data.controller");

const router = express.Router();

router.post("/", createData).get("/", fetchAllData);

exports.router = router;
