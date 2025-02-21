// db/reservations.js
const client = require('./client');

const createReservation = async (customer_id, restaurant_id, reservation_date, party_count) => {
  const { rows } = await client.query(
    'INSERT INTO reservations (customer_id, restaurant_id, reservation_date, party_count) VALUES ($1, $2, $3, $4) RETURNING *',
    [customer_id, restaurant_id, reservation_date, party_count]
  );
  return rows[0];
};

const destroyReservation = async (reservation_id) => {
  await client.query('DELETE FROM reservations WHERE id = $1', [reservation_id]);
};

module.exports = { createReservation, destroyReservation };
