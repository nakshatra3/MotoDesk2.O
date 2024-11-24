const Customer = require('../config/customer.config');
const Price = require('../config/price.config'); // Assuming the Price model is used for offers

// Add customer
const addCust = async (req, res) => {
    try {
        const { name, email, phone, address, car, model, color, status, rating, description } = req.body;

        // Create a new customer instance
        const newCustomer = new Customer({
            name,
            email,
            phone,
            address,
            car,
            model,
            color,
            status,
            rating,
            description
        });

        // Save the customer to the database
        await newCustomer.save();

        // Send a response
        res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ message: "Error adding customer", error: error.message });
    }
};

// Get customer details
const getReviews = async (req, res) => {
    try {
        const customers = await Customer.find({}, 'name email rating description status car model'); 

        if (!customers.length) {
            return res.status(404).json({ message: "No customers found" });
        }

        // Calculate satisfied and unsatisfied customer counts
        const satisfiedCount = customers.filter(c => c.status === 'satisfied').length;
        const unsatisfiedCount = customers.length - satisfiedCount;

        res.status(200).json({ 
            customers, 
            summary: {
                satisfiedCustomers: satisfiedCount,
                unsatisfiedCustomers: unsatisfiedCount,
            } 
        });
    } catch (error) {
        console.error("Error retrieving reviews:", error);
        res.status(500).json({ message: "Error retrieving reviews", error: error.message });
    }
};

// View offers
const viewOffers = async (req, res) => {
    try {
        const { name, model, color } = req.query; // Optional filters for offers

        // Build query based on available filters
        const query = {};
        if (name) query.name = name;
        if (model) query.model = model;
        if (color) query.color = color;

        // Find matching offers in the Price collection
        const offers = await Price.find(query).select('name model color discountPercentage costPrice');

        if (offers.length === 0) {
            return res.status(404).json({ message: "No offers found for the specified criteria." });
        }

        res.status(200).json({ offers });
    } catch (error) {
        console.error("Error retrieving offers:", error);
        res.status(500).json({ message: "Error retrieving offers", error: error.message });
    }
};

module.exports = { addCust, getReviews, viewOffers };
