const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();
  });

  it('returns an empty string for no body', done => {
    //Arrange
    const bodyPromise = getBodyFromRequest(fakeReq);

    //Act
    fakeReq.emit('end');

    //Assert
    bodyPromise
      .then(body => {
        if (expect(body).to.equal('')) {
          done();
        } else {
          done(`Failed. Got "${body}"`);
        }
      });
  });

  it('returns the data read from the stream', done => {
    //Arrange
    const bodyPromise = getBodyFromRequest(fakeReq);
    const data1 = 'This is some';
    const data2 = 'data from the browser';

    //Act
    fakeReq.emit('data', data1);
    fakeReq.emit('data', data2);
    fakeReq.emit('end');

    //Assert
    bodyPromise
      .then(body => {
        const bodyStr = data1 + data2;
        if (expect(body).to.equal(bodyStr)) {
          done();
        } else {
          done(`Failed. Got "${body}"`);
        }
      });
  });
});
