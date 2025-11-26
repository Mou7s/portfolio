module.exports = {
  apps: [
    {
      name: "mou7s-portfolio",
      script: "./.output/server/index.mjs",
      exec_mode: "cluster", // 多进程模式
      instances: "max", // 按CPU核数开
      env: {
        NODE_ENV: "production",
        NITRO_HOST: "0.0.0.0",
        NITRO_PORT: 4000,
      },
    },
  ],
};
