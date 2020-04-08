function CreateCategory(name){
    Post("/stats/directory/new",{dir:name});
}
function addStat(category,name){
    Post("/stats/stat/new",{dir:category,name:name});
}
/**
 * 
 * @param {String} category 
 * @param {String} name
 * @returns {Promise<Number>}
 */
function getStat(category,name){
    return Post("/stats/stat/get",{dir:category,name:name})
    .then(res=>res.json())
    .then(data=>data.value);
}
function setStat(category,name,value){
    Post("/stats/stat/set",{dir:category,name:name,value:value});
}
function removeStat(category,name){
    Post("/stats/stat/remove",{dir:category,name:name});
}
function increaseStat(category,name,value){
    Post("/stats/stat/increase",{dir:category,name:name,value:value});
}
function resetCategory(name){
    Post("/stats/directory/reset",{dir:name});
}
function removeCategory(name){
    Post("/stats/directory/remove",{dir:name});
}
/**
 * 
 * @param {String} category
 * @returns {Promise<String[]>} 
 */
function getAllStatNames(category){
    return Post("/stats/directory/allNames",{dir:category})
    .then(res=>res.json());
}