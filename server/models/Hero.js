const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  },
  title: {
    type: String
  },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }],
  scores: {
    difficult: {
      type: Number
    },
    skills: {
      type: Number
    },
    attack: {
      type: Number
    },
    survice: {
      type: Number
    }
  },
  skills: [{
    name: {
      type: String
    },
    desc: {
      type: String
    },
    avator: {
      type: String
    },
    tips: {
      type: String
    }, 
  }],
  items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  usageTips: {type: String},
  battleTips: {type: String},
  teamTips: {type: String},
  partners: [{
    hero: {
      type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'
    },
    desc: {
      type: String
    }
  }]
})

module.exports = mongoose.model('Hero', schema)