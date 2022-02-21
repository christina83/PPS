// Machine constructor
function Machine ({ name, type }) {
    this.name = name;
    this.type = type;
};

// Ausgabe aller Maschinen
async function getAllMachines() {
    try {
        const result = await poolConnection.query('SELECT * FROM machines ORDER BY id ASC');
        return result;
    } catch (error) {
        throw error;
    }    
};

// Erstelle eine neue Maschine (sollte eine Maschine erstellen und nur die zurückgeben)
Machine.prototype.createMachine = async function() {
    try {
        const { rows } = await poolConnection.query(
            `INSERT INTO machines (name, type) VALUES ($1, $2) RETURNING id`, [this.name, this.type]
        );
        this.id = rows[0].id;
        return this;
    } catch (error) {
        throw error;
    }
};

// Editiere eine bestehende Maschine
Machine.prototype.updateMachine = async function(id) {
    try {
        const { rows } = await poolConnection.query(
            `UPDATE machines SET name = $1, type = $2 WHERE id = $3`, [this.name, this.type, id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

exports.Machine = Machine;
exports.getAllMachines = getAllMachines;

