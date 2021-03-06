/**
 * Test of Tas.js
 * (c) 2017 Owen Luke
 * https://github.com/tasjs/tas
 * Released under the MIT License.
 */

var tas = require('../../../lib');
var config = require('../config');
var expect = require('chai').expect;

describe('async tasks: return "await"', function(){
	it('should return 5', function(done){

		var a = 1;

		tas({
			t1: function(){
				a ++; // 2
			},

			t2: function(){
				a ++; // 3

				setTimeout(function(){
					a ++; // 4

					tas.next();
				}, config.waitTime);

				return "await";
			},

			t3: function(){
				a ++; // 5
			}
		});

		tas(function(){
			expect(a).to.be.equal(5);
			done();
		});
	});
});

