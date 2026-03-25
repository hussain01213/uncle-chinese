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
// Keep menu as a mutable array so admin changes survive across requests
const menuItems = require('./data/menu.js');

// ─── Page Routes ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/menu', (req, res) => res.sendFile(path.join(__dirname, 'public', 'menu.html')));
app.get('/dish/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dish.html')));
app.get('/reservations', (req, res) => res.sendFile(path.join(__dirname, 'public', 'reservations.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

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

// ─────────────────────────────────────────────────────────────────────────────
// ─── ADMIN API ────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────

// In-memory session tokens
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'uncle2024';
const adminSessions = new Set();

function generateToken() {
  return uuidv4().replace(/-/g, '');
}

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;
  if (!token || !adminSessions.has(token)) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }
  next();
}

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = generateToken();
    adminSessions.add(token);
    console.log('[ADMIN] Login successful');
    res.json({ success: true, token });
  } else {
    console.log('[ADMIN] Failed login attempt');
    res.status(403).json({ success: false, message: 'Incorrect password.' });
  }
});

// Admin Logout
app.post('/api/admin/logout', requireAdmin, (req, res) => {
  const token = req.headers['x-admin-token'];
  adminSessions.delete(token);
  res.json({ success: true, message: 'Logged out.' });
});

// Admin — Get all menu items (including unavailable)
app.get('/api/admin/menu', requireAdmin, (req, res) => {
  res.json({ success: true, data: menuItems });
});

// Admin — Add new dish
app.post('/api/admin/menu', requireAdmin, (req, res) => {
  const { name, category, description, price, prepTime, spiceLevel, image, badge, badgeType, available, availabilityNote } = req.body;
  if (!name || !category || !description) {
    return res.status(400).json({ success: false, message: 'Name, category, and description are required.' });
  }
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const finalId = menuItems.find(m => m.id === slug) ? slug + '-' + Date.now() : slug;

  const newDish = {
    id: finalId,
    category,
    name,
    description,
    price: price ? Number(price) : null,
    prepTime: prepTime || null,
    spiceLevel: spiceLevel !== undefined ? Number(spiceLevel) : 0,
    image: image || null,
    badge: badge || null,
    badgeType: badgeType || null,
    available: available !== false && available !== 'false',
    availabilityNote: availabilityNote || null,
    reviews: [],
  };
  menuItems.push(newDish);
  console.log(`[ADMIN] Added dish: ${newDish.name}`);
  res.status(201).json({ success: true, data: newDish });
});

// Admin — Update dish
app.put('/api/admin/menu/:id', requireAdmin, (req, res) => {
  const idx = menuItems.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Dish not found.' });

  const allowed = ['name', 'category', 'description', 'price', 'prepTime', 'spiceLevel', 'image', 'badge', 'badgeType', 'available', 'availabilityNote'];
  allowed.forEach(field => {
    if (req.body[field] !== undefined) {
      if (field === 'price') menuItems[idx][field] = req.body[field] ? Number(req.body[field]) : null;
      else if (field === 'spiceLevel') menuItems[idx][field] = Number(req.body[field]);
      else if (field === 'available') menuItems[idx][field] = req.body[field] !== false && req.body[field] !== 'false';
      else menuItems[idx][field] = req.body[field];
    }
  });
  console.log(`[ADMIN] Updated dish: ${menuItems[idx].name}`);
  res.json({ success: true, data: menuItems[idx] });
});

// Admin — Toggle availability quickly
app.patch('/api/admin/menu/:id/availability', requireAdmin, (req, res) => {
  const item = menuItems.find(m => m.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Dish not found.' });
  const { available, availabilityNote } = req.body;
  item.available = available !== false && available !== 'false';
  item.availabilityNote = availabilityNote || null;
  console.log(`[ADMIN] ${item.name} → ${item.available ? 'Available' : 'Unavailable'}`);
  res.json({ success: true, data: item });
});

// Admin — Delete dish
app.delete('/api/admin/menu/:id', requireAdmin, (req, res) => {
  const idx = menuItems.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Dish not found.' });
  const removed = menuItems.splice(idx, 1)[0];
  console.log(`[ADMIN] Deleted dish: ${removed.name}`);
  res.json({ success: true, message: `"${removed.name}" has been removed from the menu.` });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🐉 UNCLE Imperial Dining`);
  console.log(`   Server running → http://localhost:${PORT}`);
  console.log(`   Admin panel  → http://localhost:${PORT}/admin`);
  console.log(`   Admin pass   → ${ADMIN_PASSWORD}`);
  console.log(`   Env: ${process.env.NODE_ENV || 'development'}\n`);
});
