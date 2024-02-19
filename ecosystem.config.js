module.exports = {
    apps : [{
      name   : "multisig-ui-prod",
      script : "node_modules/next/dist/bin/next",
  env_prod: {
  APP_ENV: 'prod'
  }
    }]
  }