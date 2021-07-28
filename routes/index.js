'use strict'
const {getUrlCtrl, createUrlCtrl} = require('../controllers/url.ctrl') 

module.exports = async function (fastify, opts) {
  /**
   * @api {get} /:token Request redirection to actual url
   * @apiName getUrlCtrl
   * @apiGroup URL
   *
   * @apiParam {token} the shorten token for actual url
   *
   * @apiSuccess (302) {HTML} Redirected url response as HTML.
   * @apiError (404) {HTML} Relative redirection not found
   */
  fastify.get('/:token', getUrlCtrl)

  /**
   * @api {get} /:token Request redirection to actual url
   * @apiName getUrlCtrl
   * @apiGroup URL
   *
   * @apiParam {token} the shorten token for actual url
   *
   * @apiSuccess (302) {HTML} Redirected url response as HTML.
   * @apiError (404) {HTML} Relative redirection not found
   */
   fastify.post('/:user/create', createUrlCtrl)
}
