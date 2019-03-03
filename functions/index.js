const functions = require('firebase-functions')
const firebase = require('firebase-admin')
const express = require('express')
const engines = require('consolidate')

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
)

function getArticles() {
    const ref = firebaseApp.database().ref('articles')
    return ref.once('value').then(snap => snap.val())
}

const app = express()
app.engine('hbs', engines.handlebars)
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600') // for caching on nearest content delivery network node
    getArticles().then(articles => {
        response.render('index', {
            articles
        })
        return console.log(articles)
    }).catch(e => {
        console.log(e)
        response.sendStatus(404)
    })
})

exports.app = functions.https.onRequest(app)