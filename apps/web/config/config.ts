const env = process.env.NODE_ENV;
const isDev = ['development', 'dev'].includes(env);
const prodUrl = 'https://button-kit.lskjs.ru';
const devUrl = 'http://localhost:8080';

export const apiUrl = isDev ? devUrl : prodUrl;
