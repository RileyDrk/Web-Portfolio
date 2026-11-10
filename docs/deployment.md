# Automatic deployment

The server runs a repository-level GitHub Actions runner. It receives jobs through
an outbound HTTPS connection, so deployment does not depend on the public SSH
port, public IP address, or the old `SERVER_*` secrets. The website's DNS record
still needs to point to the server's public IP for visitors.

Pushes to `main` and manual runs on `main` run `deploy.sh` on the server. The script
syncs the dedicated server checkout to `origin/main`, installs dependencies,
runs lint and tests, and builds into the existing `dist/` served by NGINX.
The checkout is deployment-only: local tracked changes are overwritten when it syncs.

## One-time setup on the Linux server

1. Commit and push the workflow, script, and documentation changes to `main`.
   The deployment will queue until the new runner is online.

2. Log in to the server as `riley-drake` and update its existing checkout:

   ```bash
   cd /home/riley-drake/Projects/Websites/Web-Portfolio
   git pull --ff-only origin main
   node --version
   npm --version
   ```

   Use Node.js 22.12+ (or a supported newer release). The service must run under
   the same user that owns this checkout and can read its Git remote.

3. Open [Settings > Actions > Runners](https://github.com/RileyDrk/Web-Portfolio/settings/actions/runners)
   and choose **New self-hosted runner**. Select **Linux** and the architecture
   matching `uname -m` (`x86_64` means x64; `aarch64` means ARM64).

4. Run GitHub's displayed download, checksum verification, and configuration
   commands on the server as `riley-drake`, using a separate directory such as
   `/home/riley-drake/actions-runner-portfolio`. Use the current commands from
   GitHub; the registration token is temporary and stays on the server.

5. During `./config.sh`, choose a name such as `RileysServer-portfolio` and enter
   **`portfolio-deploy`** when asked for additional labels. Keep the default
   `self-hosted` and `linux` labels. The workflow requires all three labels.

6. Instead of leaving `./run.sh` in a terminal, install the service from the
   runner directory:

   ```bash
   sudo ./svc.sh install riley-drake
   sudo ./svc.sh start
   sudo ./svc.sh status
   ```

7. Confirm the runner appears **Idle** on GitHub. The queued deployment can now
   start. Later, use **Actions > Deploy Portfolio > Run workflow**, selecting
   `main`, or push a new commit to `main`.

The deployment workflow only targets trusted `main` updates. Reserve this runner
for deployment; do not add pull-request workflows that run unreviewed code on it.
Keep existing SSH access available until the first new deployment succeeds. The
old `SERVER_HOST`, `SERVER_USER`, `SERVER_PORT`, and `SERVER_SSH_KEY_B64` secrets
are no longer read by this workflow; removing them is optional after verification.

## Troubleshooting

- **Waiting for a runner:** confirm the service is running and its labels include
  `self-hosted`, `linux`, and `portfolio-deploy`.
- **Node/npm not found:** install Node for the runner user and ensure the runner's
  service environment includes its directory. If you use nvm, run `./env.sh` from
  the runner directory in a shell where Node works, then restart the service.
- **Git authentication fails:** test `git fetch origin` from the server checkout
  as `riley-drake`. This is the server's Git access, separate from the old inbound
  SSH deployment key.
- **Checks or build fail:** inspect that step's log and fix the reported error.
- **Runner offline after reboot:** check `sudo ./svc.sh status` from its directory
  and confirm outbound HTTPS access to GitHub is available.

References: [Add a runner](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/add-runners),
[run it as a service](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/configure-the-application).
