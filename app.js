const express = require('express');
const app = express();
const usuarios = require('./routes/routeUser');
const patrimonios = require('./routes/routePatrimony');
const lotacao = require('./routes/routeStocking');
const setores = require('./routes/routeSector');
const empresas = require('./routes/routeEnterprise.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use("/usuarios",usuarios)
app.use("/patrimonios",patrimonios)
app.use("/lotacao",lotacao)
app.use("/setores",setores)
app.use("/empresas",empresas)


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
