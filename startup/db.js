const { Pool } = require('pg');

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
});
  

module.exports = function() {
    ;(function() {
        client = pool; // Scheiß Name, weil Rolle des Dings im Verhältnis zu meiner DB benannt ist (statt im Verhältnis zum Rest meiner App)
    })()
};

// Reinitialisierungsmechanismus
// pool.query nur Zwischenlösung, client name noch ändern