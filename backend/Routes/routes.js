const express = require('express');
const router = express.Router();



const authController = require("../Controller/authController");
router.post("/login", authController.login);
router.post("/signup", authController.signup);

const taskController = require("../Controller/taskController");
router.post("/list", taskController.list);
router.post("/add", taskController.add);
router.post("/update", taskController.update);
router.post("/set-complete", taskController.updateCompleted);
router.post("/delete", taskController.delete);

module.exports = router