const mongoose = require("mongoose");

const schema = mongoose.Schema({
    level:String,
    email:String,
    location:String,
    proc_type:String,
    log:mongoose.SchemaTypes.Mixed,
    
},{
    versionKey:false,
    timestamps:{
        createdAt:"created_at",
        updatedAd:"updated_at"
    }
});

class AuditLogs extends mongoose.Model{

}

schema.loadClass(AuditLogs);
module.exports=mongoose.model("audit_logs", schema);