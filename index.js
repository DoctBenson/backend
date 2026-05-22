const express = require('express')
const app =express()
const port = 3000

app.use(express.json())

let skills = [
  {id: 1, name: 'HTML', level: 'Confident'},
  {id: 2, name: 'CSS', level: 'Confident'},
  {id: 3, name: 'JavaScript', level: 'Learning'},
  {id: 4, name: 'React', level: 'Learning'},
  {id: 5, name: 'Node.js', level: 'Learning'},  
]

app.get('/', (req, res) => {
  res.send('Hello from your first server')

})

app.get('/about', (req, res) => {
  res.send('This is Benson Daniel- Full Stack Developer in training')
})

app.get('/skills', (req, res) => {
  res.json(skills)

})

app.post('/skills', (req, res) => {
  const newSkill = {
    id: skills.length + 1,
    name: req.body.name,
    level: req.body.level
  }
  skills.push(newSkill)
  res.json(newSkill)

})

app.delete('/skills/:id', (req, res) => {
  const id = parseInt(req.params.id)
  skills = skills.filter((skill) => skill.id !== id)
  res.json({message: 'Skill deleted sucessfully'})

})

app.put('/skills/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const skill = skills.find((skill) => skill.id === id) 

  if (!skill) {
    return res.status(404).json({message: 'Skill not found'})

  }

  skill.name = req.body.name || skill.name
  skill.level = req.body.level || skill.level
  res.json(skill)

})




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)

})