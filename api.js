
module.exports = app => {
  const bodyParser = require('body-parser')
  app.use(bodyParser.json())

  const nSQL = require('@nano-sql/core').nSQL;

  nSQL().createDatabase({
    id: 'sensor',
    mode: 'PERM',
    tables: [
      {
        name: 'users',
        model: {
          'id:uuid': { pk: true, ai: true },
          'email:string': { }, // this is the esp32 mac address
          'name:string': {}, // this is the sensor attached (0-2)
          'password:string': {},
          'joined:int': {}
        },
        indexes: {
        }
      },
      {
        name: 'readings',
        model: {
          'id:uuid': { pk: true, ai: true },
          'uuid:string': {}, // this is the esp32 mac address
          'sensor:string': {}, // this is the sensor attached (0-2)
          'date:int': {},
          'reading:obj': {
            model: {
              'temperature:float': {},
              'humidity:float': {}
            }
          }
        },
        indexes: {
          'addr:string[]': {},
          'reading.temperature:float': {},
          'reading.humidity:float': {},
          'date:int[]': {}
        }
      },
      {
        name: 'devices',
        model: {
          'id:uuid': { pk: true },
          'user:string': {},
          'otp:string': {},
          'secret:string': {},
          'added:int': {},
          'sensors:array': [],
          'registered:bool': {}
        }
      }
    ],
  }).then(() => {
    //nSQL('users').query('upsert', [{
    //  email: 'test@test.com',
    //  name: 'phill',
    //  password: 'password',
    //  joined: Date.now()
    //}]).exec().then(() => {
      nSQL('users').query('select').exec().then(rows => {
        console.log(rows)
      })
      nSQL('devices').query('select').exec().then(rows => {
        console.log(rows)
      })
    //})
  })

  app.post('/api/device', function (req, res) {
    console.log(req.body)
    // adds a new device (with multiple sensors)
    const id = req.body.id
    const user = req.body.user

    // need to check here to see if the sensor already exists (it shouldn't!)

    const crypto = require('crypto')
    let sum = crypto.createHash('md5').update(id + Date.now())
    const secret = sum.digest('hex')

    nSQL('devices').query('upsert', [{
      id: id,
      user: user,
      otp: secret,
      secret: '',
      sensors: [],
      registered: false
    }]).exec().then(() => {
      res.json({ user: user, otp: secret })
    })
  })
  app.post('/api/device/register', function (req, res) {
    // device is self-registering
    const id = req.body.id
    const otp = req.body.otp
    nSQL('devices')
      .query('select', [ 'devices' ])
      .where([ 'id', '=', id ])
      .exec()
      .then(rows => {
        if (rows.length === 1) {
          const dev = rows[0]
          const crypto = require('crypto')
          let sum = crypto.createHash('md5').update(id + Date.now())
          dev.secret = sum.digest('hex')
          if (dev.otp === otp) {
            dev.otp = ''
            nSQL('devices')
              .query('update', [dev])
              .where([ 'id', '=', id ])
              .exec().then(() => {
                res.json({ secret: secret })
              })
          }
        }
      })
  })

  app.post('/api/reading', function (req, res) {
    console.log(req.body)
    nSQL('devices')
      .query('select', [ 'devices' ]).where([ 'id', '=', req.body.id]).exec()
      .then(rows => {
        if (rows.length > 0) {
          const row = rows[0]
          if (row.secret === req.body.secret) {
            // the device ID and user match
            const keys = Object.keys(req.body)
            const now = Date.now()
            keys.forEach(key => {
              nSQL('readings')
                .query('upsert', [{
                  id: req.body['id'],
                  sensor: key,
                  reading: req.body[key],
                  date: now
                }])
                .exec()
            })
            res.json({ 'state': 'success' })
          } else {
            res.json({ 'state': 'failed', 'message': 'unauthorized' })
          }
        }
      })
  })

  app.get('/api/latest', function (req, res) {
    nSQL('readings').query('select').exec().then(rows => {
      res.json(rows)
    })
  })

}