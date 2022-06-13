'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const detailRoutes = require('./routes/productDetailRoutes');

const app = express();

//app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', productRoutes.routes);
app.use('/api', categoryRoutes.routes);
app.use('/api', detailRoutes.routes);



app.listen(config.port, () => {
  console.log('app listening on url http://localhost:' + config.port )
});