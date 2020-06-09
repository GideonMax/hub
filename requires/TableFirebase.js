


var serviceAccount = require("../data/fire.json");
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-40ac5.firebaseio.com"
});
var db = admin.database();
var ref = db.ref('/');

var normal = ref.child("normal");
var special = ref.child("special");
module.exports ={
  /**
   * 
   * @param {string} date
   * @returns {Promise<Object>} the date's activities
   */
  getDate:function (date)
  {
    return this.updateDate(date).then(a=>{
      return (a=="empty"?{}:a);
    });
  },
  /**
   * 
   * @param {string|Number} day
   * @returns {Promise<Object>} the day's activities
   */
  getNormal:function (day)
  {
    return normal.child(day).once('value').then(snap=>snap.val());
  },
  /**
   * removes all activities in a certain date including the activities that were originally copied there from the normal data
   * @param {string} date
   */
  removeDate:function (date)
  {
    return special.child(date).set("empty");
  },
  /**
   * removes a date completely from the database,
   * if you try to access the date again it will update itself according to the normal data
   * @param {string} date
   */
  deleteDate:function(date){
    return special.child(date).remove();
  },
  /**
   * removes all activities of the given day
   * @param {string|Number} day
   */
  removeNormal:function (day)
  {
    return normal.child(day).remove();
  },
  /**
   * removes an activity from a day
   * @param {string|Number} day
   * @param {any} activity 
   */
  activityRemoveNormal: function (day,activity)
  {
    return normal.child(day).child(activity).remove();
  },
  /**
   * 
   * @param {string} date 
   * @param {any} activity 
   */
  activityRemoveDate:function (date,activity)
  {
    return this.updateDate(date).then(()=>this.activityRemoveDateProto(date,activity));
  },
  /**
   * given an activity and an activity name
   * if the date already contains such an activity it edits said activity
   * otherwise, it creates a new one
   * @param {string} date 
   * @param {string} activity 
   * @param {any} value 
   */
  editDate:function (date,activity,value)
  {
    return this.updateDate(date).then(()=>this.editDateProto(date,activity,value));
  },
  /**
   * given an activity and an activity name
   * if the day already contains such an activity it edits said activity
   * otherwise, it creates a new one
   * @param {string | Number} day 
   * @param {string} activity 
   * @param {any} value 
   */
  editNormal:function (day,activity,value)
  {
    return normal.child(day).child(activity).set(value);
  },
  /**
   * 
   * @param {string} date 
   */
  updateDate:function (date){
    return this.getDateProto(date).then(data=>{
      if(data!=null)return data;
      var b = date.split("-");
      var c = new Date(parseInt(b[2]),parseInt(b[1])-1,parseInt(b[0]),1,1,1,1);
      return this.getNormal(c.getDay())
        .then(normalData=>{
          if(normalData==null)normalData="empty";
          this.setDate(date,normalData);
          return normalData;
        });
    });
  },

  //DON'T USE THESE, THEY ARE MADE FOR THE USE OF OTHER COMMANDS
  /**
   * 
   * @param {string} date 
   */
  getDateProto:function (date)
  {
    return special.child(date).once('value').then(snap=>snap.val());
  },
  /**
   * 
   * @param {string} date 
   * @param {string} activity
   * @param {any} value 
   */
  editDateProto:function(date,activity,value)
  {
    return special.child(date).child(activity).set(value);
  },
  /**
   * 
   * @param {string} date 
   * @param {any} value 
   */
  setDate:function (date,value)
  {
    return special.child(date).set(value);
  },
  /**
   * 
   * @param {string|Number} date 
   * @param {any} value 
   */
  setNormal:function (date,value)
  {
    return normal.child(date).set(value);
  },
  /**
   * 
   * @param {string} date 
   * @param {string} activity 
   */
  activityRemoveDateProto:function (date,activity)
  {
    return special.child(date).child(activity).remove();
  }
};
