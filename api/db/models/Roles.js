const mongoose = require("mongoose");
const RolePrivileges = require("./RolePrivileges");

const schema = mongoose.Schema({
    role_name:{type:String, required:true, unique:true},
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

    async deleteOne(query){
    if(query._id){
        await RolePrivileges.deleteOne({role_id:query._id});
    }

    await super.deleteOne(query);
}
    

}

schema.loadClass(Roles);
module.exports=mongoose.model("roles", schema);