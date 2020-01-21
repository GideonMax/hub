var fs = require("fs");



module.exports=(path,options,callback)=>{
    fs.readFile(path,(err,dataBuffer)=>{
        if(err) return callback(err);

        data = dataBuffer.toString();
        var regex = /#(\w+)#/;

        while(regex.test(data)){
            var name = regex.exec(data)[1];
            data= data.replace(regex,"!"+name);//TODO: replace with meaningfull info from file
        }

        return callback(null,data)
    })
}