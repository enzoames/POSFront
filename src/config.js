require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 7000,
  // port: 7000,
  // apiHost: process.env.APIHOST || 'https://52.90.93.190/',
  apiHost: process.env.APIHOST || 'http://localhost:8000/',
  apiPort: process.env.APIPORT || 'http://localhost:8000/',
  app: {
    title: 'Star Beauty Nail Salon',
    description: 'Star Beauty Nail Salon',
    head: {
      titleTemplate: 'SALON | %s',
      meta: [
        { name: 'Star Beauty Nail Salon', content: '' },
        { name: 'keywords', content: '' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: '' },
        { property: 'og:title', content: ''},
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:description', content: '' },
        { property: 'og:image', content: '' },
        { property: 'og:url', content: '' },
        { property: 'og:card', content: '' },
        { property: 'og:site', content: '' },
        { property: 'og:creator', content: '' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },

}, environment);
