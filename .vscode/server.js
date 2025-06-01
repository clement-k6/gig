const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Tenant Model
const Tenant = mongoose.model('Tenant', {
  name: String,
  email: String,
  phone: String,
  property: String,
  rentAmount: Number,
  status: { type: String, enum: ['Active', 'Inactive', 'Overdue'] },
  moveInDate: Date,
  notes: String
});

// API Routes
app.get('/api/tenants', async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (search) query.name = { $regex: search, $options: 'i' };
    if (status) query.status = status;
    
    const tenants = await Tenant.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
      
    const count = await Tenant.countDocuments(query);
    
    res.json({ tenants, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tenants', async (req, res) => {
  try {
    const tenant = new Tenant(req.body);
    await tenant.save();
    res.status(201).json(tenant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add PUT and DELETE endpoints similarly...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));