var fs = require("fs");


class ReplaceEngine {
    /**
     * @constructor
     * @param  {(name:string)=>string} serviceProvider
     */
    constructor(serviceProvider) {

        if (serviceProvider != null)
            this._serviceProvider = serviceProvider;
        //for some reason, any function that is passed into app.engine refers to something else as *this* so we have to do this as a workaround 
        this.replace = (path, options, callback) => {
            this._replace(this, path, options, callback)
        }
    }
    /**
     * @param {ReplaceEngine} self
     * @param {string} path 
     * @param {Object} options 
     * @param {(err:any,rendered:string)=>void} callback 
     */
    _replace(self, path, options, callback) {
        fs.readFile(path, (err, dataBuffer) => {
            if (err) return callback(err);
            var data = dataBuffer.toString();
            var regex = /#!([^\n(?:#!)(?:!#)]+)!#/;
            while (regex.test(data)) {
                var name = regex.exec(data)[1];
                data = data.replace(regex, self._serviceProvider(name));//TODO: replace with meaningfull info from file
            }
            return callback(null, data)
        })
    }
    /**
     * @type {(name:string)=>string}
     * 
     */
    _serviceProvider(name) {
        return "!" + name;
    }
}
class asyncReplaceEngine {
    /**
     * @constructor
     * @param  {(name:string)=>Promise<string>} serviceProvider
     */
    constructor(serviceProvider) {
        if (serviceProvider != null)
            this._serviceProvider = serviceProvider;
        //for some reason, any function that is passed into app.engine refers to something else as *this* so we have to do this as a workaround 
        this.replace = async (path, options, callback) => {
            await this._replace(this, path, options, callback)
        }
    }
    /**
     * @param {asyncReplaceEngine} self
     * @param {string} path 
     * @param {Object} options 
     * @param {(err:any,rendered:string)=>void} callback 
     */
    _replace(self, path, options, callback) {
        fs.readFile(path, (err, dataBuffer) => {
            if (err) return callback(err);

            var data = dataBuffer.toString();
            var regex = /#!([^\n(?:#!)(?:!#)]+)!#/;
            /**
             * @type {Promise<void>[]}
             */
            var promises = [];
            while (regex.test(data)) {
                var name = regex.exec(data)[1];
                data = data.replace(regex, "#?" + name + "?#");
                /**
                 * @type {Promise<string>}
                 */
                var p = self._serviceProvider(name);
                var promise = (
                    function (prom, name) {
                        return prom.then(
                            (value) => {
                                data = data.replace("#?" + name + "?#", value)
                            },
                            (reason) => {
                                return callback(reason);
                            })
                    })(p, name);

                promises.push(promise);
            }
            Promise.all(promises).then(() => {
                return callback(null, data)

            }, (reason) => {
                return callback(reason);
            })
        })
    }
    /**
     * @type {(name:string)=>Promise<string>}
     * 
     */
    _serviceProvider(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("!" + name)
            }, 300)
        })
    }
}

module.exports = {
    ReplaceEngine: ReplaceEngine,
    asyncReplaceEngine: asyncReplaceEngine
}