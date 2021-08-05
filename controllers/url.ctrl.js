const {serviceURL, errors : {notfound, serverError}} = require('config');
const querystring = require('querystring');
const {createEntry, getUrlEntry, getShortCodeEntry, incrKey} = require('../services/dbConnector');
const {genShortCode} = require('../services/shortCode');
const {insertShortCodeCache} = require('../services/cacheLayer')

module.exports.getUrlCtrl =  async function (request, reply) {
    let {token} = request.params;
    const entries = await getShortCodeEntry({key : 'urls', shortCode : token})
    if(entries.length){
        let {longUrl} = entries[0] || {};
        return reply.redirect(longUrl)
    }
    const err = new Error()
    err.statusCode = notfound.code
    err.message = notfound.message;
    return err;
} 

module.exports.createUrlCtrl  = async function (request, reply) {
    try{
        const {url} = request.body || {};
        let {user} = request.params;
        const {fastify} = request;
        console.log("fastify", fastify);
        const urlEntries = await getUrlEntry({key : 'urls', url})
        let shortCode = "";
        // if(urlEntries.length){
            // shortCode = urlEntries[0].shortCode;
        // }else{
            shortCode = await genShortCode();
            await insertShortCodeCache(fastify, {
                key : url,
                data : shortCode
            }) 
            createEntry({
                key : 'urls',
                data : {
                    id : Date.now(),
                    shortCode,
                    longUrl : url,
                    user
                } 
            })
            incrKey()
        // }
        return { shortUrl: `${serviceURL}${querystring.escape(shortCode)}`}
    }catch(e){
        console.log("Eror",e )
        const err = new Error()
        err.statusCode = serverError.code
        err.message = serverError.message;
        return err;
    }
}