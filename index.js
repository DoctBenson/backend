const fetch = require('node-fetch')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const BIN_ID = '6a167b23f47d5c455c3bb8e1'
const API_KEY = '$2a$10$sDE872VFaBW.x8Mki5rxhOE5jripkeDCnauEq17wzBiTElpgRrNdO'
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`

// GET all skills
app.get('/skills', async (req, res) => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        'X-Master-Key': API_KEY
      }
    })
    const data = await response.json()
    console.log('Data from JSONBin:', data)
    res.json(data.record.skills)
  } catch (err) {
    console.log('Full error:', err)
    res.status(500).json({ message: 'Error fetching skills' })
  }
})

// POST a new skill
app.post('/skills', async (req, res) => {
  try {
    const response = await fetch(BASE_URL, {
      headers: { 'X-Master-Key': API_KEY }
    })
    const data = await response.json()
    const skills = data.record.skills
    const newSkill = {
      id: skills.length + 1,
      name: req.body.name,
      level: req.body.level
    }
    skills.push(newSkill)
    await fetch(BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify({ skills })
    })
    res.json(newSkill)
  } catch (err) {
    res.status(500).json({ message: 'Error adding skill' })
  }
})

// DELETE a skill
app.delete('/skills/:id', async (req, res) => {
  try {
    const response = await fetch(BASE_URL, {
      headers: { 'X-Master-Key': API_KEY }
    })
    const data = await response.json()
    const skills = data.record.skills.filter(
      skill => skill.id !== parseInt(req.params.id)
    )
    await fetch(BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify({ skills })
    })
    res.json({ message: 'Skill deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting skill' })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})