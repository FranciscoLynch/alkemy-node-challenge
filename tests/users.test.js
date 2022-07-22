/* eslint-disable no-undef */
require('dotenv').config();

const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
chai.use(chaiHttp);
const url = `http://127.0.0.1:${process.env.PORT}`;

describe('Register: ', () => {
	it('This email already exists', (done) => {
		chai.request(url)
			.post('/auth/register')
			.send({ email: 'test@gmail.com', password: 'testtest' })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Invalid email', (done) => {
		chai.request(url)
			.post('/auth/register')
			.send({ email: 'email', password: 'testtest' })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Please fill in all fields', (done) => {
		chai.request(url)
			.post('/auth/register')
			.send({ email: '', password: 'testtest' })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Password must be at least 6 characters', (done) => {
		chai.request(url)
			.post('/auth/register')
			.send({ email: 'test2@gmail.com', password: 'test' })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(400);
				done();
			});
	});
});

describe('Login: ', () => {
	it('Please fill in all fields', (done) => {
		chai.request(url)
			.post('/auth/login')
			.send({ email: 'test@gmail.com', password: '' })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Email does not exist', (done) => {
		chai.request(url)
			.post('/auth/login')
			.send({ email: 'notexist@gmail.com', password: '123456' })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Invalid pass', (done) => {
		chai.request(url)
			.post('/auth/login')
			.send({ email: 'test@gmail.com', password: 'incorrectpass' })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(401);
				done();
			});
	});
});

describe('Auth - token: ', () => {
	it('No token, authentication denied', (done) => {
		chai.request(url)
			.get('/movies')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(401);
				done();
			});
	});

	it('Invalid token', (done) => {
		chai.request(url)
			.get('/movies')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Authorization', 'Bearer ' + 'invalidtoken')
			.end((err, res) => {
				if (err) done();
				expect(res).to.have.status(401);
				done();
			});
	});
});
