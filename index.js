var mongoose  = require('mongoose')
var app = require('./app')
var port = 3700

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/ecommercehooks',{ useNewUrlParser: true,useUnifiedTopology: true})
                    .then(()=>{
                        console.log("successful connection")
                    
                        app.listen(port,()=>{
                            console.log("Server running on the port 3700")
                        })
                                       
                    }).catch(err => console.log(err))