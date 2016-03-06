const config = {
  development: {
    api: {
      version: 'v1',
      host: 'localhost:3001',
      route: 'api'
    },
    mongodb: {
      url: 'mongodb://localhost/spiders_nest',
    }
  },
  test: {
    api: {
      version: 'v1',
      host: 'localhost',
      route: 'api'
    },
    mongodb: {
      url: 'mongodb://localhost/spiders_nest',
    }
  },
  acceptance: {
    api: {
      version: 'v1',
      host: 'localhost',
      route: 'api'
    },
    mongodb: {
      url: 'mongodb://localhost/spiders_nest',
    }
  },
  production: {
    api: {
      version: 'v1',
      host: 'localhost',
      route: 'api'
    },
    mongodb: {
      url: 'mongodb://localhost/spiders_nest',
    }
  },
};

const currentConfig = config[process.env.NODE_ENV];

export default currentConfig;
