const express = require('express');
const router = express.Router();
const setor=
[
    {"id":1,
    "nome":"Setor 1",},
    {"id":2,
    "nome":"Setor 2",},
    {"id":3,
    "nome":"Setor 3",},
    {"id":4,
    "nome":"Setor 4",},
    {"id":5,
    "nome":"Setor 5",},
    {"id":6,
    "nome":"Setor 6",},
    {"id":7,
    "nome":"Setor 7",},
    {"id":8,
    "nome":"Setor 8",},
    {"id":9,
    "nome":"Setor 9",}
]
router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem:"lista de setores",
        setor:setor
    })
})
router.get('/:id',(req,res,next)=>{
    const {id} = req.params.id;
    let listasetor=setor.filter(value=>value.id==id);
    res.status(200).send({
        mensagem:`setores com id: ${id}`,
        setor:listasetor
    })
})

router.post('/',(req, res, next)=>{
    let msg=[];
    let i=0;
    const setor={
        nome: req.body.nome
    }
    if (setor.nome.length<3){
        msg.push({mensagem:"setor muito curto"})
        i++
    }
    if (i==0){
        res.status(201).send({
            mensagem:"Dados inseridos!",
            setorCriado:setor
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
    const {id,nome}= req.body;
    // let dadosalterados=setor.filter(value=>value.id==id);
    if (nome.length<3){
        msg.push({mensagem:"setor muito curto"})
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
    let dadosdeletados=setor.filter(value=>value.id==id);
    let listasetor=setor.filter(value=>value.id!=id);
    res.status(201).send({
        mensagem: "dados apagados",
        dadosnovos:listasetor,
        deletados:dadosdeletados
    })
})
module.exports = router;