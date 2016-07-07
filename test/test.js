var chai = require('chai');
var chaiHttp = require('chai-http');


global.environment = 'test';
var server = require('../index.js');
var user = require('../user-model.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);
chai.use(require('chai-things'));

describe('Test for User Authentication:', function(){

    it('Should Add New User', function(done){
		chai.request(app)
			.post('/users')
			.send({'username': 'george', 'password': 'garble'})
			.end(function(error, response){
				should.equal(error,null);
				response.should.have.status(201);
				done();
			});
	});
	
	it('Should Reject New User', function(done){
		chai.request(app)
			.post('/users')
			.send({'username': '', 'password': 'pebbles'})
			.end(function(error, response){
				response.should.have.status(422);
				response.should.be.json;
				done();
			});
	});
	
	it('Should Authenticate User', function(done){
		chai.request(app)
			.get('/hidden')
			.auth('george', 'garble')
			.end(function(error, response){
				console.log('Response is:');
				console.log(response.body);
				console.log(response.status);
				done();
			});
	});
   
    after(function(done){
        user.remove(function(){
        	done(); 
        });
    });
});
