const express = require("express");
const mongoose = require("mongoose");
const createService = require("./services/sampleRecord");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require('./config.js')

const authRoute = require('./routes/auth');
const ProductsRoute = require("./routes/Products");
const CategorysRoute = require("./routes/Categorys");
const OrdersRoute = require("./routes/Orders");
const StatussRoute = require("./routes/Statuss");
const CustomersRoute = require("./routes/Customers");
const SupliersRoute = require("./routes/Supliers");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Your API ENDPOINTS
app.use('/api/user',authRoute);
app.use("/api/products", ProductsRoute);
app.use("/api/categorys", CategorysRoute);
app.use("/api/orders", OrdersRoute);
app.use("/api/statuss", StatussRoute);
app.use("/api/customers", CustomersRoute);
app.use("/api/supliers", SupliersRoute);

//YOUR DATABASE WITH A SAMPLE RECORD
mongoose
  .connect(config.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to your MongoDB."))
  .catch(err => {
    console.log("Failed to connected to DB Error: "+ err.message);
  });

  let createServiceObj = null;
  createServiceObj = createService.getInstance();
  createServiceObj.createSampleUser();
  app.listen(5000,()=> console.log('listening on port 5000'));
