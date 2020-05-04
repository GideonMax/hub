/**
 * 
 * @param {String} Url
 * @param {Object} data
 * @returns {Promise<Response>}
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
export {Post};