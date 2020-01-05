const express = require("express");
const app = express();
const cors = require("cors"); // (cross orign resource sharing) so any application/api can use it
const CRUDConfigurations = require("./CRUD_Config");

const schemaRoute = require('./routes/Schema');
const projectRoute = require('./routes/Project');

// app.use(express.json({
//   inflate: true,
//   limit: '100kb',
//   reviver: null,
//   strict: true,
//   type: 'application/json',
//   verify: undefined
// }));
app.use(express.json());
app.options("*", cors());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "<center><h1>Welcome to CRUD Generator API</h1><center/><br>"+
    "<h3><a href='http://localhost:4000/api/schema'>Your table scheema is here...</a></h3>"+
    "<h3><a href='http://localhost:4000/api/project/get'>Download Your CRUD...</a></h3>"+
    "<h3><a href='http://localhost:4000/api/project/remove'>Remove the CRUD Generated...</a></h3>"+
    "<h3><a href='http://localhost:4000/api/project/accessFiles/"+CRUDConfigurations.ProjectFolderName+"'>Click here to see your CRUD Files content by name...</a></h3>"
  );
});

app.use('/api/schema', schemaRoute);
app.use('/api/project', projectRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}...`));


