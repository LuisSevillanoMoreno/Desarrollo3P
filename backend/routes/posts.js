const express = require("express")
const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save(); //post.save().then(createPost =>{ meter desde res.status postId: createPost._id})
  res.status(201).json({
    message: 'Post added succesful'
  });
});

router.put("/:id", (req, res, next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result=>{
    res.status(200).json({message: "Post updated Succesfully"});
  })
});

router.get("", (req, res, next) =>{
  Post.find().then(documents =>{
    res.status(200).json({
      message:'Publicaciones expuestas con éxito',
      posts: documents

    });
  });
});

router.get("/:id", (req, res, next) =>{
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message: 'Post no encontrado'})
    }
  })
})

router.delete("/:id",(req, res)=>{
  Post.findById((req.params.id)).then(result=>{
    result.delete()
    res.status(201).json({
    })
  })
})

module.exports = router;
