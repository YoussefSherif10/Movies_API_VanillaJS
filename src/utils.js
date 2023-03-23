getRequestData = (req) => {
  return new Promise((resolve, reject) => {
   // Write logic to read the request body data
    try {
    let body = '';

    req.on('data', (data) => {
      body += data.toString();
    })

    req.on('end', () => {
      resolve(body);
    })
      } catch (e) {
        reject(e);
    }
  });
}

let successResponse = (res, msg) => {
  res.writeHead(200, {'content-type': 'application/json'});
  res.end(msg);
}

let failedResponse = (res, msg) => {
  res.writeHead(404, {'content-type': 'application/json'});
  res.end(msg);
}

let respond = (res, error, result) => {
  if (error)
    failedResponse(res, error);
  else
    successResponse(res, result);
}

const getID = (req) => {
  return parseInt(req.url.split('/')[3]);
}

module.exports = {getRequestData, failedResponse, respond, getID}