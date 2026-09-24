/* global Module */

/* Magic Mirror
 * Module: MMM-MovieNite
 *
 * By Jordan Welch
 * MIT Licensed.
 */

Module.register('MMM-MovieNite', {
  defaults: {
    updateInterval: 3600000,
  },

  requiresVersion: '2.2.0',

  loading: true,

  start () {
    Log.info(`Starting module: ${this.name}`);
    const self = this;

    this.getData();

    setInterval(() => {
      self.getData();
    }, this.config.updateInterval);
  },

  getData () {
    this.sendSocketNotification('MMM-MovieNite-FETCH');
  },

  getTemplate () {
    return 'templates/MMM-MovieNite.njk';
  },

  getTemplateData () {
    return {
      ...this.data.event,
      loading: this.loading,
    };
  },

  getScripts () {
    return [];
  },

  getStyles () {
    return [
      'font-awesome.css',
      'MMM-MovieNite.css',
    ];
  },

  getTranslations () {
    return {
      en: 'translations/en.json',
      es: 'translations/es.json',
    };
  },

  socketNotificationReceived (notification, payload) {
    if (notification !== 'MMM-MovieNite-DATA') {
      return;
    }

    this.data.event = payload.event;
    this.loading = false;
    this.updateDom(300);
  },
});
