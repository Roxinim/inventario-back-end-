const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors=require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const usuarios = require('./routes/routeUser');
const patrimonios = require('./routes/routePatrimony');
const lotacao = require('./routes/routeStocking');
const setores = require('./routes/routeSector');
const empresas = require('./routes/routeEnterprise.js');

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header',
    'Origin, X-Requerested-with, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({});
    }
    next();
})

app.use(morgan('dev'));
app.use("/usuarios",usuarios)
app.use("/patrimonios",patrimonios)
app.use("/lotacao",lotacao)
app.use("/setores",setores)
app.use("/empresas",empresas)
app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
});
// app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));






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
