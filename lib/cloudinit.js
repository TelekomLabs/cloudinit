'use strict';

var path = require('path'),
    fs = require('fs'),
    Hogan = require('hogan.js');

var Cloudinit = function() {

};

Cloudinit.prototype = {

    cloudinitTemplate: function(path, params) {
        var templateRaw = fs.readFileSync(path).toString('utf8');
        var template = Hogan.compile(templateRaw);
        return template.render(params);
    },

    generate: function(json, callback) {
        if (!callback) {
            return;
        }

        if (json.chef) {
            json.chef.dna = JSON.stringify(json.chef.dna);

            var template = '../templates/chef/cloudinit_bash.moustache';
            if (json.target === 'windows') {
                template = '../templates/chef/cloudinit_ps1.moustache';
            }

            var cloudinitdata = this.cloudinitTemplate(
                path.resolve(__dirname, template),
                json.chef
            );
            callback(null, cloudinitdata);
        }
        else {
            callback('no data found');
        }
    }
};

module.exports = Cloudinit;