const { changeOrderState } = require('./Order');

// Order_assignment constructor
function Order_assignment ({ machine_id, order_id, state }) {
    this.machine_id = machine_id;
    this.order_id = order_id;
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

// Ausgabe aller verwendeten machine_ids
async function get_all_machine_ids() {
    try {
        const result = await poolConnection.query('SELECT DISTINCT machine_id FROM order_assignments');
        return result.rows.map(h => h.machine_id);
    } catch (error) {
        throw error;
    }    
};

// Die soll nicht mehr in DB aggregieren, sondern hier in Programm und dann zur Ausgabe geben
async function aggregate_wip_orders(machine_id, inner_map) {
    try {
        const result = await poolConnection.query(
            `SELECT order_id FROM order_assignments WHERE machine_id = $1  AND state = 'WIP'`, [machine_id]
        );
        const orders = [];
        for (let i=0; i<result.rows.length; i++) {
            orders.push(result.rows[i].order_id);
        }
        inner_map.set('WIP', orders);
        return inner_map;        
    } catch (error) {
        throw error;
    }        
}

async function aggregate_scheduled_orders(machine_id, inner_map) {
    try {
        const result = await poolConnection.query(
            `SELECT order_id FROM order_assignments WHERE machine_id = $1  AND state = 'Scheduled'`, [machine_id]
        );
        const orders = [];
        for (let i=0; i<result.rows.length; i++) {
            orders.push(result.rows[i].order_id);
        }
        inner_map.set('Scheduled', orders);
        return inner_map;        
    } catch (error) {
        throw error;
    }        
}

Order_assignment.prototype.create_order_assignment = async function() {
    try {        
        const { rows } = await poolConnection.query(
            // Hier war der Fehler
            `INSERT INTO order_assignments (machine_id, order_id, state) VALUES ($1, $2, $3) RETURNING id`, [this.machine_id, this.order_id, this.state]
        );
        await changeOrderState("processing", this.order_id);
        return this; 
    } catch (error) {
        throw error;
    }
};

exports.Order_assignment = Order_assignment;
exports.get_all_assignments = get_all_assignments;
exports.get_all_machine_ids = get_all_machine_ids;
exports.aggregate_wip_orders = aggregate_wip_orders;
exports.aggregate_scheduled_orders = aggregate_scheduled_orders;
