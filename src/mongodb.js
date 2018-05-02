import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost/clouve", { useMongoClient: true }).then(function() {
    console.log("mongodb is connected...");
})