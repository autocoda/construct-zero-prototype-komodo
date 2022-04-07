# Project Pay Carbon Calculator

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Staging environment

The staging environment is hosted on a public S3 bucket with CloudFront endpoint:

https://d2uaiibnnu5fli.cloudfront.net

### Deployment

Deployment is deployed to the staging endpoint automatically via a Github action when new commits are pushed. The Github action steps are as follows:

- Installs dependencies
- Builds the prod assets
- Deploys the `dist` folder to the S3 bucket
- Invalidates the CloudFront cache



