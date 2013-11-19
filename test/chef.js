var pem = require('pem'),
    fs = require('fs'),
    path = require('path'),
    Cloudinit = require('../index');

describe('User', function() {

    var ci = new Cloudinit();
    var key = null;

    before(function(done) {
        // add keys
        pem.createCertificate({
            days: 1,
            selfSigned: true
        }, function(err, keys) {
            key = keys.serviceKey
            //json.cert = keys.certificate
            done(err);
        });
    });

    describe('cloudint', function() {
        it('should work with unix', function(done) {

            // read json file
            var data = fs.readFileSync(path.resolve(__dirname, './data/tomcat-unix.json'));

            json = JSON.parse(data);
            // attach private key
            json.chef.validator_key = key;

            // generate cloudinit
            ci.generate(json, function(err, data) {
                console.log(data);
                done();
            });
        })

        it('should work with windows', function(done) {

            // read json file
            var data = fs.readFileSync(path.resolve(__dirname, './data/tomcat-win.json'));

            json = JSON.parse(data);
            // attach private key
            json.chef.validator_key = key;

            // generate cloudinit
            ci.generate(json, function(err, data) {
                console.log(data);
                done();
            });
        })
    })
})