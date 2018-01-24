var express = require('express')
var app = express()
var router = express.Router()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

let heroes = [{
  id: 0,
  name: "Hayabusa",
  type: "assassin"
}, {
  id: 1,
  name: "Roger",
  type: "fighter"
}, {
  id: 2,
  name: "Miya",
  job: "marksman"
}, {
  id: 3,
  name: "Hilda",
  job: "tank"
}]

// SAVE NEW ITEM
const saveNewItems = (items, data) => {
  items.push(data)
}


// DISPLAY HEROES
app.get('/', function(req, res) {
  res.send(heroes)
})

// GET ITEM BY ID
const getItemById = (items, id) => {
  const item = items.filter(item => {
    return item.id === Number(id)
  })
  return item
}

// DISPLAY SINGLE HERO
app.get("/items/:id", (req, res) => {
  // message: `get single hero`,
  const item = getItemById(heroes, req.params.id);
  res.send(item);
});

// SAVE NEW HERO
app.post("/", (req, res) => {
  const data = {
    id: heroes.length,
    name: req.body.name,
    type: req.body.type
  }
  saveNewItems(heroes, data)
  res.send(heroes)
})

// DELETE 1 HERO
app.delete("/items/:id", (req, res) => {
  const currentHeroes = heroes.filter(hero => {
    return hero.id !== Number(req.params.id)
  })
  heroes = currentHeroes
  res.send({
    message: 'Hero deleted',
    currentHeroes: heroes
  })
})

var server = app.listen(3000, function() {
  console.log('Server running at http://localhost:' + server.address().port)
})