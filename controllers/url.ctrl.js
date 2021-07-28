const Fastify = require('fastify')
const {createEntry, getUrlEntry, getShortCodeEntry} = require('../services/dbConnector')
const {serviceURL, errors : {notfound}} = require('config');
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
    const {url} = request.body || {};
    let {user} = request.params;
    const urlEntries = await getUrlEntry({key : 'urls', url})
    let shortCode = "";
    if(urlEntries.length){
        shortCode = urlEntries[0].shortCode;
    }else{
        //shortCode is yet to be calc.  
        shortCode = Math.random(); 
        createEntry({
            key : 'urls',
            data : {
                id : Date.now(),
                shortCode,
                longUrl : url,
                user
            } 
        })

    }
    return { shortUrl: `${serviceURL}${shortCode}`}
}