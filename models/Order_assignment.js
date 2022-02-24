const { changeOrderState } = require('./Order');
const { changeMachineState } = require('./Machine');

// Order_assignment constructor
function Order_assignment ({ machine_id, order_id, state }) {
    this.machine_id = machine_id;
    this.order_id = order_id; // mehrere müssen möglich sein, dann neues order_assignment objekt
    this.state = state; // wip or scheduled
};

// Ausgabe aller Assignments
async function getAllAssignments() {
    try {
        const result = await poolConnection.query('SELECT * FROM order_assignments ORDER BY id ASC');
        return result;
    } catch (error) {
        throw error;
    }    
};

// Method to invoke the constructor
Order_assignment.prototype.createOrder_assignment = async function() {
    try {
        const { rows } = await poolConnection.query(
            `INSERT INTO order_assignments (machine_id, order_id, state) VALUES ($1, $2, $3) RETURNING id`, [this.machine_id, this.order_id, this.state]
        );        
        this.id = rows[0].id;
        await changeOrderState("processing", this.order_id);
        await changeMachineState("used", this.machine_id);
        return this;
    } catch (error) {
        throw error;
    }
};

exports.Order_assignment = Order_assignment;
exports.getAllAssignments = getAllAssignments;

