const express = require('express');
const router = express.Router();
const lotacao=
[   {"id":1,
    "idusu":1,
    "idpat":1,
    "idset":1,
    "idemp":1,},
    {"id":2,
    "idusu":2,
    "idpat":2,
    "idset":2,
    "idemp":2,},
    {"id":3,
    "idusu":3,
    "idpat":3,
    "idset":3,
    "idemp":3,},
    {"id":4,
    "idusu":4,
    "idpat":4,
    "idset":4,
    "idemp":4,},
    {"id":5,
    "idusu":5,
    "idpat":5,
    "idset":5,
    "idemp":5,},
    {"id":6,
    "idusu":6,
    "idpat":6,
    "idset":6,
    "idemp":6,},
    {"id":7,
    "idusu":7,
    "idpat":7,
    "idset":7,
    "idemp":7,},
    {"id":8,
    "idusu":8,
    "idpat":8,
    "idset":8,
    "idemp":8,},
    {"id":9,
    "idusu":9,
    "idpat":9,
    "idset":9,
    "idemp":9,}
]
router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem:"lista de lotação",
        lotacao:lotacao
    })
})
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    let listalotacao=lotacao.filter(value=>value.id==id);
    res.status(200).send({
        mensagem:`lotação com id: ${id}`,
        lotacao:listalotacao
    })
})

router.post('/',(req, res, next)=>{
    let msg=[];
    let i=0;
    const lotacao={
        id: req.body.id,
        idusu: req.body.idusu,
        idpat: req.body.idpat,
        idset: req.body.idset,
        idemp: req.body.idemp
    }
    if (lotacao.id.length==0){
        msg.push({mensagem:"lotacao vazia"})
        i++
    }
    if (lotacao.idusu.length==0){
        msg.push({mensagem:"usuario vazio"})
        i++
    }
    if (lotacao.idpat.length==0){
        msg.push({mensagem:"patrimonio vazio"})
        i++
    }
    if (lotacao.idset.length==0){
        msg.push({mensagem:"setor vazio"})
        i++
    }
    if (lotacao.idemp.length==0){
        msg.push({mensagem:"empresa vazia"})
        i++
    }
    if (i==0){
        res.status(201).send({
            mensagem:"Dados inseridos!",
            lotacaoCriado:lotacao
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
    const {id,idusu,idpat,idset,idemp}= req.body;
    const array_alterar = [{
        id:id,
        idemp:idemp,
        idpat:idpat,
        idset:idset,
        idusu:idusu
    }]
    // let dadosalterados=lotacao.filter(value=>value.id==id);
    if (id.length==0){
        msg.push({mensagem:"lotacao vazia"})
        i++
    }
    if (idusu.length==0){
        msg.push({mensagem:"usuario vazio"})
        i++
    }
    if (idpat.length==0){
        msg.push({mensagem:"patrimonio vazio"})
        i++
    }
    if (idset.length==0){
        msg.push({mensagem:"setor vazio"})
        i++
    }
    if (idemp.length==0){
        msg.push({mensagem:"empresa vazia"})
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
    let dadosdeletados=lotacao.filter(value=>value.id==id);
    let listalotacao=lotacao.filter(value=>value.id!=id);
    res.status(201).send({
        mensagem: "dados apagados",
        dadosnovos:listalotacao,
        deletados:dadosdeletados
    })
})
module.exports = router;