const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── In-Memory "Database" ─────────────────────────────────────────────────────
const reservations = [];
const menuItems = require('./data/menu.js');

// ─── Page Routes ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'public', 'menu.html')));
app.get('/dish/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dish.html')));
app.get('/reservations', (req, res) => res.sendFile(path.join(__dirname, 'public', 'reservations.html')));

// ─── API: Menu ───────────────────────────────────────────────────────────────
app.get('/api/menu', (req, res) => {
  res.json({ success: true, data: menuItems });
});

app.get('/api/menu/:id', (req, res) => {
  const item = menuItems.find(m => m.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Dish not found.' });
  res.json({ success: true, data: item });
});

// ─── API: Reservations ───────────────────────────────────────────────────────
app.get('/api/reservations', (req, res) => {
  res.json({ success: true, data: reservations });
});

app.post(
  '/api/reservations',
  [
    body('name').trim().notEmpty().withMessage('Full name is required.'),
    body('phone').trim().notEmpty().withMessage('Phone number is required.'),
    body('date').notEmpty().withMessage('Date is required.'),
    body('time').notEmpty().withMessage('Time slot is required.'),
    body('guests').notEmpty().withMessage('Guest count is required.'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('A valid email is required.'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, phone, email, date, time, guests, occasion, requests } = req.body;
    const referenceId = 'UN-' + Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Math.random().toString(36).substr(2, 2).toUpperCase();

    const reservation = {
      id: uuidv4(),
      referenceId,
      name,
      phone,
      email: email || null,
      date,
      time,
      guests,
      occasion: occasion || 'Casual Dining',
      requests: requests || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    reservations.push(reservation);
    console.log(`[RESERVATION] ${referenceId} — ${name}, ${guests} guests on ${date} @ ${time}`);

    res.status(201).json({ success: true, data: reservation });
  }
);

// ─── API: Newsletter Subscription ────────────────────────────────────────────
const subscribers = [];
app.post(
  '/api/subscribe',
  [body('email').isEmail().withMessage('A valid email address is required.')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email } = req.body;
    if (subscribers.includes(email)) {
      return res.json({ success: true, message: 'You are already subscribed to the Inner Circle.' });
    }
    subscribers.push(email);
    console.log(`[SUBSCRIBE] ${email}`);
    res.json({ success: true, message: 'Welcome to the Inner Circle.' });
  }
);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🐉 UNCLE Imperial Dining`);
  console.log(`   Server running → http://localhost:${PORT}`);
  console.log(`   Env: ${process.env.NODE_ENV || 'development'}\n`);
});
