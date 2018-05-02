const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');



mongoose.Promise = global.Promise;

mongoose.connect(config.db, { useMongoClient: true })
      .then(() => {
          console.log('conexion a la base de datos realizada');
          app.listen(config.port, ()=>{
            console.log('SERVER corriendo en el puerto', config.port);
          });
        })
        .catch(err => console.log(err))
