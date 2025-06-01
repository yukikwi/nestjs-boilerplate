export default () => ({
  port: parseInt(process.env.PORT!, 10),
  cache: {
    connectionUri: process.env.CACHE_CONNECTION_URI,
  },
});
