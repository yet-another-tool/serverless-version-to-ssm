<div align="center">

![Project Logo](https://webuxlab-static.s3.ca-central-1.amazonaws.com/logoAmpoule.svg)

<h2>Serverless Lambda Version Extraction</h2>
<p>To save values directly in SSM</p>

<p align="center">
  <a href="https://github.com/yet-another-tool/serverless-version-to-ssm/issues">Report Bug</a>
  ·
  <a href="https://github.com/yet-another-tool/serverless-version-to-ssm/issues">Request Feature</a>
</p>
</div>

---

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ol>
        <li>
        <a href="#example">Example</a>
        </li>
      </ol>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

<a href="https://badge.fury.io/js/@yetanothertool%2Fserverless-version-to-ssm"><img src="https://badge.fury.io/js/@yetanothertool%2Fserverless-version-to-ssm.svg" alt="npm version" height="18"></a>

---

## About

<div>
<b> | </b>
<a href="https://www.buymeacoffee.com/studiowebux" target="_blank"
      ><img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style="height: 30px !important; width: 105px !important"
/></a>
<b> | </b>
<a href="https://webuxlab.com" target="_blank"
      ><img
        src="https://webuxlab-static.s3.ca-central-1.amazonaws.com/logoAmpoule.svg"
        alt="Webux Logo"
        style="height: 30px !important"
/> Webux Lab</a>
<b> | </b>
</div>

---

This simple plugin extract the lambda version from a serverless framework template.  
The goal is to save that version in SSM directly.

---

## Usage

```bash
npm install --save-dev @yetanothertool/serverless-version-to-ssm
```

This plugin uses the function name to determine what resource to replace.
The SSM resource name must follow this naming schema:

```text
<functionName>SSM
```

The value will be overriden with : `!Ref <FunctionName>LambdaVersion<RandomId>`

To troubleshoot your can use `--verbose` to see which resources are skipped.

**Example:**
```bash
sls package --stage dev --verbose
```

```text
✔ Found Matching SSM for 'authorization'
✔ Found Matching SSM for 'originRequest'
✔ Found Matching SSM for 'originResponse'
✔ Found Matching SSM for 'viewerRequest'
Warning: No SSM found for 'viewerResponse'
```

---

### Example

```yaml
service: service-name
frameworkVersion: "3"

plugins:
  - "@yetanothertool/serverless-version-to-ssm"

custom:
  #...

provider:
  #...
  lambdaHashingVersion: 20201221
  versionFunctions: true
  #...

package:
  #...

functions:
  authorization:
    handler: authorization/index.handler
    #...

  originRequest:
    handler: originRequest/index.handler
    #...

  originResponse:
    handler: originResponse/index.handler
    #...

  viewerRequest:
    handler: viewerRequest/index.handler
    #...

  viewerResponse:
    handler: viewerResponse/index.handler
    #...

resources:
  Resources:
    #...

    authorizationSSM:
      Type: AWS::SSM::Parameter
      Properties:
        Name: /${self:custom.tenant}/lambda-edge/authorization/version
        Type: String
        Value: "will_be_replaced_by_the_plugin"
        Description: Latest lambda@edge version for CloudFront

    originRequestSSM:
      Type: AWS::SSM::Parameter
      Properties:
        Name: /${self:custom.tenant}/lambda-edge/originRequest/version
        Type: String
        Value: "will_be_replaced_by_the_plugin"
        Description: Latest lambda@edge version for CloudFront

    originResponseSSM:
      Type: AWS::SSM::Parameter
      Properties:
        Name: /${self:custom.tenant}/lambda-edge/originResponse/version
        Type: String
        Value: "will_be_replaced_by_the_plugin"
        Description: Latest lambda@edge version for CloudFront

    viewerRequestSSM:
      Type: AWS::SSM::Parameter
      Properties:
        Name: /${self:custom.tenant}/lambda-edge/viewerRequest/version
        Type: String
        Value: "will_be_replaced_by_the_plugin"
        Description: Latest lambda@edge version for CloudFront

    ViewerResponseSSM:
      Type: AWS::SSM::Parameter
      Properties:
        Name: /${self:custom.tenant}/lambda-edge/viewerResponse/version
        Type: String
        Value: "will_be_replaced_by_the_plugin"
        Description: Latest lambda@edge version for CloudFront
```

---

## Contributing

1. Create a Feature Branch
2. Commit your changes
3. Push your changes
4. Create a PR

<details>
<summary>Working with your local branch</summary>

**Branch Checkout:**

```bash
git checkout -b <feature|fix|release|chore|hotfix>/prefix-name
```

> Your branch name must starts with [feature|fix|release|chore|hotfix] and use a / before the name;
> Use hyphens as separator;
> The prefix correspond to your Kanban tool id (e.g. abc-123)

**Keep your branch synced:**

```bash
git fetch origin
git rebase origin/master
```

**Commit your changes:**

```bash
git add .
git commit -m "<feat|ci|test|docs|build|chore|style|refactor|perf|BREAKING CHANGE>: commit message"
```

> Follow this convention commitlint for your commit message structure

**Push your changes:**

```bash
git push origin <feature|fix|release|chore|hotfix>/prefix-name
```

**Examples:**

```bash
git checkout -b release/v1.15.5
git checkout -b feature/abc-123-something-awesome
git checkout -b hotfix/abc-432-something-bad-to-fix
```

```bash
git commit -m "docs: added awesome documentation"
git commit -m "feat: added new feature"
git commit -m "test: added tests"
```

</details>

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

- Tommy Gingras @ tommy@studiowebux.com
