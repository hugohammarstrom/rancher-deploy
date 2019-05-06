# Rancher-deploy

## Usage

1. Install with `@hugohammarstrom/rancher-deploy`

2. Add this to package.json:

```json
"rancher-deploy": {
    "image-tag": "image tag name here",
    "rancher-url": "api url to workload on rancher cluster"
}
```

3. Add export `RANCHER_TOKEN=token` to .bashrc

4. Run

```sh
$ npx rancher-deploy
```

or add `"deploy": "rancher-deploy"` as a script in package.json and run with `npm run deploy`
