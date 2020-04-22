const assert = require('assert');
const User = require('../src/user');


describe('Update records', (done) => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Hammy');
        done();
    });
  }

  it('model instance set and save', (done) => {
    joe.set('name', 'Hammy');
    assertName(joe.save(), done);
  });

  it('model instance update', (done) => {
    assertName(joe.updateOne({ name: 'Hammy'}), done);
  });

  it('model class update', (done) => {
    assertName(
      User.updateMany({ name: 'Joe'}, { name: 'Hammy'}),
      done
  );
  });

  it('a model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe'}, { name: 'Hammy'}),
      done
    );
  });

  it('a model class can update by id', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Hammy'}),
      done
    );
  });

  it('A user can have their post count incremented by one', (done) => {
    User.updateMany({ name: 'Joe' }, { $inc: { postCount: 1 }})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
    });
  });
});
