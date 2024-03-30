
const {Task} = require("../models");
const { Op } = require("sequelize");
exports.list = async (req, res) => {  
    whereCond = {
        uid: req.user.uid,
        status: 1
    }
    if(typeof req.body.search !== "undefined"){
        whereCond.description = {
            [Op.substring]: req.body.search
        }
    }
    const list = await Task.findAll({where: whereCond});

    const latestRecord   = await Task.findAll({
        where:{uid: req.user.uid, status: 1},
        limit: 3, 
        order: [['id', 'DESC']]
    });
    const completedCount = await Task.count({where: {
        uid: req.user.uid,
        status: 1,
        is_completed: 1
    }});

    return res.status(200).send({
        "status" : true,
        "msg" : "Success",
        "data" : {
            "list" : list,
            "completedCount" : completedCount,
            "latestRecord" : latestRecord,
        }
    });
}

exports.add = async (req, res) => {
    const newTask = await Task.create({
        uid: req.user.uid,
        description: req.body.description,
    })
    const latestRecord   = await Task.findAll({
        where: {uid: req.user.uid,status:1},
        limit: 3, 
        order: [['id', 'DESC']]
    });

    return res.status(200).send({
        "status" : true,
        "msg" : "Task Added Successfully.",
        "data" : {
            "id" : newTask.id,
            "description" : req.body.description,
            "latestRecord": latestRecord
        }
    });
}

exports.update = async (req, res) => {  
    await Task.update({ description: req.body.description }, {
        where: {
          id: req.body.id
        }
    });
    const latestRecord   = await Task.findAll({
        where: {uid: req.user.uid,status:1},
        limit: 3, 
        order: [['id', 'DESC']]
    });
    return res.status(200).send({
        "status" : true,
        "msg" : "Update Successfully.",
        "data" : {
            "id" : req.body.id,
            "description" : req.body.description,
            "latestRecord": latestRecord
        }
    });
}

exports.updateCompleted = async (req, res) => {  
    await Task.update({ is_completed: req.body.is_completed }, {
        where: {
          id: req.body.id
        }
    });
    const latestRecord   = await Task.findAll({
        where: {uid: req.user.uid,status:1},
        limit: 3, 
        order: [['id', 'DESC']]
    });
    const completedCount = await Task.count({where: {
        uid: req.user.uid,
        status: 1,
        is_completed: 1
    }});
    return res.status(200).send({
        "status" : true,
        "msg" : "Update Successfully.",
        "data" : {
            "id" : req.body.id,
            "is_completed" : req.body.is_completed ? 1 : 0,
            "completedCount" : completedCount,
            "latestRecord" : latestRecord,
        }
    });
}

exports.delete = async (req, res) => {  
    await Task.update({ status: 0 }, {
        where: {
          id: req.body.id
        }
    });
    const latestRecord   = await Task.findAll({
        where: {uid: req.user.uid,status:1},
        limit: 3, 
        order: [['id', 'DESC']]
    });
    const completedCount = await Task.count({where: {
        uid: req.user.uid,
        status: 1,
        is_completed: 1
    }});
    return res.status(200).send({
        "status" : true,
        "msg" : "Remove Successfully.",
        "data" : {
            "id" : req.body.id,
            "latestRecord": latestRecord,
            "completedCount" : completedCount
        }
    });
}


