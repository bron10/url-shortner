const range = {
    min : 0,
    max : 9999,
    current : 0
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