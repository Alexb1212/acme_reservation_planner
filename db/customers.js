// db/customers.js
const client = require('./client');

const createCustomer = async (name, email) => {
  const { rows } = await client.query(
    'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return rows[0];
};

const fetchCustomers = async () => {
  const { rows } = await client.query('SELECT * FROM customers');
  return rows;
};

module.exports = { createCustomer, fetchCustomers };
