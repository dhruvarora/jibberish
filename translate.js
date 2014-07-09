var MsTranslator = require('./mstranslator');

var client_secret='Gibberish-ID';
var client_id='4YXi3g5y0n+q2JIkSy4w1KSDgT76yiIgAwNy1/ztIjk=';

if (!client_secret || !client_id) {
  console.log('client_secret and client_id missing');
  process.exit(1);
}

var params = {
  text: 'How\'s it going?',
  from: 'en',
  to: 'es'
};

var client = new MsTranslator({
  client_id: client_id,
  client_secret: client_secret
});

client.initialize_token(function(){
  client.translate(params, function(err, data) {
    if (err) console.log('error:' + err);
    console.log(data);
    process.exit();
  });
});