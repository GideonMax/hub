/**
 * 
 * @param {String} Url 
 * @param {Object} data 
 */
function Post(Url, Data) {
    return fetch(Url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
    });
}