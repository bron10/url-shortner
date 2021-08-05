'use strict'

/**
 * 
 * @description create a cache entry into redis-db 
 * 
 */
const insertShortCodeCache = async function (f, {key, data}) {
    const {redis} = f;
    console.log("set cache")
    return await redis.set(key, data);
}

const getShortCodeCache = async function(f, url){
    const {redis} = f;
    const shortCode = await redis.get(url);
    console.log("get cache", shortCode)
    return shortCode
}

module.exports = {getShortCodeCache, insertShortCodeCache}