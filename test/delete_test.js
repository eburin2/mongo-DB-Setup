const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', (done) => {
  let joe;

  beforeEach((done) => {
    joe = new User ({ name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    //removes a bunch of users given some criteria
    User.deleteMany({ name: 'Joe'})
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    User.deleteOne({ name: 'Joe'})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      })
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndDelete(joe._id)
      .then(() => User.findOne({_id: joe.id}))
      .then((user) => {
        assert(user === null);
        done();
      })
  });
});
