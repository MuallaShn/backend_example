const express = require("express");
const router= express.Router();

const Roles = require("../db/models/Roles");
const RolePrivileges = require("../db/models/RolePrivileges");

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

        let roles = new Roles({
            role_name: body.role_name,
            is_action:true,
            created_by:req.user?.id
        });

        res.json(Response.successResponse(roles));

    }catch(err){
        let errorResponse =Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);

    }
});

module.exports =router;