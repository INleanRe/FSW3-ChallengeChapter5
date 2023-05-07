// import atau panggil package yang kita mau pake di aplikasi kita
const express = require('express');
const path = require("path");
const routes = require('./routes');

// yang bantu upload file
// const imagekit = require('./lib/imagekit')
// const upload = require('./middleware/uploader')

// framework utk http server
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// proses baca json 

// setting view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// public
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "controller")))

// url utama dari aplikasi
// req = request 
// res = response
// app.get('/', (req, res) => {
//     res.send('Hello FSW 3 yang luar biasa dari server nih !');
// })
// kenangan jaman kapan 
// app.get('/', (req, res) => {
//     res.render("index", {
//         name: 'Bagus',
//         status: 'tanda tanya',
//         title: 'Hello FSW 3 yang luar biasa dari client side nih !'
//     })
// })
app.use(routes);

// memulai server nya
app.listen(PORT, () => {
    console.log(`App running on Localhost: ${PORT}`)
})