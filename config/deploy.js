module.exports = () => ({
  pipeline: {
    alias: {
      s3: { as: ['s3-assets', 's3-other'] }
    }
  },
  's3-assets': {
    bucket: 'noutu.be',
    region: 'us-east-1',
    acl: false,
    filePattern: 'assets/**/*',
    expires: null
  },
  's3-other': {
    bucket: 'noutu.be',
    region: 'us-east-1',
    acl: false,
    filePattern: '**/*',
    fileIgnorePattern: 'assets/**/*',
    cacheControl: 'max-age=0, no-cache',
    expires: null
  },
  cloudfront: {
    distribution: process.env.AWS_DISTRIBUTION,
    objectPaths: [
      '/index.html',
      '/revision.json'
    ]
  }
});
