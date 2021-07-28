'use strict'
const fp = require('fastify-plugin')
const StormDB = require("stormdb");
const engine = new StormDB.localFileEngine('./db.stormdb');
const defaultData = require('../default.db.json')
const db = new StormDB(engine);
db.default(defaultData);


/**
 * 
 * @description create a data entry into file-db 
 * 
 */
const createEntry = function ({key, data}) {
  return db.get(key)
  .push(data)
  .save();
}

/**
 * 
 * @description get specific dataset from file-db
 */
const getUrlEntry = async function ({key, url}) {
  const entries = await db.get(key).value();
  return entries.filter((entry) => entry['longUrl'] === url)
}

/**
 * 
 * @description get specific dataset from file-db
 */
 const getShortCodeEntry = async function ({key, shortCode}) {
  const entries = await db.get(key).value();
  return entries.filter((entry) => entry['shortCode'] === shortCode)
}


module.exports = {createEntry, getUrlEntry, getShortCodeEntry}
