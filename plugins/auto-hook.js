const fp = require('fastify-plugin')
const {serviceURL, errors : {notfound, serverError}} = require('config');
const querystring = require('querystring');
const {getShortCodeCache} = require('../services/cacheLayer')

module.exports = fp(async function (fastify, opts) {
    const { redis } = fastify
    fastify.addHook('preHandler', async (request, reply) => {
      request.fastify = fastify;
      const {url} = request.body || {};
      if(url){
        const shortCode = await getShortCodeCache(fastify, url)
        if(shortCode){
          return reply.send({ shortUrl: `${serviceURL}${querystring.escape(shortCode)}`})
        }
      }
      // some code
      
    })
  })