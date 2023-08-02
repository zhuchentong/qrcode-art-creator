module.exports = {
  apps: [
    {
      name: 'qrcode-art-creator',
      port: '8050',
      cwd: '/data/qrcode-art-creator/current',
      script: '.output/server/index.mjs',
      error_file: './logs/error.log', // 错误输出日志
      out_file: './logs/out.log', // 日志
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: 8050,
        HOST: '0.0.0.0',
      },
    },
  ],
  deploy: {
    production: {
      'user': 'root', // ssh 登陆服务器用户名
      'host': '121.37.181.45', // ssh 地址服务器domain/IP
      'ref': 'origin/master', // Git远程/分支
      'repo': 'git@github.com:zhuchentong/qrcode-art-creator.git', // git地址使用ssh地址
      'path': '/data/qrcode-art-creator', // 项目存放服务器文件路径
      'ssh_options': 'StrictHostKeyChecking=no',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'pnpm install && pnpm build && pm2 reload qrcode-art-creator', // 部署后的动作
    },
  },
}
