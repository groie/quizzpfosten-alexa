const testEndpoint = {
  host: 'webhook.site',
  path: '/e8ad838b-a77f-4251-af4e-d9c65cef1adc/',
  port: 443,
  protocol: 'https:',
  client: require('https')
};

const prodEndpoint = {
  host: 'docker.o11.net',
  path: '/publish/',
  port: 5561,
  protocol: 'http:',
  client: require('http')
};
const endpoint = prodEndpoint;

const ping2 = function(event, currentScore) {
  var message = {quizevent: event, score: currentScore};

  var wrappedMessage = "event: update\ndata: " + JSON.stringify(message) + "\n\n";
  var envelope = {items: [{channel: 'test', 'http-stream': {content: wrappedMessage}}]}

  var stringifiedMsg = JSON.stringify(envelope);
  console.error(stringifiedMsg);

  var options = {
    hostname: endpoint.host,
    port: endpoint.port,
    path: endpoint.path,
    protocol: endpoint.protocol,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': stringifiedMsg.length
    }
  };

  var req = endpoint.client.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

  req.on('error', (e) => {
    console.error("ERROR");
  console.error(e);
});

  req.write(stringifiedMsg);
  req.end();
}


module.exports = {
  notify: ping2
};
