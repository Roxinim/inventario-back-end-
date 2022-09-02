const express = require('express');
const router = express.Router();
const usuario=
[
    {
        "id":1,
        "nomeusuario":"Carlos",
        "email":"sousamacedo18@gmail.com",
        "senha":"123"
    },
    {
        "id":2,
        "nomeusuario":"Pedro",
        "email":"pedro@gmail.com",
        "senha":"123"
    },
    {
        "id":3,
        "nomeusuario":"João Neto",
        "email":"joaoneto@gmail.com",
        "senha":"123"
    },
    {
        "id":4,
        "nomeusuario":"Iarly",
        "email":"iarly@gmail.com",
        "senha":"123"
    },
    {
        "id":5,
        "nomeusuario":"Naiany",
        "email":"naiany@gmail.com",
        "senha":"123"
    },
    {
        "id":6,
        "nomeusuario":"Filipe",
        "email":"filipe@gmail.com",
        "senha":"123"
    },
    {
        "id":7,
        "nomeusuario":"Ray",
        "email":"ray@gmail.com",
        "senha":"123"
    },
    {
        "id":8,
        "nomeusuario":"Max",
        "email":"max@gmail.com",
        "senha":"123"
    },
    {
        "id":9,
        "nomeusuario":"Gabriela",
        "email":"gabriela@gmail.com",
        "senha":"123"
    }
]
function validacaoEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem:"lista de usuarios",
        usuario:usuario
    })
})
router.get('/:id',(req,res,next)=>{
    const {id} = req.params.id;
    let listausuario=usuario.filter(value=>value.id==id);
    res.status(200).send({
        mensagem:`usuarios com id:${id}`,
        usuario:listausuario
    })
})

router.post('/',(req, res, next)=>{
    let msg=[];
    let i=0;
    const usuario={
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
    }
    if (usuario.nome.length<3){
        msg.push({mensagem:"usuario muito curto"})
        i++
    }
    if (validacaoEmail(usuario.email)==false){
        msg.push({mensagem:"E-mail inválido!"})
        i++
    }
    if (usuario.senha.length==0){
        msg.push({mensagem:"Preencha a senha!"})
        i++
    }
    if (i==0){
        res.status(201).send({
            mensagem:"Dados inseridos!",
            usuarioCriado:usuario
        })
    }else{
        res.status(400).send({
            mensagem:msg
        })
    }
})
router.patch('/:id',(req,res,next)=>{
    let msg=[];
    let i=0;
    const {id,nome,email,senha}= req.body;
    // let dadosalterados=usuario.filter(value=>value.id==id);
    if (nome.length<3){
        msg.push({mensagem:"usuario muito curto"})
        i++
    }
    if (validacaoEmail(email)==false){
        msg.push({mensagem:"E-mail inválido!"})
        i++
    }
    if (senha.length==0){
        msg.push({mensagem:"Preencha a senha!"})
        i++
    }
    if (i==0){
        res.status(201).send({
            mensagem:"Dados alterados!",
        })
    }else{
        res.status(400).send({
            mensagem:msg
        })
    }
})
router.delete('/:id',(req,res,next)=>{
    const {id} = req.params;
    let dadosdeletados=usuario.filter(value=>value.id==id);
    let listausuario=usuario.filter(value=>value.id!=id);
    res.status(201).send({
        mensagem: "dados apagados",
        dadosnovos:listausuario,
        deletados:dadosdeletados
    })
})
module.exports = router;