const configEnvHostname = 'http://localhost:22081';
const hostname = configEnvHostname;

export const environment = {
  production: false,
  api: {
    host: hostname
  }
};

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
