// Order_assignment constructor
function Order_assignment ({ machine_id, order_id, state }) {
    this.machine_id = machine_id;
    this.order_id = order_id; // mehrere müssen möglich sein, dann neues order_assignment objekt
    this.state = state; // wip or scheduled
};

// Method to invoke the constructor
Order.prototype.createOrder_assignment = async function() {
    try {
        const { rows } = await poolConnection.query(
            `INSERT INTO order_assigment (machine_id, order_id, state) VALUES ($1, $2, $3)`, [this.machine_id, this.order_id, this.state]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Order_assignment;

