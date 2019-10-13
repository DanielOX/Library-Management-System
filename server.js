if(process.env.NODE_ENV !== "production")
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')

// Scaffolding

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))



// Database Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})

const db = mongoose.connection
db.once('open',() => console.log('connected to mongoose'))


db.on('error',(error) => console.log(error))






// Controllers

app.use('/',indexRouter)


// Start Server

const port = process.env.PORT || 3000
app.listen(port, (err) => console.log(err ? err : 'Server Running on port :' +port )  )
