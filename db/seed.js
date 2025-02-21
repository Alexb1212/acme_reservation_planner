// db/seed.js
const client = require('./client');
const customers = require('./customers');
const restaurants = require('./restaurants');
const reservations = require('./reservations');

const dropTables = async () => {
  try {
    await client.query('DROP TABLE IF EXISTS reservations, restaurants, customers');
    console.log('Tables dropped successfully');
  } catch (err) {
    console.error('Error dropping tables', err);
  }
};

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        email VARCHAR(30)
      );
      
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        address VARCHAR(255)
      );
      
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customers(id),
        restaurant_id INT REFERENCES restaurants(id),
        reservation_date DATE,
        party_count INT
      );
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err);
  }
};

module.exports = { createTables, dropTables };