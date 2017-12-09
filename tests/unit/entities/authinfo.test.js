const { AuthInfo, typedefs } = require("../../../src/index.js");
const test = require("ava").test;
const IdentityTypes = typedefs.IdentityTypes;

test('AuthInfo entity', t => {
  var authInfo = new AuthInfo({ 
    _id: '5a2c10b725a09c4fe0f82125',
    _created: '2017-12-09T17:35:03.0757523+01:00',
    _modified: '2017-12-09T17:35:03.0757523+01:00',
    token: '123',
    type: 'user',
    expireat: '2017-12-09T16:35:03.0757523Z',
    user: '5a26f9c325a09c3c2c2cf6b9',
    device: null 
  });
  t.is(authInfo.uid, '5a2c10b725a09c4fe0f82125');
  t.is(authInfo.token, "123");
  t.is(authInfo.type, IdentityTypes.USER);
  t.deepEqual(authInfo.expireAt, new Date('2017-12-09T16:35:03.0757523Z'));
  t.is(authInfo.identityId, '5a26f9c325a09c3c2c2cf6b9');
});