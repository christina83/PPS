
// Machine constructor
function Machine ({ id, name, type }) {
    this.id = id;
    this.name = name;
    this.type = type;
};

// Method to invoke the constructor
Machine.prototype.createMachine = async function() {
    try {
        const { rows } = await poolConnection.query(
            `INSERT INTO machines (id, name, type) VALUES ($1, $2, $3)`, [this.id, this.name, this.type]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = Machine;

