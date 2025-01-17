const bcrypt = require('bcryptjs');
const Model = require('../models').Employee
const nameModel = 'Employee';
const saltBcrypt = 10;

const { createToken } = require('../common/functions/authorization');

const findAll = async (req, res) => {
     const result = await Model.findAll();
     if (!result)
       return res
         .status(404)
         .send({ success: false, msg: `${nameModel} not found` });
     res
       .status(200)
       .send({ success: true, result, msg: `${nameModel} found All` });
}

const findOneById = async (req, res) => {
     const { id } = req.params;

     const result = await Model.findAll({
          where: {
               id
          }
     });

     if (!result)
       return res
         .status(404)
         .send({ success: false, msg: `${nameModel} not found with id - ${id}` });
     res
       .status(200)
       .send({ success: true, result, msg: `${nameModel} found with id - ${id}` });
}

const create = async (req, res) => {
     try {
          const { role, password } = req.body;
          //CREATE CODE
          const allEmployees = await Model.findAll();
          const lastNumber = allEmployees.length;
          const lastEmployee = allEmployees[lastNumber - 1];
          const newId = `${role.substr(0, 1)}${(( lastEmployee.id + 1 ) + 1000)}`
          
          //Encrypt the password
          const passEncrypted = await bcrypt.hash(password, saltBcrypt);

          //SET VALUES
          req.body.code = newId;
          req.body.status = 'activo';
          req.body.password = passEncrypted;

          req.body.businessUnitId = Number(req.body.businessUnitId);
          const result = await Model.create({...req.body});

          res.status(201).send({success: true, result ,msg: `${nameModel} was created!`});

     } catch (error) {
          res.status(400).send({success: false, msg: `${nameModel} was not created`, error});
     }
     
}

const login = async (req, res) => {
     const { code, password } = req.body;

     const employee = await Model.findAll({
          where: {
               code
          }
     });

     if( employee.length === 0 ) 
          return res.status(404).send({success: false, msg: `${nameModel} not found`});

     //COMPARE PASSWORDS
     const employeeCorrect = await bcrypt.compare( password, employee[0].password );

     if ( !employeeCorrect ) 
          return res.status(404).send({success: false, msg: `Credentials are incorrect`});

     //SEND USER AND TOKEN
     const token = await createToken( employeeCorrect.id, employee.role, true );

     res.status(200).send({success: true, result: employee ,msg: `${nameModel} found`, token})
}

module.exports = {
     findAll,
     findOneById,
     create,
     login,
}