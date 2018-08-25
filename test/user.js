let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
const fs=require('fs');

chai.use(chaiHttp);

describe("file exists",()=>{
    before((done)=>{
        fs.stat('testuser.txt',(err,stats)=>{
            if(!err){
                fs.unlink('testuser.txt',(err)=>{
                    if(!err)
                    {
                        done();
                    }
                });
            }
            else{
                done();
            }
        });
    });



describe("post a user",()=>{
    it("should not post a user without email",(done)=>{
        let user={
            name:'tarun',
            email:'',
            birthday:'1997-09-09'
        };
        chai.request(server)
            .post('/write')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.have.property('details');
                res.body.message.details[0].should.have.property('message').eql("\"email\" is not allowed to be empty");
                done();
            });
    });
});


describe("post a user",()=>{
    it("should not post a user with invalid email",(done)=>{
        let user={
            name:'tarun',
            email:'tarun@gmail',
            birthday:'1997-09-09'
        };
        chai.request(server)
            .post('/write')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.have.property('details');
                res.body.message.details[0].should.have.property('message').eql("\"email\" must be a valid email");
                done();
            });
    });
});

describe("post a user",()=>{
    it("should post a user with valid details",(done)=>{
        let user={
            name:'tarun bathwal',
            email:'tarun@gmail.com',
            birthday:'1997-09-09'
        };
        chai.request(server)
            .post('/write')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });
});


describe("get latest user",()=>{
    it('it should get the latest user',(done)=>{
        chai.request(server)
        .get('/latest')
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });
});

describe("get first user",()=>{
    it('it should get the first user',(done)=>{
        chai.request(server)
        .get('/1')
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });
});

describe("get all users",()=>{
    it('it should get all users',(done)=>{
        chai.request(server)
        .get('/all')
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});

}); 



