const mongoose = require("mongoose");

const schema = mongoose.Schema({
    role_name:{type:String, required:true},
    is_active:{type:Boolean, default:true},
    created_by:{
        typle: mongoose.SchemaTypes.ObjectId,
       
    }
},{
    versionKey:false,
    timestamps:{
        createdAt:"created_at",
        updatedAd:"updated_at"
    }
});

class Roles extends mongoose.Model{

}

schema.loadClass(Roles);
module.exports=mongoose.model("roles", schema);