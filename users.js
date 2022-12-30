const fetch = require('node-fetch')
const fsp = require('fs').promises

const users = [
  {
    username: 'Aku Ankka',
    email: 'aku.ankka@email.com',
    password: 'salasana',
    group: ['Admin'],
  },
  {
    username: 'Pasi Anssi',
    email: 'pasi.anssi@email.com',
    password: 'salaisuus',
    group: ['Group 1'],
  },
  {
    username: 'Hessu Hopo',
    email: 'hessu@email.com',
    password: 'salainen',
    group: ['Group 2'],
  },
]

const createUsers = () => {
  fsp.writeFile('./db.json', '{"users": []}')
  setTimeout(() => {
    users.map(async (u) => {
      const r = fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(u),
      })
      const j = await r.json()
      console.log(j)
    })
  }, 3000) // wait for json-server to notice change in db.json ...
}

createUsers()
