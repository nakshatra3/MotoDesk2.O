const express = require('express');
const { addCust, getReviews, viewOffers } = require('../controllers/customer.controllers');
const router = express.Router();

// Add Customer
router.post("/add",addCust);

// Get Customer Details
router.get('/reviews', getReviews);

router.get('/offers', viewOffers);

module.exports = router;