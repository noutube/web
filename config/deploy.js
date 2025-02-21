module.exports = () => ({
  s3: {
    bucket: 'noutu.be',
    region: 'us-east-1',
    acl: false,
    filePattern: '**/*'
  },
  cloudfront: {
    distribution: process.env.AWS_DISTRIBUTION
  }
});
