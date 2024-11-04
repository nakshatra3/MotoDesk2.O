const express = require("express");
const Inventory = require("../config/Inventory.config");
const { 
    getInvByID, 
    addInv, 
    getInvByUsername,
    updateInv,
    removeInv
} = require("../controllers/inventory.controller");
const router = express.Router();

router.get("/:id", getInvByID); // Ensure user is registered

router.post("/add", addInv); // Ensure user is registered

router.get("/user/:username", getInvByUsername);

router.put("/update/:id/:username", updateInv);

router.delete("/delete/:id/:username",removeInv);

module.exports = router;
