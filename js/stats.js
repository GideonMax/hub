
import {Post} from "./Post";
class Stats{
  /**
    * adds a new category
    * @param {String} name name of category
    */
  createCategory(name){
    Post("/stats/directory/new",{dir:name});
  }
  /**
     * adds a new stat
     * @param {String} category category name
     * @param {String} name stat name
     */
  addStat(category,name){
    Post("/stats/stat/new",{dir:category,name:name});
  }
  /**
     * gets a stat's value
     * @param {String} category category name
     * @param {String} namestat name
     * @returns {Promise<Number>} promise that resolves to the stat's value
     */
  getStat(category,name){
    return Post("/stats/stat/get",{dir:category,name:name})
      .then(res=>res.json())
      .then(data=>data.value);
  }
  /**
     * sets a stat's value
     * @param {String} category category name
     * @param {String} name stat name
     * @param {Number} value stat's value
     */
  setStat(category,name,value){
    Post("/stats/stat/set",{dir:category,name:name,value:value});
  }
  /**
     * removes a stat
     * @param {String} category 
     * @param {string} name 
     */
  removeStat(category,name){
    Post("/stats/stat/remove",{dir:category,name:name});
  }
  /**
     * increases a stat's value by a specified amount
     * @param {String} category category name
     * @param {String} name stat name
     * @param {Number} amount the amount to increase by
     */
  increaseStat(category,name,amount){
    Post("/stats/stat/increase",{dir:category,name:name,value:amount});
  }
  /**
     * sets all stat values in a category to 0
     * @param {String} name category name
     */
  resetCategory(name){
    Post("/stats/directory/reset",{dir:name});
  }
  /**
     * deletes a category, this action is irreversible 
     * @param {String} name category name
     */
  removeCategory(name){
    Post("/stats/directory/remove",{dir:name});
  }
  /**
     * returns all stat names in a category
     * @param {String} category category name
     * @returns {Promise<String[]>} all the stat names in that category
     */
  getAllStatNames(category){
    return Post("/stats/directory/allNames",{dir:category})
      .then(res=>res.json());
  }
}
export {Stats};