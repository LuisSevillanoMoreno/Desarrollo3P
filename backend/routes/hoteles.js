const express = require("express")
const Hotel = require('../models/hotel');
const multer = require("multer")

const router = express.Router();
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Extensión no válida");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext)
  }
})

router.post("", multer({storage: storage}).single("image"),(req, res, next)=>{
  const url = req.protocol + '://' + req.get("host");
  const hotel = new Hotel({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    favorite: req.body.favorite
  });
  hotel.save().then(createdPost=>{ //post.save().then(createPost =>{ meter desde res.status postId: createPost._id})
  res.status(201).json({
    message: 'Hotel added succesful',
    hotel:{
      ...createdPost,
      id: createdPost._id
      }
    });
  });
});

router.put("/:id", multer({storage: storage}).single("image"), (req, res, next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const hotel = {
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    favorite: req.body.favorite
  };
  Hotel.updateOne({_id: req.params.id}, hotel).then(result=>{
    res.status(200).json({message: "Hotel updated Succesfully"});
  })
});

router.get("/all", (req, res, next) =>{
  Hotel.find().then(documents =>{
    res.status(200).json({
      message:'Hoteles expuestas con éxito',
      hoteles: documents

    });
  });
});

router.get("/:id", (req, res, next) =>{
  Hotel.findById(req.params.id).then(hotel =>{
    if(hotel){
      res.status(200).json(hotel);
    }else{
      res.status(404).json({message: 'Hotel no encontrado'})
    }
  })
})

router.delete("/:id",(req, res)=>{
  Hotel.findById((req.params.id)).then(result=>{
    result.delete()
    res.status(201).json({
    })
  })
})
module.exports = router;
