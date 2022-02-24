// Order constructor
function Order ({ customer, task, temperature, material, state }) {
    this.customer = customer;
    this.task = task;
    this.temperature = temperature;
    this.material = material;
    this.state = state;
};

// Ausgabe aller Orders
async function getAllOrders() {
    try {
        const result = await poolConnection.query('SELECT * FROM orders ORDER BY id ASC');
        return result;
    } catch (error) {
        throw error;
    }    
};

// Ausgabe einer Order
async function getOrder(id) {
    try {
        const result = await poolConnection.query('SELECT * FROM orders WHERE id = $1', [id]);
        return result;
    } catch (error) {
        throw error;
    }    
};

// Erstelle eine neue Order
Order.prototype.createOrder = async function() {
    try {
        const { rows } = await poolConnection.query(
            `INSERT INTO orders (customer, task, temperature, material, state) VALUES ($1, $2, $3, $4, $5) RETURNING id`, [this.customer, this.task, this.temperature, this.material, this.state]
        );
        this.id = rows[0].id;
        return this;
    } catch (error) {
        throw error;
    }
};

// Editiere eine bestehende Order
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

// Verändere den Status einer Order
async function changeOrderState (state, id) {
    try {
        const { rows } = await poolConnection.query(
            `UPDATE orders SET state = $1 WHERE id = $2`, [state, id]
        );
    } catch (error) {
        throw error;
    }
};

exports.Order = Order;
exports.getAllOrders = getAllOrders;
exports.getOrder = getOrder;
exports.changeOrderState = changeOrderState;

