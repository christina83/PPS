const express = require('express');

// Order constructor
function Order ({ id, customer, task, temperature, material }) {
    this.customer = customer;
    this.task = task;
    this.temperature = temperature;
    this.material = material;
};


// Method to invoke the constructor
Order.prototype.createOrder = async function() {
    try {
        const { rows } = await poolConnection.query(
            `INSERT INTO orders (customer, task, temperature, material) VALUES ($1, $2, $3, $4)`, [this.customer, this.task, this.temperature, this.material]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Order;

