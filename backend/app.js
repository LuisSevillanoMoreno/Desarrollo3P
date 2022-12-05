const path = require('path');
const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts")
const hotelRoutes = require("./routes/hoteles")
const reservacionesRoutes = require("./routes/reservaciones")
const app = express();

mongoose.connect("mongodb+srv://LuisSevillano:9lS2F5Zyfd8n4M84@cluster0.xrr9h5x.mongodb.net/proyecto_DB?retryWrites=true&w=majority")
.then(()=>{
  console.log('Base de datos conectada');
})
.catch(()=>{
  console.log('Conexión fallida');
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",  "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();

});

app.use("/api.posts", postRoutes);
app.use("/api.hoteles", hotelRoutes);
app.use("/api.reservaciones", reservacionesRoutes);

/*
app.delete('/api.posts/:id',(req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Publicación eliminada'})
  })
})*/

module.exports = app;
