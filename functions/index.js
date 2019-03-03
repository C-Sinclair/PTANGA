const functions = require('firebase-functions')
const express = require('express')
const engines = require('consolidate')

const app = express()
app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600') // for caching on nearest content delivery network node
    response.render('index', {
        articles
    })
})

exports.app = functions.https.onRequest(app)