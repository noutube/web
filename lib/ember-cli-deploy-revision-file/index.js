'use strict';

const fs = require('fs');
const path = require('path');

const BasePlugin = require('ember-cli-deploy-plugin');

const REVISION_JSON_NAME = 'revision.json';

module.exports = {
  name: 'ember-cli-deploy-funky-plugin',

  isDevelopingAddon() {
    return true;
  },

  createDeployPlugin: function (options) {
    const DeployPlugin = BasePlugin.extend({
      name: options.name,

      runAfter: 'ember-cli-deploy-revision-data',

      didBuild: function (context) {
        const revision = process.env.REVISION;
        if (!revision) {
          throw new Error('missing REVISION');
        }
        fs.writeFileSync(
          path.join(context.distDir, REVISION_JSON_NAME),
          JSON.stringify({ revision })
        );
        return { distFiles: [REVISION_JSON_NAME] };
      }
    });

    return new DeployPlugin();
  }
};
