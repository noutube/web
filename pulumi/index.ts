import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

import { dnsValidatedCertificate, staticWebsiteDistribution } from '../../devops/util.ts';

const config = new pulumi.Config();

const projectName = pulumi.getProject();

// zone

const domain = 'noutu.be';

const zone = await aws.route53.getZone({
  name: domain
});

// static hosting

const bucket = new aws.s3.BucketV2(domain, {
  bucket: domain
});

const website = new aws.s3.BucketWebsiteConfigurationV2(domain, {
  bucket: bucket.id,
  indexDocument: {
    suffix: 'index.html'
  },
  errorDocument: {
    key: 'index.html'
  }
});

const publicAccessBlock = new aws.s3.BucketPublicAccessBlock(domain, {
  bucket: bucket.id,
  blockPublicAcls: true,
  blockPublicPolicy: false,
  ignorePublicAcls: true,
  restrictPublicBuckets: false
});

new aws.s3.BucketPolicy(domain, {
  bucket: bucket.id,
  policy: pulumi.jsonStringify({
    Version: '2012-10-17',
    Statement: [ {
      Effect: 'Allow',
      Principal: '*',
      Action: ['s3:GetObject'],
      Resource: [pulumi.interpolate`${bucket.arn}/*`]
    }]
  })
}, {
  dependsOn: [publicAccessBlock]
});

const certificate = dnsValidatedCertificate(zone, domain);

const distribution = staticWebsiteDistribution(domain, website, certificate);

new aws.route53.Record(domain, {
  zoneId: zone.zoneId,
  name: domain,
  type: aws.route53.RecordType.A,
  aliases: [{
    name: distribution.domainName,
    zoneId: distribution.hostedZoneId,
    evaluateTargetHealth: false
  }]
});

export const distributionId = distribution.id;
