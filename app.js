const express = require("express");
const dngRoutes = require("./routes/products");
const bodyParser = require("body-parser");
const axios = require('axios');
require('dotenv').config();
const app = express();

const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/products", dngRoutes);
app.set('view engine', 'ejs');

app.get('/',async function(req, res) {
  const rootUrl = `http://${req.get('host')}`;
  var data=await axios.get(`${rootUrl}/api/products/getall`);
  //console.log(data.data.Items);
  res.render('index.ejs',{
    Datatbl : data.data.Items,
    rurl: rootUrl
  });
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
