const {serviceURL, errors : {notfound}} = require('config');
const {getCurrentKey} = require('./dbConnector')


/**
 * @description generate a shortcode
 */
const genShortCode = async function(){
    const key = await getCurrentKey();
    let encoded = Buffer.from(key).toString('base64');
    return encoded
}

module.exports = {genShortCode}

