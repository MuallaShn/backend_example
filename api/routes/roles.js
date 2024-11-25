const express = require("express");
const router= express.Router();

const Roles = require("../db/models/Roles");
const RolePrivileges = require("../db/models/RolePrivileges");
const Response =require("../lib/Response");
const CustomError =require("../lib/Error");
const Enum = require("../config/Enum")
const role_privileges = require("../config/role_privileges")

router.get("/", async (req, res) => {
    try{

        let roles = await Roles.find({});

        res.json(Response.successResponse(roles));

    }catch(err){
        let errorResponse =Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);

    }
});

router.post("/add" ,async (req, res) => {
    let body=req.body;
    try{

        if(!body.role_name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "role_name field must be filled");

        if(!body.permissions || Array.isArray(body.permissions) || body.permissions.length ==0){
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "permissions field must be an Array");
        }
        let role = new Roles({
            role_name: body.role_name,
            is_action:true,
            created_by:req.user?.id
        });

        await role.save();

        for(let i=0; i<body.permissions.length;i++){
            let priv = new RolePrivileges({
                role_id: role_id,
                permission: body.permissions[i],
                created_by: req.user?.id
            });

            await priv.save();
        }

        res.json(Response.successResponse({success:true}));

    }catch(err){
        let errorResponse =Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);

    }
});

router.post("/update" ,async (req, res) => {
    let body=req.body;
    try{

        if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id field must be filled");

        let updates={};

        if(body.role_name) updates.role_name=body.role_name;
        if(typeof body.is_active == "boolean") updates.is_active=body.is_active;

        if(!body.permissions && Array.isArray(body.permissions) && body.permissions.length > 0){

            let permissions= await RolePrivileges.find({role_id:body._id});

            //permissions => [{role_id: "abs", permission:"user_add", _id: "bcd"}];
            // body.permissions => ["category_view", "user_add"]
            let removedPermissions= permissions.filter(x => !body.permissions.includes(x.permission)); 
            let newPermissions=body.permissions.filter(x => !permissions.map(p => p.permission).includes(x));

            if (removedPermissions.length > 0){
                await RolePrivileges.deleteOne({_id:{$in: removedPermissions.map(x => x._id)}});
            }

            if(newPermissions.length > 0){
                for(let i=0; i<body.newPermissions.length;i++){
                    let priv = new RolePrivileges({
                        role_id: body._id,
                        permission: body.newPermissions[i],
                        created_by: req.user?.id
                    });

                    await priv.save();
                }
          
            }
        } 
        

        await Roles.updateOne({_id:body._id} , updates);

        res.json(Response.successResponse({success:true}));

    } catch(err){
        let errorResponse =Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);

    }
});

router.post("/delete" ,async (req, res) => {
    let body=req.body;
    try{

        if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error!", "_id field must be filled");

        await Roles.deleteOne({_id:body._id});
        res.json(Response.successResponse({success:true}));

    }catch(err){
        let errorResponse =Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);

    }
});

router.get("/role_privileges", async (req ,res) => {
    res.json(role_privileges);
})


module.exports =router;