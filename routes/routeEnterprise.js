const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
// const empresa=
// [
//     {"id":1,
//     "nome":"Empresa 1",
//     "responsavel":"Responsável 1",
//     "contato":"+55 (00) 91234-5678"},
//     {"id":2,
//     "nome":"Empresa 2",
//     "responsavel":"Responsável 2",
//     "contato":"+55 (00) 91234-5678"},
//     {"id":3,
//     "nome":"Empresa 3",
//     "responsavel":"Responsável 3",
//     "contato":"+55 (00) 91234-5678"},
//     {"id":4,
//     "nome":"Empresa 4",
//     "responsavel":"Responsável 4",
//     "contato":"+55 (00) 91234-5678"},
//     {"id":5,
//     "nome":"Empresa 5",
//     "responsavel":"Responsável 5",
//     "contato":"+55 (00) 91234-5678"},
//     {"id":6,
//     "nome":"Empresa 6",
//     "responsavel":"Responsável 6",
//     "contato":"+55 (00) 91234-5678"},
//     {"id":7,
//     "nome":"Empresa 7",
//     "responsavel":"Responsável 7",
//     "contato":"+55 (00) 91234-5678"},
//     {"id":8,
//     "nome":"Empresa 8",
//     "responsavel":"Responsável 8",
//     "contato":"+55 (00) 91234-5678"},
//     {"id":9,
//     "nome":"Empresa 9",
//     "responsavel":"Responsável 9",
//     "contato":"+55 (00) 91234-5678"}
// ]
router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{     
        conn.query(
            "SELECT * FROM `empresa` ",
            (error,resultado,field)=>{
                conn.release();
                if (error){
                    res.status(500).send({
                        error:error,
                        response:null
                      })
                }
                res.status(200).send({
                    mensagem:"lista de empresas",
                    empresa:resultado
                })
            }
            )
    })
    // res.status(200).send({
    //     mensagem:"lista de empresas",
    //     empresa:empresa
    // })
})
router.get('/:id',(req,res,next)=>{
    // const {id} = req.params.id;
    // let listaempresa=empresa.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem:`empresas com id: ${id}`,
    //     empresa:listaempresa
    // })
    const id = req.params.id;
    mysql.getConnection((error,conn)=>{
        
        conn.query(
            "SELECT * FROM `empresa` where id=?",[id],
            (error,resultado,field)=>{
                conn.release();
                if (error){
                    res.status(500).send({
                        error:error,
                        response:null
                      })
                }
                res.status(200).send({
                    mensagem:"lista de empresas",
                    empresa:resultado
                })
            }
            )
    })
})

router.post('/',(req, res, next)=>{
    let msg=[];
    let i=0;
    const empresa={
        nome: req.body.nome,
        responsavel: req.body.responsavel,
        contato: req.body.contato
    }
    if (empresa.nome.length<3){
        msg.push({mensagem:"empresa muito curta"})
        i++
    }
    if (empresa.responsavel.length<3){
        msg.push({mensagem:"responsavel muito curto"})
        i++
    }
    if (empresa.contato.length===0){
        msg.push({mensagem:"contato vazio"})
        i++
    }
    if (i===0){
        // res.status(201).send({
        //     mensagem:"Dados inseridos!",
        //     empresaCriado:empresa
        // })
        mysql.getConnection((error,conn)=>{
            conn.query(
                "INSERT INTO `empresa`(nome, responsavel, contato) VALUES(?,?,?)",[empresa.nome,empresa.responsavel,empresa.contato],
                (error,resultado,field)=>{
                    conn.release();
                    if (error){
                        res.status(500).send({
                            error:error,
                            response:null
                    })}
                    res.status(201).send({
                        mensagem:"Cadastro realizado",
                        empresa:resultado.insertId
                    })
                }
                )
        })
    }else{
        res.status(400).send({
            mensagem:msg
        })
    }
})
router.patch('/',(req,res,next)=>{
    let msg=[];
    let i=0;
    const {id,nome,responsavel,contato}= req.body;
    // let dadosalterados=empresa.filter(value=>value.id==id);
    if (nome.length<3){
        msg.push({mensagem:"empresa muito curta"})
        i++
    }
    if (responsavel.length<3){
        msg.push({mensagem:"responsavel muito curto"})
        i++
    }
    if (contato.length===0){
        msg.push({mensagem:"contato vazio"})
        i++
    }
    if (i===0){
        mysql.getConnection((error,conn)=>{
            conn.query(
                "UPDATE `empresa` set nome=?, responsavel=?, contato=? where id=?",
                [nome,responsavel,contato,id],
                (error,resultado,field)=>{
                    conn.release();
                    if (error){
                        res.status(500).send({
                            error:error,
                            response:null
                        })
                    }
                    res.status(201).send({
                        mensagem:"Cadastro realizado",
                        usuario:resultado.insertId
                    })
                }
                )
        })
    }else{
        res.status(400).send({
            mensagem:msg
        })
    }
})
router.delete('/:id',(req,res,next)=>{
    const {id} = req.params;
    mysql.getConnection((error,conn)=>{
        conn.query(
            `DELETE FROM empresa WHERE id=${id}`,
            (error,resultado,field)=>{
                conn.release();
                if (error){
                    res.status(500).send({
                        error:error,
                        response:null
                      })
                }
                res.status(201).send({
                    mensagem:"DELETADO."
                })
            }
            )
    })
    // let dadosdeletados=empresa.filter(value=>value.id==id);
    // let listaempresa=empresa.filter(value=>value.id!=id);
    // res.status(201).send({
    //     mensagem:"dados apagados",
    //     dadosnovos:listaempresa,
    //     deletados:dadosdeletados
    // })
})
module.exports = router;