const { users, shops } = require('../models');
// import bcrypt untuk authentication
const bcrypt = require('bcrypt');
// import jsonwebtoken sbg authorization
const jwt = require('jsonwebtoken');

async function getUsers(req, res) {
    try {
        const data = await users.findAll();

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function getUserById(req, res) {
    try {
        // Primary Key = PK
        const id = req.params.id;
        const data = await users.findByPk(id, {
            include: {
                model: shops,
                attributes: ['name']
            }
        });

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function editUser(req, res) {
    try {
      const { username } = req.body;
      const id = req.params.id;
  
      // Check if the new username is unique
      const name = await users.findOne({
        where: {
          username
        }
      });
  
      if (name) {
        if (username.length > 4) {
          return res.status(200).json({
            status: 'success',
            message: `The name for user with id ${id} has been successfully changed.`
          });
        } else {
          return res.status(400).json({
            status: 'failed',
            message: `The name "${username}" is less than 4 characters.`
          });
        }
      } else {
        await users.update(
          {
            username
          },
          {
            where: {
              id
            }
          }
        );
  
        // Update the user's record
        res.status(200).json({
          status: 'success',
          message: `The name for user with id ${id} has been successfully changed.`
        });
      }
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err.message
      });
    }
  }

async function deleteUser(req, res) {
    try {
        const id = req.params.id
        await users.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            'status': 'success',
            'message': `data ${id} ini berhasil di hapus`
        })
    } catch (err) {
        res.status(400).message(err.message)
    }
}

async function createUser(req, res) {
    try {
        const { username, password } = req.body
        // bajuin password nya pake bcrypt / proses enkripsi password
        const hashedPassword = bcrypt.hashSync(password, 10);
        const name = await users.findOne({
            where:{
                username
            }
        })        
        const newUser = await users.create({
            username,
            password : hashedPassword,
            role: req.body.role
        })
        if(!name){
            if(username.length > 4){
                res.status(201).json({
                    status: 'success',
                    data: {
                        user: newUser
                    }
                });
            }else{
                res.status(400).json({
                    status: 'failed',
                    message: 'username must be at least 4 character length'
                })
            }
        }else {
            res.status(400).json({
                status: 'failed',
                message: `username ${username} already exist`
            })
        }

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body

        // cari user berdasarkan username
        const user = await users.findOne({
            where: {
                username
            }
        })

        // validasi kalau user nya gk ada
        if (!user) {
            res.status(404).json({
                status: 'failed',
                message: `user ${username} gk ketemu`
            })
        }
        
        // check password dari request body sesuai gak sama hashed password dari database 
        if(user && bcrypt.compareSync(password, user.password)) {

            // generate TOKEN utk user 
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            }, 'rahasia')

            res.status(200).json({
                status: 'success',
                data: {
                    user,
                    token
                }
            })
        }        
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    editUser,
    createUser,
    login,
}