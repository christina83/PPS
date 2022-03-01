const { changeOrderState } = require('./Order');
const { changeMachineState } = require('./Machine');

// Order_assignment constructor
function Order_assignment ({ machine_id, orders, state }) {
    this.machine_id = machine_id;
    this.orders = orders; // mehrere order ids
    this.state = state;
};

// Ausgabe aller Assignments
async function get_all_assignments() {
    try {
        const result = await poolConnection.query('SELECT * FROM order_assignments ORDER BY id ASC');
        return result;
    } catch (error) {
        throw error;
    }    
};

// Method to invoke the constructor
Order_assignment.prototype.create_order_assignment = async function() {
    try {
        const assignments = await get_all_assignments();
        for (let i=0; i < assignments.rows.length; i++) {
            if(this.machine_id == assignments.rows[i].machine_id) {
                if(this.state == assignments.rows[i].state) {
                    assignments.rows[i].add_order(this.orders);
                }
            } else {
                const { rows } = await poolConnection.query(
                    `INSERT INTO order_assignments (machine_id, orders, state) VALUES ($1, $2, $3) RETURNING id`, [this.machine_id, this.orders, this.state]
                );        
                this.id = rows[0].id;
            }
        }   
        for(let i=0; i < this.orders.length; i++) {
            await changeOrderState("processing", this.orders[i]);
        }        
        await changeMachineState("used", this.machine_id);
        return this; 
    } catch (error) {
        throw error;
    }
};

Order_assignment.prototype.add_order = async function(order_id) {
    this.orders.push(order_id);
}

exports.Order_assignment = Order_assignment;
exports.get_all_assignments = get_all_assignments;

