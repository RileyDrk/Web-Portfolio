# SSH deployment

GitHub-hosted `ubuntu-latest` runners connect to the server over SSH. Only pushes
to `main` and manual runs on `main` deploy. No workflow uses a self-hosted runner.

## Remove the self-hosted runner

From the runner installation directory on the server, stop and uninstall its
service if it was installed:

```bash
sudo ./svc.sh stop
sudo ./svc.sh uninstall
```

If you started `./run.sh` in a terminal, stop it with Ctrl+C too. Open
[Settings > Actions > Runners](https://github.com/RileyDrk/Web-Portfolio/settings/actions/runners),
select the runner, and click **Remove**. Follow GitHub's displayed removal command
on the server; its temporary token should stay on the server.

## Repository secrets

Configure these under
[Settings > Secrets and variables > Actions](https://github.com/RileyDrk/Web-Portfolio/settings/secrets/actions):

| Secret | Value |
| --- | --- |
| `SERVER_HOST` | `142.166.203.36`, or a hostname pointing directly to the server; no scheme, path, or port. |
| `SERVER_USER` | `riley-drake`, the existing deployment account. |
| `SERVER_PORT` | Optional; defaults to `22`. |
| `SERVER_SSH_KEY_B64` | The existing deployment private key encoded as Base64. |
| `SERVER_KNOWN_HOSTS` | The verified server public host-key line described below. |

### Verify the server identity

Run this directly on your server to obtain a known-hosts entry for the current
public IP and default SSH port:

```bash
awk '{print "142.166.203.36 " $1 " " $2}' /etc/ssh/ssh_host_ed25519_key.pub
```

Copy the complete output into `SERVER_KNOWN_HOSTS`. This is a public host key;
never copy the file without the `.pub` suffix. If `SERVER_HOST` uses a hostname,
replace the IP in that command with that same hostname. For a non-default port,
use `[hostname]:port` as the first field instead.

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

A fresh workflow does not fix a network timeout by itself. Public TCP port 22
must reach the server. The earlier checks confirmed SSH listens on port 22, UFW
allows it, and the server's outbound LAN address is `192.168.2.70`.

- **Connection timed out:** check `SERVER_HOST`, forwarding to the correct server
  interface, router/firewall filtering, and the network path from GitHub.
- **Host key verification failed:** check `SERVER_KNOWN_HOSTS` against the public
  host key obtained directly on the server.
- **Permission denied (publickey):** check `SERVER_USER` and the deployment public
  key in that account's `authorized_keys`. An IP change does not require a new key.
- **Node/npm not found:** fix PATH for non-interactive SSH sessions.

References: [Remove a runner](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/remove-runners),
[SSH host-key checking](https://man.openbsd.org/ssh_config#StrictHostKeyChecking).