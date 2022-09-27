"use strict";

class VersionToSSM {
  constructor(serverless, cliOptions, { log }) {
    this.serverless = serverless;
    this.log = log;
    this.hooks = {
      initialize: () => this.init(),
      "after:package:compileFunctions": () => this.afterCompileFunction(),
    };
  }

  init() {
    this.log.notice(
      "Lambda will be scanned to fetch new version; Then it will update SSM resources (if any)"
    );
  }

  afterCompileFunction() {
    Object.keys(this.serverless.service.functions).forEach((idx) => {
      const resource = this.serverless.service.resources.Resources[`${idx}SSM`];
      if (resource) {
        this.log.success(`Found Matching SSM for '${idx}'`);
        resource.Properties.Value = {
          Ref: `${this.serverless.service.functions[idx].versionLogicalId}`,
        };
      } else {
        this.log.warning(`No SSM found for '${idx}'`);
      }
    });
  }
}

module.exports = VersionToSSM;
