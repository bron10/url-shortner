module.exports.getUrlCtrl =  function (request, reply) {
    return { get: true }
} 

module.exports.createUrlCtrl  = async function (request, reply) {
    return { create: true }
}