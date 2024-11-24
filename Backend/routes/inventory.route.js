const express = require("express");
const Inventory = require("../config/Inventory.config");
const { 
    getInvByID, 
    addInv, 
    getInvByUsername,
    updateInv,
    removeInv,
    getTotalInventoryCount,
    applyOffers,
    finalizeSale
} = require("../controllers/inventory.controller");
const router = express.Router();

router.get("/:id", getInvByID); // Ensure user is registered

router.post("/add/:username", addInv); // Ensure user is registered

router.get("/user/:username", getInvByUsername);

router.get("/getAll", getTotalInventoryCount);

router.put("/update/:id/:username", updateInv);

router.delete("/delete/:id/:username",removeInv);

router.put("/inventory/apply-offers/:id", applyOffers);

router.put("/inventory/finalize-sale/:id", finalizeSale);

module.exports = router;
