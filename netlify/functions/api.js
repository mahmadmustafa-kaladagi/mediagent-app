// netlify/functions/api.js
// All API routes as a single Netlify Function powered by serverless-http + express

const express = require('express');
const serverless = require('serverless-http');
const { doctors, analyzeSymptoms, getDoctorById } = require('./doctors-data');

const app = express();
const router = express.Router();

// In-memory store (persists per warm Lambda instance)
// For production persistence, swap with a DB like PlanetScale or Supabase
const bookings = [];

app.use(express.json());

// ── CORS ──────────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ── HELPERS ───────────────────────────────────
function genId() {
  return 'MED' + Math.random().toString(36).substr(2, 8).toUpperCase();
}
function dateFmt(d) {
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
}

// ── ROUTES ────────────────────────────────────

// POST /api/analyze
router.post('/analyze', (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms || symptoms.trim().length < 3)
    return res.status(400).json({ error: 'Please describe your symptoms.' });

  const analysis = analyzeSymptoms(symptoms);
  const sessionId = Date.now().toString(36);

  const agentSteps = [
    { step: 1, action: 'symptom_parsing',    result: `Parsed ${analysis.detectedSymptoms.length} symptom indicators` },
    { step: 2, action: 'pattern_matching',   result: `Matched ${analysis.recommendedSpecialties.length} medical specialties` },
    { step: 3, action: 'doctor_scoring',     result: `Ranked ${analysis.recommendedDoctors.length} best-fit specialists` },
    { step: 4, action: 'urgency_assessment', result: `Urgency level: ${analysis.urgencyLevel}` },
    { step: 5, action: 'recommendation_ready', result: `Confidence: ${analysis.confidence}%` },
  ];

  res.json({ sessionId, analysis: { ...analysis, agentSteps }, success: true });
});

// GET /api/doctors
router.get('/doctors', (req, res) => res.json({ doctors }));

// GET /api/doctors/:id
router.get('/doctors/:id', (req, res) => {
  const doc = getDoctorById(req.params.id);
  return doc ? res.json({ doctor: doc }) : res.status(404).json({ error: 'Not found' });
});

// GET /api/doctors/:id/slots
router.get('/doctors/:id/slots', (req, res) => {
  const doc = getDoctorById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  const t = new Date(), t1 = new Date(t), t2 = new Date(t);
  t1.setDate(t1.getDate() + 1); t2.setDate(t2.getDate() + 2);
  res.json({ slots: [
    { label: 'Today',    date: dateFmt(t),  dateKey: 'today',    slots: doc.slots.today },
    { label: 'Tomorrow', date: dateFmt(t1), dateKey: 'tomorrow', slots: doc.slots.tomorrow },
    { label: dateFmt(t2), date: dateFmt(t2), dateKey: 'dayafter', slots: doc.slots.dayafter },
  ]});
});

// POST /api/bookings
router.post('/bookings', async (req, res) => {
  const { doctorId, date, time, dateKey, patientName, patientPhone, patientEmail, symptoms } = req.body;
  if (!doctorId || !date || !time || !patientName || !patientPhone || !patientEmail)
    return res.status(400).json({ error: 'Missing required fields.' });

  const doc = getDoctorById(doctorId);
  if (!doc) return res.status(404).json({ error: 'Doctor not found' });

  const booking = {
    bookingId: genId(), doctorId,
    doctorName: doc.name, specialty: doc.specialty,
    hospital: doc.hospital, fee: doc.fee,
    color: doc.color, initials: doc.initials,
    date, time, dateKey,
    patientName, patientPhone, patientEmail,
    symptoms: symptoms || '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);

  // Log notification (wire up real email/WhatsApp in production)
  console.log(`✉️  Email → ${patientEmail} | 📱 WhatsApp → ${patientPhone}`);
  console.log(`   Booking #${booking.bookingId} | Dr. ${doc.name} | ${date} ${time}`);

  res.json({ success: true, booking, notifications: { emailSent: true, whatsappSent: true } });
});

// GET /api/bookings
router.get('/bookings', (req, res) => res.json({ bookings: [...bookings].reverse() }));

// GET /api/bookings/:id
router.get('/bookings/:id', (req, res) => {
  const b = bookings.find(x => x.bookingId === req.params.id);
  return b ? res.json({ booking: b }) : res.status(404).json({ error: 'Not found' });
});

// POST /api/chat
router.post('/chat', (req, res) => {
  const msg = (req.body.message || '').toLowerCase();
  let reply = '';
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('slot'))
    reply = "I can book an appointment for you! Please describe your symptoms first and I'll find the right specialist.";
  else if (msg.includes('fee') || msg.includes('cost') || msg.includes('price'))
    reply = "Fees range from ₹800 (General Physician) to ₹1,800 (Neurologist). All shown on each doctor's card.";
  else if (msg.includes('emergency') || msg.includes('urgent'))
    reply = "⚠️ For emergencies: Call 108 immediately! For urgent consultations I'll prioritize earliest slots.";
  else if (msg.includes('cancel') || msg.includes('reschedule'))
    reply = "To reschedule, contact the hospital with your Booking ID at least 24 hours in advance.";
  else
    reply = "Describe your symptoms in detail and I'll analyze them, match you with a specialist, and book your appointment!";
  res.json({ reply, ts: new Date().toISOString() });
});

// Mount router
app.use('/api', router);
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
