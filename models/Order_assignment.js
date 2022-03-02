const { changeOrderState } = require('./Order');
const { changeMachineState } = require('./Machine');
const { assign } = require('lodash');

// Order_assignment constructor
function Order_assignment ({ machine_id, state }) {
    this.machine_id = machine_id;
    this.orders = new Array(); // Hier liegt der Fehler
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

async function add_order(order_id, assignment_id) {
    try {
        const result = await poolConnection.query(
            `UPDATE order_assignments SET orders = array_append(orders, $1) WHERE id = $2`, [order_id, assignment_id]
            );
        return result;
    } catch (error) {
        throw error;
    }        
    this.orders.push(order_id);
}

// Hier liegt der Fehler
Order_assignment.prototype.create_order_assignment = async function() {
    try {
        const assignments = await get_all_assignments();
        console.log(assignments.rows.length);
        console.log(assignments.rows);
        if (assignments.rows.length) {
            console.log('if wird ausgeführt');
            for (let i=0; i < assignments.rows.length; i++) {
                if(this.machine_id == assignments.rows[i].machine_id) {
                    if(this.state == assignments.rows[i].state) {
                        await add_order(this.orders[0], this.id);
                    }
                } else {
                    const { rows } = await poolConnection.query(
                        `INSERT INTO order_assignments (machine_id, orders, state) VALUES ($1, $2, $3) RETURNING id`, [this.machine_id, this.orders, this.state]
                    );        
                    this.id = rows[0].id;
                }
            }   
        } else {
            console.log('else wird ausgeführt');
            const { rows } = await poolConnection.query(
                `INSERT INTO order_assignments (machine_id, orders, state) VALUES ($1, $2, $3) RETURNING id`, [this.machine_id, this.orders, this.state]
            );        
            this.id = rows[0].id;
        }        
        for(let i=0; i < this.orders.length; i++) {  // this.orders ist undefined
            await changeOrderState("processing", this.orders[i]);
        }        
        await changeMachineState("used", this.machine_id);
        return this; 
    } catch (error) {
        throw error;
    }
};

exports.Order_assignment = Order_assignment;
exports.get_all_assignments = get_all_assignments;
exports.add_order = add_order;

