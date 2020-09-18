'use strict';

const schema = require('./user-schema.js');
const BaseModel = require('../base-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || '1234d';

class User extends BaseModel {
  constructor() {
    super(schema);
  }
  async createNewUser(record) {
    try {
      const userInRecords = await this.readOneRecord({
        username: record.username,
      });
      if (userInRecords.length === 0) {
        const newUser = await this.createRecord(record);
        return {
          token: this.generateToken(newUser),
          message: 'user created successfully',
        };
      } else {
        return { token: { userInRecords }, message: 'user loggen in' };
      }
    } catch (err) {
      return err;
    }
  }

  basicAuth(user) {
    let username = { username: user.username };
    return this.readOneRecord(username)
      .then(userInRecords => {
        if (userInRecords.length !== 0) {
          return this.passwordCheck(userInRecords, user.password);
        } else {
          Promise.reject('Please Create Account');
        }
      })
      .catch(console.error);
  }

  async passwordCheck(user, password) {
    return await bcrypt.compare(password, user[0].password).then(userValid => {
      return userValid ? user : null;
    });
  }

  async generateToken(user) {
    let token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        capabilities: user.capabilities,
        expiresIn: 900000,
        algorithm: 'RS256',
      },
      SECRET
    );
    return token;
  }

  async authenticateToken(token) {
    try {
      let tokenObj = await jwt.verify(token, SECRET);
      if (!!tokenObj.username) {
        return Promise.resolve(tokenObj);
      } else {
        return Promise.reject('User Not Found');
      }
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
}

module.exports = new User();
