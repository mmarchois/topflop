module.exports = {
  apps: [
    {
      name: 'Topflop API',
      script: './dist/src/main.js',
      instances: 2,
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'production',
        NODE_PATH: 'dist',
        PORT: '3000',
      },
    },
  ],
};
