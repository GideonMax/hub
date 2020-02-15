function CreateCategory(name){
    $.post("/stats/directory/new",{dir:name});
}
function addStat(category,name){
    $.post("/stats/stat/new",{dir:category,name:name});
}
/**
 * 
 * @param {String} category 
 * @param {String} name
 * @returns {Promise<Number>}
 */
function getStat(category,name){
    return new Promise((resolve,reject)=>{
        $.post("/stats/stat/get",{dir:category,name:name},(data,status)=>{
            resolve(data.value);
        });
    })
}
function setStat(category,name,value){
    $.post("/stats/stat/set",{dir:category,name:name,value:value});
}
function removeStat(category,name){
    $.post("/stats/stat/remove",{dir:category,name:name});
}
function increaseStat(category,name,value){
    $.post("/stats/stat/increase",{dir:category,name:name,value:value});
}
function resetCategory(name){
    $.post("/stats/directory/reset",{dir:name});
}
function removeCategory(name){
    $.post("/stats/directory/remove",{dir:name});
}
/**
 * 
 * @param {String} category
 * @returns {Promise<String[]>} 
 */
function getAllStatNames(category){
    return new Promise((resolve,reject)=>{
        $.post("/stats/directory/allNames",{dir:category},(data,status)=>{
            resolve(data);
        });
    });
}