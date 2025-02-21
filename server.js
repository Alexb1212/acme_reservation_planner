// server.js
const express = require('express');
const { createCustomer, fetchCustomers } = require('./db/customers');
const { createRestaurant, fetchRestaurants } = require('./db/restaurants');
const { createReservation, destroyReservation } = require('./db/reservations');

const app = express();
app.use(express.json());

// GET /api/customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await fetchCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// GET /api/restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await fetchRestaurants();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// POST /api/customers/:id/reservations
app.post('/api/customers/:id/reservations', async (req, res) => {
  const { id } = req.params;
  const { restaurant_id, reservation_date, party_count } = req.body;
  
  try {
    const reservation = await createReservation(id, restaurant_id, reservation_date, party_count);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create reservation' });
  }
});

// DELETE /api/customers/:customer_id/reservations/:id
app.delete('/api/customers/:customer_id/reservations/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await destroyReservation(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});