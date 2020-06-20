const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const checkAuth = require('../midelware/check-auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './posts/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now()+ file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Postt = require("../models/VideoModel");

router.get("/", (req, res, next) => {
  Postt.find()
    .select("_id title postImage content date postBy")
    .populate('postBy','name')
    .exec()
    .then(docs => {            
      res.status(200).json(docs);    
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", upload.single('postImage'), (req, res, next) => {
  const postt = new Postt({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    postImage: req.file.path,
    date:req.body.date,
    postBy:req.body.postBy
  });
  postt
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json(result);    
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:postId",checkAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('title _id postImage date')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            postt: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/postt'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:postId", checkAuth, (req, res, next) => {
  const id = req.params.postId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Postt.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Post updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/postt/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:postId",checkAuth,(req, res, next) => {
  const id = req.params.postId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Post deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/postt',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
