'use strict'
const fp = require('fastify-plugin')
const StormDB = require("stormdb");
const engine = new StormDB.localFileEngine('./db.stormdb');
const defaultData = require('../default.db.json')
const {getDefaultKeysdata, getRange} = require('../services/keyGen')
const db = new StormDB(engine);
const keysData = getDefaultKeysdata();
db.default({...defaultData, ...keysData});


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

/**
 * 
 * @description store as hash map in file-db
 */
const mapEntry = async function ({key, data}) {
  const entries = await db.set(key, data).save();
  return data;
}

/**
 * @description get key map
 */
 const getKeyMap = async (key) => {
  return await db.get(key).value()
}

const incrKey = async ()=>{
  let {current, ...otherData }= await getKeyMap('keys');
  ++current;

  await mapEntry({
      key : 'keys',
      data : {...otherData, current }
  })
}

/**
 * 
 * @param {*} number 23
 * @param {*} number  4
 * @returns 0023
 */
 const numberFormat = function(number, width) {
  return new Array(+width + 1 - (number + '').length).join('0') + number;
}

const getCurrentKey = async()=>{
  const range = getRange();
  const {current} = await getKeyMap('keys');
  return numberFormat(current, `${range.max}`.length)
}

module.exports = {createEntry, getUrlEntry, getShortCodeEntry, mapEntry, incrKey, getCurrentKey}
