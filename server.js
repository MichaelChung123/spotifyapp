const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres API'
    })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})



// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const db = require('./queries');
// // const SpotifyWebApi = require('spotify-web-api-node');

// // let spotifyApi = new SpotifyWebApi({
// //   clientId: 'c406ef3bf9c64b7f95f9aa4bcd975af6',
// //   clientSecret: '1ac1d746426743f392d707ca1815a834',
// //   redirectUri: 'http://http://localhost:3000/'
// // });

// // // Get Elvis' albums
// // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
// //   function (data) {
// //     console.log('Artist albums', data.body);
// //   },
// //   function (err) {
// //     console.error(err);
// //   }
// // );


// // create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({
//     express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'
//   });
// });

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

// // console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`));