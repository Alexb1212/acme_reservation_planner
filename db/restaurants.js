// db/restaurants.js
const client = require('./client');

const createRestaurant = async (name, address) => {
  const { rows } = await client.query(
    'INSERT INTO restaurants (name, address) VALUES ($1, $2) RETURNING *',
    [name, address]
  );
  return rows[0];
};

const fetchRestaurants = async () => {
  const { rows } = await client.query('SELECT * FROM restaurants');
  return rows;
};

module.exports = { createRestaurant, fetchRestaurants };
