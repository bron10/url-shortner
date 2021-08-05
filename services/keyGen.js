const range = {
    min : 1000,
    max : 9999,
    current : 1000
}
let initKey  = range.min;

const getRange = ()=>{
    return range;
}

const getDefaultKeysdata = ()=>{
    return {
        keys :  {...getRange()}
    }
}


module.exports = {getDefaultKeysdata, getRange}