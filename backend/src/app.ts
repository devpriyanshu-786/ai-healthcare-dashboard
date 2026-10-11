import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { mockAnalyze } from './services/aiMock.service'
const app = express()
export const prisma = new PrismaClient()
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }))
app.use(express.json())
app.get('/api/health', (_req, res) => res.json({ status: 'ok', mode: 'demo' }))
app.get('/api/patients', async (req, res) => {
  try {
    const search = String(req.query.search || '')
    const patients = await prisma.patient.findMany({ where: { name: { contains: search } }, orderBy: { createdAt: 'desc' }, take: 50 })
    res.json(patients)
  } catch { res.status(500).json({ error: 'Could not load patients. Have you run the Prisma migration?' }) }
})
app.post('/api/patients', async (req, res) => {
  try {
    const { name, age, gender } = req.body
    if (!name || !Number.isFinite(Number(age)) || !gender) return res.status(400).json({ error: 'name, numeric age, and gender are required' })
    const patient = await prisma.patient.create({ data: { name: String(name), age: Number(age), gender: String(gender) } })
    res.status(201).json(patient)
  } catch { res.status(500).json({ error: 'Could not create patient' }) }
})
app.post('/api/consultations', async (req, res) => {
  try {
    const { patient: patientInput, symptoms } = req.body
    if (!Array.isArray(symptoms) || symptoms.length === 0) return res.status(400).json({ error: 'Provide at least one symptom' })
    const patient = await prisma.patient.create({ data: { name: String(patientInput?.name || 'Demo Patient'), age: Number(patientInput?.age || 28), gender: String(patientInput?.gender || 'Prefer not to say') } })
    const result = mockAnalyze(symptoms.map(String))
    const consultation = await prisma.consultation.create({ data: { patientId: patient.id, symptomsText: symptoms.join(', '), symptoms: JSON.stringify(symptoms), prediction: result.prediction, confidence: result.confidence } })
    res.status(201).json({ patient, consultation, result })
  } catch (e) { console.error(e); res.status(500).json({ error: 'Consultation failed. Ensure the database has been migrated.' }) }
})
app.get('/api/consultations/:id', async (req, res) => {
  try { const record = await prisma.consultation.findUnique({ where: { id: req.params.id }, include: { patient: true, report: true } }); if (!record) return res.status(404).json({ error: 'Not found' }); res.json(record) }
  catch { res.status(500).json({ error: 'Could not load consultation' }) }
})
export default app
