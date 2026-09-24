const event = require('./fixtures/event');

describe('MMM-MovieNite', () => {
  beforeAll(() => {
    require('../__mocks__/Module');
    require('../__mocks__/globalLogger');
  });

  const name = 'MMM-MovieNite';

  let MMMMovieNight;

  beforeEach(() => {
    jest.resetModules();
    require('../MMM-MovieNite');

    MMMMovieNight = global.Module.create(name);
    MMMMovieNight.setData({ name, identifier: `Module_1_${name}` });
  });

  it('requires expected version', () => {
    expect(MMMMovieNight.requiresVersion).toBe('2.2.0');
  });

  describe('defaults', () => {
    test('updateInterval', () => {
      expect(MMMMovieNight.defaults.updateInterval).toBe(3600000);
    });
  });

  it('inits module in loading state', () => {
    expect(MMMMovieNight.loading).toBe(true);
  });

  describe('start', () => {
    const originalInterval = setInterval;
    const configObject = {};

    beforeEach(() => {
      MMMMovieNight.setConfig(configObject);
      global.setInterval = jest.fn();
    });

    afterEach(() => {
      global.setInterval = originalInterval;
    });

    test('logs start of module', () => {
      MMMMovieNight.start();

      expect(global.Log.info).toHaveBeenCalledWith('Starting module: MMM-MovieNite');
    });

    test('requests data from node_helper with config variables', () => {
      MMMMovieNight.start();

      expect(MMMMovieNight.sendSocketNotification)
        .toHaveBeenCalledWith('MMM-MovieNite-FETCH');
    });

    test('interval requests data from node_helper', () => {
      MMMMovieNight.start();
      global.setInterval.mock.calls[0][0]();

      expect(MMMMovieNight.sendSocketNotification).toHaveBeenCalledTimes(2);
      expect(MMMMovieNight.sendSocketNotification)
        .toHaveBeenCalledWith('MMM-MovieNite-FETCH');
    });

    test('interval set starts with default value', () => {
      MMMMovieNight.setConfig({ updateInterval: 100000 });
      MMMMovieNight.start();

      expect(global.setInterval)
        .toHaveBeenCalledWith(expect.any(Function), 100000);
    });
  });

  describe('getTemplate', () => {
    it('returns template path', () => {
      expect(MMMMovieNight.getTemplate()).toBe('templates/MMM-MovieNite.njk');
    });
  });

  describe('getTemplateData', () => {
    it('can return simple loading state', () => {
      MMMMovieNight.loading = true;

      expect(MMMMovieNight.getTemplateData()).toEqual({
        loading: true,
      });
    });

    it('returns information needed by template', () => {
      MMMMovieNight.data.event = event;
      MMMMovieNight.loading = false;

      expect(MMMMovieNight.getTemplateData()).toEqual({
        ...event,
        loading: false,
      });
    });
  });

  describe('getStyles', () => {
    describe('default', () => {
      it('returns styles path', () => {
        expect(MMMMovieNight.getStyles()).toEqual([
          'font-awesome.css',
          'MMM-MovieNite.css',
        ]);
      });
    });
  });

  describe('socketNotificationReceived', () => {
    describe('notification is MMM-MovieNite-DATA', () => {
      it('sets loading to false', () => {
        MMMMovieNight.socketNotificationReceived('MMM-MovieNite-DATA', {event});

        expect(MMMMovieNight.loading).toBe(false);
      });

      it('updates dom', () => {
        MMMMovieNight.socketNotificationReceived('MMM-MovieNite-DATA', {event});

        expect(MMMMovieNight.updateDom).toHaveBeenCalled();
      });

      it('sets data', () => {
        MMMMovieNight.socketNotificationReceived('MMM-MovieNite-DATA', {event});

        expect(MMMMovieNight.data.event).toEqual(event);
      });
    });

    describe('notification is not MMM-MovieNite-DATA', () => {
      it('does not set data', () => {
        MMMMovieNight.socketNotificationReceived('NOT-MMM-MovieNite-DATA', {event});

        expect(MMMMovieNight.data.event).toEqual(undefined);
      });
    });
  });
});
