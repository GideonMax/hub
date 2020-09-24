'use strict';

// eslint-disable-next-line no-unused-vars

class FB {
  /**
   * 
   * @param {import("firebase-admin")} admin 
   * @param {import("firebase-admin").ServiceAccount} serviceAccount 
   * @param {String} dbURL 
   */
  constructor(admin, serviceAccount, dbURL) {
    this.admin = admin;
    this.serviceAccount = serviceAccount;
    if (!this.admin.apps.length) {
      this.connnect(dbURL);
    }
    this.db = this.admin.database();
    this.ref = this.db.ref("/");
  }

  connnect(dbURL) {
    this.app = this.admin.initializeApp({
      credential: this.admin.credential.cert(this.serviceAccount),
      databaseURL: `https://${dbURL}.firebaseio.com`
    });
  }
  addDBRow(path, key, data) {
    return this.ref.child(path).update({
      [key]: data
    });
  }

  updateDBRow(path, object) {
    this.ref.child(path).update(object);
  }

  readDBItems(path) {
    return this.ref.child(path).once('value');
  }

  deleteDBItem(path) {
    return this.ref.child("items").child(path).remove();
  }

  readDBItem(path, id) {
    return this.ref.child(`${path}/${id}`)
      .once('value')
      .then(snapshot => snapshot.val());

    /*
    var ref = this.db.ref("/");
    var itemsREF = ref.child(`${path}/${id}`);
    itemsREF.on("value", function (snapshot) {
      console.log(snapshot.val());
      return snapshot.val();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    d*/
  }
}
module.exports = FB;
