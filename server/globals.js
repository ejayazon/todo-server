const env = process.env.ENV || 'local';

global.__env = env;
global.__serverRoot = __dirname;
