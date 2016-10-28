'use strict';
var crypto = require('crypto');

var words = require('./words');
var entropyPerWord = Math.log(words.length)/Math.log(2);

var generators = {
  word: function generateWord(entropy){
    var idx = entropy.get(entropyPerWord) % words.length;
    return words[idx];
  },

}


function CryptoEntropy(){
  this.bitsUsed = 0;
  this.bitsUsedExact = 0.0;
}

CryptoEntropy.prototype.get = function getCryptoEntropy(n){
  var cn = Math.ceil(n);
  this.bitsUsedExact+= n;
  this.bitsUsed+= cn;
  return crypto.randomBytes(4).readUInt32BE(0) >>> (32 - cn);
};

var defaultPlan = exports.defaultPlan = [ ['word'], '-', ['word'], '-', ['word'], '-', ['word'] ];

function generateDetailed(cfg){
  if(cfg == null) cfg = {
    plan: defaultPlan,
  };
  var plan = cfg.plan == null ? defaultPlan : cfg.plan;

  var entropy = new CryptoEntropy();

  var pass = '';
  for(var i = 0; i < plan.length; i++){
    var elem = plan[i];
    if(typeof(elem) == 'string' || elem instanceof String){
      pass+= elem;
    }
    else if(Array.isArray(elem)){
      var gen = generators[elem[0]];
      if(gen == null) throw new Error('unknown elem '+elem+' at pos '+i);
      pass+= elem.length == 1 ? gen(entropy) : gen(entropy, elen.slice(1));
    }
    else{
      throw new Error('unknown elem '+elem+' at pos '+i);
    }
  }
  return {
    password: pass,
    entropyBits: entropy.bitsUsed,
    ebtropyBitsExact: entropy.bitsUsedExact,
  };
};

function generate(cfg){
  return generateDetailed(cfg).password;
}

exports.generateDetailed = generateDetailed;
exports.generate = generate;
exports.defaultPlan = defaultPlan;

