const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
// const patrimonio=
// [
//     {"id":1,
//     "nome":"Patrimônio 1",},
//     {"id":2,
//     "nome":"Patrimônio 2",},
//     {"id":3,
//     "nome":"Patrimônio 3",},
//     {"id":4,
//     "nome":"Patrimônio 4",},
//     {"id":5,
//     "nome":"Patrimônio 5",},
//     {"id":6,
//     "nome":"Patrimônio 6",},
//     {"id":7,
//     "nome":"Patrimônio 7",},
//     {"id":8,
//     "nome":"Patrimônio 8",},
//     {"id":9,
//     "nome":"Patrimônio 9",}
// ]
router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{     
        conn.query(
            "SELECT * FROM `patrimonio` ",
            (error,resultado,field)=>{
                conn.release();
                if (error){
                    res.status(500).send({
                        error:error,
                        response:null
                      })
                }
                res.status(200).send({
                    mensagem:"lista de patrimonios",
                    patrimonio:resultado
                })
            }
            )
    })
    // res.status(200).send({
    //     mensagem:"lista de patrimonios",
    //     patrimonio:patrimonio
    // })
    
})
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    mysql.getConnection((error,conn)=>{
        conn.query(
            "SELECT * FROM `patrimonio` where id=?",[id],
            (error,resultado,field)=>{
                conn.release();
                if (error){
                    res.status(500).send({
                        error:error,
                        response:null
                      })
                }
                res.status(200).send({
                    mensagem:"lista de patrimonios",
                    patrimonio:resultado
                })
            }
            )
    })
    // const {id} = req.params.id;
    // let listapatrimonio=patrimonio.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem:`patrimonios com id: ${id}`,
    //     patrimonio:listapatrimonio
    // })
})

router.post('/',(req, res, next)=>{
    let msg=[];
    let i=0;
    const patrimonio={
        nome: req.body.nome
    }
    if (patrimonio.nome.length<3){
        msg.push({mensagem:"patrimonio muito curto"})
        i++
    }
    if (i===0){
        mysql.getConnection((error,conn)=>{
            conn.query(
                "INSERT INTO `patrimonio`(nome) VALUES(?)",[patrimonio.nome],
                (error,resultado,field)=>{
                    conn.release();
                    if (error){
                        res.status(500).send({
                            error:error,
                            response:null
                    })}
                    res.status(201).send({
                        mensagem:"Cadastro realizado",
                        patrimonio:resultado.insertId
                    })
                }
                )
        })
        // res.status(201).send({
        //     mensagem:"Dados inseridos!",
        //     patrimonioCriado:patrimonio
        // })
    }else{
        res.status(400).send({
            mensagem:msg
        })
    }
})
router.patch('/',(req,res,next)=>{
    let msg=[];
    let i=0;
    const {id,nome}= req.body;
    // let dadosalterados=patrimonio.filter(value=>value.id==id);
    if (nome.length<3){
        msg.push({mensagem:"patrimonio muito curto"})
        i++
    }
    if (i===0){
        mysql.getConnection((error,conn)=>{
            conn.query(
                "UPDATE `patrimonio` set nome=? where id=?",
                [nome,id],
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
                        patrimonio:resultado.insertId
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
            `DELETE FROM patrimonio WHERE id=${id}`,
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
    // let dadosdeletados=patrimonio.filter(value=>value.id==id);
    // let listapatrimonio=patrimonio.filter(value=>value.id!=id);
    // res.status(201).send({
    //     mensagem: "dados apagados",
    //     dadosnovos:listapatrimonio,
    //     deletados:dadosdeletados
    // })
})
module.exports = router;