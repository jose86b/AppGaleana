module.exports = {
    // ... otras configuraciones de webpack
    resolve: {
      fallback: {
        "buffer": require.resolve("buffer/")
      }
    }
  };
  
  