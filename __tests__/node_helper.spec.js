const { default: fetchMock } = require('fetch-mock');
const event = require('./fixtures/event');

beforeAll(() => {
  require('../__mocks__/logger');
});

describe('node_helper', () => {
  let helper;

  beforeEach(() => {
    helper = require('../node_helper');

    helper.setName('MMM-MovieNite');
  });

  describe('socketNotificationReceived', () => {
    describe('called with proper MMM-MovieNite-FETCH', () => {
      beforeEach(() => {
        fetchMock.mock('https://movies.wowellworld.com/api/events?limit=1&posterWidth=w185', {
          status: 200,
          body: JSON.stringify([event]),
        });
      });

      afterEach(() => {
        fetchMock.restore();
      });

      it('calls movie API', () => {
        helper.socketNotificationReceived('MMM-MovieNite-FETCH');

        expect(fetchMock.calls(true)[0][0])
          .toBe('https://movies.wowellworld.com/api/events?limit=1&posterWidth=w185');
      });

      it('calls frontend with movie', async () => {
        await helper.socketNotificationReceived('MMM-MovieNite-FETCH');

        expect(helper.sendSocketNotification)
          .toHaveBeenCalledWith('MMM-MovieNite-DATA', {event});
      });
    });
  });

  describe('called with any other message', () => {
    it('does not call movie API', () => {
      helper.socketNotificationReceived('NOT-MMM-MovieNite-FETCH');

      expect(fetchMock.calls()).toHaveLength(0);
    });

    it('does not call frontend with movie', () => {
      helper.socketNotificationReceived('NOT-MMM-MovieNite-FETCH');

      expect(helper.sendSocketNotification).not.toHaveBeenCalled();
    });
  });
});
