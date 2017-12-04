const ObjectId = require('mongodb').ObjectId
const Answer = require('../models/answerModel')

const createAnswer = function(req,res){
  console.log(req.body)
  let newAnswer = Answer({
    question: req.body.question_id,
    answer_content: req.body.answer_content,
    by: req.header.decoded.id
  })
  newAnswer.save().then(function(){
    res.status(201).send('[+] create 1 Answer')
  }).catch(function(err){
    res.status(500).send(err.errors.title.message)
    console.log(err, '[-] create Answer')
  })
}

const findAllAnswer = function(req,res){
  Answer.find().populate('question').then(function(data_Answers){
    res.status(200).send(data_Answers)
  }).catch(function(err){
    console.log(err, '[-] findAll data Answer')
    res.status(500).send(err)
  })
}

const answerByid = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  Answer.findById(id).then(function(data_Answer){
    res.status(200).send(data_Answer)
  }).catch(function(err){
    res.status(500).send(`[-] err find by id Answer`)
  })
}

const updateAnswer = function(req,res){
  // console.log('masuk')
  let id = {
    _id : ObjectId(req.params.id)
  }
  Answer.findById(id).then(function(data_Answer){
    // console.log(data_Article)
    data_Answer.question = req.body.question_id,
    data_Answer.answer_content = req.body.answer_content,
    data_Answer.by = req.header.decoded.id
    // save
    data_Answer.save().then(function(data_Answer){
      res.status(201).send({
        message : `[+] 1 Answer created`,
        data_Answer : data_Answer
      })
    }).catch(function(err){
      res.status(500).send(`[-] err update Answer`)
    })
  }).catch(function(err){
    res.status(500).send(`[-] err find by id Answer`)
  })
}

const destroyAnswer = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  Answer.findByIdAndRemove(id).then(function(){
    res.status(200).send(`[-] deleted 1 Answer`)
  }).catch(function(err){
    res.status(500).send(`[-] err delete by id Answer`)
  })
}

const answersByQuestion = function(req,res){
  // console.log(req.params.id)
  let questtion_id = {
    _id : ObjectId(req.params.id)
  }
  Answer.find({ question : questtion_id }).populate('by').populate('question').then(function(data_answerQuestions){
    // console.log(data_Questions)
    res.status(200).send(data_answerQuestions)
  }).catch(function(err){
    res.status(500).send(`[-] err find by id Answer by question`)
  })
}

module.exports = {
  createAnswer,
  findAllAnswer,
  answerByid,
  updateAnswer,
  destroyAnswer,
  answersByQuestion
}
