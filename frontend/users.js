const fetch = require('node-fetch')
const jsonServer = require('json-server')
const auth = require('json-server-auth')
const fsp = require('fs')

const users = [
  {
    username: 'Aku Ankka',
    email: 'aku.ankka@email.com',
    password: 'salasana',
    // group: ['Admin'],
  },
  {
    username: 'Pasi Anssi',
    email: 'pasi.anssi@email.com',
    password: 'salaisuus',
    // group: ['Group 1'],
  },
  {
    username: 'Hessu Hopo',
    email: 'hessu@email.com',
    password: 'salainen',
    // group: ['Group 2'],
  },
]

const createUsers = async (server) => {
  await Promise.all(
    users.map(async (u) => {
      const r = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(u),
      })
      const j = await r.json()
      console.log(`User ${j.user.username} created 😀`)
    })
  )
  server.close()
}

fsp.writeFileSync('./db.json', '{"users": []}')
const app = jsonServer.create()
const router = jsonServer.router('db.json')
app.db = router.db
app.use(auth)
app.use(router)
const server = app.listen(3000)
createUsers(server)
