const express = require('express');
const app = express();
const patrimonio = require('./routes/route');
const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use("/patrimonio",patrimonio)


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Origin, X-Requerested-with, Content-Type, Accept, Authorization',)
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','')
        return res.status(200).send({});
    }
    next();
})



app.use((req,res,next)=>{
    const erro = new Error("Não encontrado!")
    error.status(404)
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    return res.json({
        erro:{
            mensagem:error.message
        }
    })
})
module.exports = app;
