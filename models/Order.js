const express = require('express');

// Order constructor
function Order ({ customer, task, temperature, material }) {
    this.customer = customer;
    this.task = task;
    this.temperature = temperature;
    this.material = material;
};

async function getAllOrders () {
    try {
        const result = await poolConnection.query('SELECT * FROM orders ORDER BY id ASC');
        return result;
    } catch (error) {
        throw error;
    }    
}


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

Order.prototype.updateOrder = async function(id) {
    try {
        const { rows } = await poolConnection.query(
            `UPDATE orders SET customer = $1, task = $2, temperature = $3, material = $4 WHERE id = $5`, [this.customer, this.task, this.temperature, this.material, id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};


exports.Order = Order;
exports.getAllOrders = getAllOrders;

