
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
          'devid:string': {}, // this is the esp32 mac address
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
          'id:string': { pk: true },
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
    /*
    nSQL('users').query('upsert', [{
      email: 'test@test.com',
      name: 'phill',
      password: 'password',
      joined: Date.now()
    }]).exec().then(() => {
      //nSQL('devices').query('delete').where(['id','=','AC1CC4']).exec()
      //nSQL('readings').query('delete').where(['id','=','AC1CC4']).exec()
      
      nSQL('users').query('select').exec().then(rows => {
        console.log(rows)
      })
      */
     /*
      nSQL('devices').query('upsert', [{
        id: '5F0EE8',
        user: '5f872b1c-4139-4208-bc2d-269b7e62ac55',
        otp: '',
        secret: 'c8f17a299f9dfb1ee42dd7d0244357d4',
        sensors: [],
        registered: true
      }]).exec().then(() => {
        nSQL('devices').query('select').exec().then(rows => {
          console.log(rows)
        })
      })
*/
      //nSQL('readings').query('select').exec().then(rows => {
      //  console.log(rows)
      //})
      /*
    })
    */
  })

  app.post('/api/device', function (req, res) {
    // adds a new device (with multiple sensors)
    const id = req.body.id
    const user = req.body.user

    // need to check here to see if the sensor already exists (it shouldn't!)

    const crypto = require('crypto')
    let sum = crypto.createHash('md5').update(id + Date.now())
    const secret = sum.digest('hex')

    nSQL('devices')
      .query('select', ['id', 'sensors', 'registered'])
      .exec()
      .then(() => {
        res.json({ status: 'success', otp: secret })
      })
  })
  app.post('/api/device/register', function (req, res) {
    // device is self-registering
    console.log(req.body)
    const id = req.body.id
    const otp = req.body.otp
    const user = req.body.user
    nSQL('devices')
      .query('select')
      .where([ 'id', '=', id ])
      .exec()
      .then(rows => {
        if (rows.length === 1) {
          const dev = rows[0]
          const crypto = require('crypto')
          let sum = crypto.createHash('md5').update(id + Date.now())
          dev.secret = sum.digest('hex')
          dev.registered = true
          if (dev.user == user && dev.otp === otp) {
            dev.otp = ''
            nSQL('devices')
              .query('upsert', [dev])
              .where([ 'id', '=', id ])
              .exec().then(() => {
                res.json({ secret: dev.secret })
              })
          }
        }
      })
  })

  app.post('/api/reading', function (req, res) {
    console.log(req.body)
    nSQL('devices')
      .query('select').where([ 'id', '=', req.body.id]).exec()
      .then(rows => {
        if (rows.length > 0) {
          const row = rows[0]
          if (row.secret === req.body.secret) {
            // the device ID and user match
            const keys = Object.keys(req.body.readings)
            const now = Date.now()
            keys.forEach(key => {
              nSQL('readings')
                .query('upsert', [{
                  devid: req.body['id'],
                  sensor: key,
                  reading: req.body.readings[key],
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

  app.get('/api/devices', function (req, res) {
    nSQL('devices')
      .query('select', ['id', 'user', 'sensors', 'registered'])
      .exec().then(rows => {
        res.json(rows)
      })
  })

  app.get('/api/readings', function (req, res) {
    nSQL('readings')
      .query('select')
      .orderBy(["date DESC"])
      .limit(20)
      .orderBy(["date ASC"])
      .exec().then(rows => {
        res.json(rows)
      })
  })

  app.get('/api/readings/:device', function (req, res) {
    console.log(req.params.device);
    nSQL('readings')
      .query('select')
      .where(['devid', '=', req.params.device])
      .orderBy(["date DESC"])
      .limit(20)
      .orderBy(["date ASC"])
      .exec().then(rows => {
        res.json(rows)
      })
  })

  app.get('/api/readings/:device/:sensor', function (req, res) {
    nSQL('readings')
      .query('select')
      .where(['devid', '=', req.params.device])
      .where(['sensor', '=', req.params.sensor])
      .orderBy(["date DESC"])
      .limit(20)
      .orderBy(["date ASC"])
      .exec().then(rows => {
        res.json(rows)
      })
  })

}
