# SSH deployment

GitHub-hosted `ubuntu-latest` runners connect to the server over SSH. Only pushes
to `main` and manual runs on `main` deploy.

## Repository secrets

Configure these under
[Settings > Secrets and variables > Actions](https://github.com/RileyDrk/Web-Portfolio/settings/secrets/actions):

| Secret | Value |
| --- | --- |
| `SERVER_HOST` | The server's current public IP or a hostname pointing directly to it; no scheme, path, or port. |
| `SERVER_USER` | `riley-drake`, the existing deployment account. |
| `SERVER_PORT` | Optional; defaults to `22`. |
| `SERVER_SSH_KEY_B64` | The existing deployment private key encoded as Base64. |
| `SERVER_KNOWN_HOSTS` | The verified server public host-key line described below. |

### Verify the server identity

Replace `YOUR_SERVER_HOST` below with the exact value of `SERVER_HOST`, then run
this directly on your server to obtain a known-hosts entry for the default SSH port:

```bash
awk -v host='YOUR_SERVER_HOST' '{print host " " $1 " " $2}' /etc/ssh/ssh_host_ed25519_key.pub
```

Copy the complete output into `SERVER_KNOWN_HOSTS`. This is a public host key;
never copy the file without the `.pub` suffix. For a non-default port, use
`[hostname]:port` as the first field instead.

The workflow checks the server against this saved key using
`StrictHostKeyChecking=yes`; it does not trust a key fetched during deployment.
When changing the host/IP, update the first field of the known-hosts entry to
match `SERVER_HOST`. A genuine server host-key change needs verification on the
server before updating this secret.

## Run a deployment

Commit and push the changes to `main`, then open **Actions > Deploy Portfolio**.
Pushes deploy automatically. **Run workflow** also starts a deployment when you
select `main`.

The SSH command runs:

```bash
bash /home/riley-drake/Projects/Websites/Web-Portfolio/deploy.sh
```

The script syncs the dedicated deployment checkout to `origin/main`, installs
dependencies, runs lint and tests, and builds into the existing `dist/` served by
NGINX. Local tracked changes in that deployment checkout are overwritten during
sync. Node.js and npm must be available in the deployment user's non-interactive
SSH environment. Use Node.js 22.12+ or a supported newer release.

## Connection troubleshooting

The configured public SSH port must reach the server through the router and
firewall. After an IP change, update `SERVER_HOST`, the corresponding host field
in `SERVER_KNOWN_HOSTS`, and the website's DNS records.

- **Connection timed out:** check `SERVER_HOST`, forwarding to the correct server
  interface, router/firewall filtering, and the network path from GitHub.
- **Host key verification failed:** check `SERVER_KNOWN_HOSTS` against the public
  host key obtained directly on the server.
- **Permission denied (publickey):** check `SERVER_USER` and the deployment public
  key in that account's `authorized_keys`. An IP change does not require a new key.
- **Node/npm not found:** fix PATH for non-interactive SSH sessions.

Reference: [SSH host-key checking](https://man.openbsd.org/ssh_config#StrictHostKeyChecking).
