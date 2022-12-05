const express = require("express")
const Reservacion = require('../models/reservacion');

const router = express.Router();

router.post("", (req, res, next)=>{
  const reservacion = new Reservacion({
    title: req.body.title,
    solicitante: req.body.solicitante,
    habitaciones: req.body.habitaciones,
    direccion: req.body.direccion,
    telefonoSol: req.body.telefonoSol
  });
  reservacion.save().then(createdPost =>{ //post.save().then(createPost =>{ meter desde res.status postId: createPost._id})
  res.status(201).json({
    message: 'Reservation added succesful'
  })
  });
});

router.put("/:id", (req, res, next)=>{
  const reservacion = new Reservacion({
    _id: req.body.id,
    title: req.body.title,
    solicitante: req.body.solicitante,
    habitaciones: req.body.habitaciones,
    direccion: req.body.direccion,
    telefonoSol: req.body.telefonoSol
  });
  Reservacion.updateOne({_id: req.params.id}, reservacion).then(result=>{
    res.status(200).json({message: "Reservation updated Succesfully"});
  })
});

router.get("/allRsv", (req, res, next) =>{
  Reservacion.find().then(documents =>{
    res.status(200).json({
      message:'Reservaciones expuestas con éxito',
      reservaciones: documents

    });
  });
});

router.get("/:id", (req, res, next) =>{
  Reservacion.findById(req.params.id).then(reservacion =>{
    if(reservacion){
      res.status(200).json(reservacion);
    }else{
      res.status(404).json({message: 'Reservacion no encontrada'})
    }
  })
})

router.delete("/:id",(req, res)=>{
  Reservacion.findById((req.params.id)).then(result=>{
    result.delete()
    res.status(201).json({
    })
  })
})
module.exports = router;
