const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);



  // create a counter
  var newCounter = counter({
        _id: "bid",
        seq: 0
     
  });


  counter.findOne({_id: 'bid'}, function(err, counter)   {
    if(err)
       console.log("Error",err)
    if(!counter)
    {
     // save the counter
     newCounter.save(function (err) {
        if (err) {
          console.log("Error", err);
              }
              console.log("created blockid seq")
            });
        }
        });




var blockSchema = new Schema({
   bid:{
    type: Number,
   },
    pid: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },

}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

blockSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'bid'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.bid = counter.seq;
        next();
    });
});



const Block = mongoose.model('Block', blockSchema);




module.exports = Block
