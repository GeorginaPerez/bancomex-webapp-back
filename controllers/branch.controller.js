const Model = require('../models').Branch
const nameModel = 'Branch';

const findAll = async (req, res) => {
    const result = await Model.findAll();
    if (!result)
        return res
        .status(404)
        .send({ succes: false, msg: `${nameModel} not found`});
    res
    .status(200)
    .send({succes: true, result, msg: `${nameModel} found All`});
}

 const findOne = async (req, res) => {
    const { id } = req.params;
    const result = await Model.findAll({
        where: {
            id,
        },
    });
    if (!result)
        return res
            .status(404)
            .send({ succes: false, msg: `${nameModel} not found`});
        res
            .status(200)
            .send({ succes: true , result, msg: `${nameModel} found with ${id}`});
 };

 const create = async (req, res) =>{
     try{
         const result = await Model.create({ ...req.body });
         res.status(201)
            .send({succes: true, result, msg: `${nameModel} was created succesfully`,
            });
     } catch(error){
         res
            .status(400)
            .send({ succes: false, msg: `${nameModel} wasn't created`}, error);
     }
 };

 const update = async(req, res) =>{
     try{
         const { id } = req.params;
         const result = await Model.update({ ...req.body}, { where: { id } });
         res
            .status(200)
            .send({scces: true, result, msg: `${nameModel} was update succesfully`,  
            });
     }catch (error){
         res
            .status(404)
            .send({ succes: false, msg: `${nameModel} wasn't update`});
     }
 };

 const deleteOne = async (req, res) =>{
     try{
         const { id } = req.params;
         const result = await Model.destroy({ where: { id } });
         res
            .status(200)
            .send({ succes: true ,result, msg:`${nameModele} was deleted succesfully`})
     }catch(error){
         res
            .status(404)
            .send({ succes: false, msg: `${nameModel} wasn't deleted`});
     }
 }


 module.exports ={findAll, findOne, create, update, deleteOne}

