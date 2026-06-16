# CI/CD Pipelines

Three GitHub Actions workflows covering PR validation, docs deployment, and contributor tracking.

## Action Versions

All workflows use these pinned major versions (auto-resolve to latest minor/patch):

| Action                          | Version | Purpose                                 |
| ------------------------------- | ------- | --------------------------------------- |
| `actions/checkout`              | `@v6`   | Clone repo (Node 24 native)             |
| `oven-sh/setup-bun`             | `@v2`   | Install Bun runtime                     |
| `actions/upload-pages-artifact` | `@v5`   | Upload static site for Pages            |
| `actions/deploy-pages`          | `@v5`   | Deploy to GitHub Pages (Node 24 native) |

**Version policy:** Always pin to the latest **major version** (`@v6`, not `@v6.0.3`). Major version tags are maintained by action authors as floating pointers to the latest stable release. This gives us security patches and Node.js runtime updates without manual intervention.

---

## Pipeline 1: PR Check (`pr-check.yml`)

**Trigger:** Pull request opened/synchronized targeting `main`

**Purpose:** Validate every PR before merge. Acts as the quality gate.

```
PR opened/updated → checkout → setup-bun → install → lint → format → typecheck → build → test
```

**Concurrency:** One check per PR number. New pushes cancel in-progress checks for the same PR (`cancel-in-progress: true`).

**Key details:**

- `bun install --frozen-lockfile` ensures reproducible installs
- Runs on `ubuntu-latest` (free GitHub-hosted runner)
- Fails fast — lint runs before build, build before test
- No permissions needed beyond default (read-only repo access)

---

## Pipeline 2: Docs Deploy (`docs-deploy.yml`)

**Trigger:** Push to `main` when any of these change:

- `docs/**` — documentation content
- `src/**` — library source (docs import library CSS/TS)
- `package.json` — dependency changes may affect doc build

**Purpose:** Build VitePress docs site and deploy to GitHub Pages at `https://itsect3r.github.io/Bortx/`.

**Architecture:** Two-job pipeline with artifact handoff.

```
Job 1: build (ubuntu-latest)
  checkout → setup-bun → install → docs:build → upload artifact

Job 2: deploy (ubuntu-latest, needs: build)
  download artifact ← automatic → deploy to GitHub Pages
```

**Permissions:**

```yaml
contents: read # checkout can read the repo
pages: write # deploy-pages can write to Pages
id-token: write # OIDC token for Pages auth
```

**Concurrency:** Single group `docs-deploy`. If a new push arrives while a deploy is running, the in-progress one is cancelled. Ensures only the latest docs are deployed.

**Key details:**

- `base: '/Bortx/'` is set in `docs/.vitepress/config.ts` — critical for subpath deployment on GitHub Pages
- `appearance: 'force-dark'` removes the light/dark toggle, keeping `.dark` class active
- GitHub Pages must be enabled in repo settings (Settings → Pages → Source: GitHub Actions)
- Does NOT run on PR pushes — only on `main`

---

## Pipeline 3: Update Contributors (`contributors.yml`)

**Trigger:** Pull request closed (merged) into `main`

**Purpose:** Auto-update `CONTRIBUTORS.md` when a PR is merged. Tracks contributor GitHub usernames and counts each merged PR.

```
PR merged → checkout → setup-bun → run update-contributors.ts → commit + push CONTRIBUTORS.md
```

**Guard:** `if: github.event.pull_request.merged == true` — only runs on actual merges, not closed-without-merge.

**Permissions:** `contents: write` — needed to push the updated `CONTRIBUTORS.md` back to the repo.

**Key details:**

- Passes `PR_AUTHOR` env var (GitHub username from PR metadata) to the script
- Commit message includes `[skip ci]` to prevent triggering the docs-deploy pipeline on this automated commit
- Script (`scripts/update-contributors.ts`) deduplicates by lowercase GitHub username and increments a contribution counter
- If `CONTRIBUTORS.md` doesn't exist, the script creates it from a seed template
- Sorting: highest contribution count first

---

## Patterns Used

### Concurrency control

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number }}
  cancel-in-progress: true
```

Prevents redundant pipeline runs. For PR checks, groups by PR number. For docs deploy, single static group.

### Path filtering (docs-deploy)

```yaml
on:
  push:
    paths:
      - 'docs/**'
      - 'src/**'
      - 'package.json'
```

Only triggers when relevant files change. Avoids wasting CI minutes on README/CHANGELOG/gitignore commits.

### Conditional job execution (contributors)

```yaml
if: github.event.pull_request.merged == true
```

Job-level guard. Prevents the job from running when a PR is closed without merging.

### Minimum permissions

Every workflow declares only the permissions it needs:

- `pr-check.yml`: no explicit permissions (default read-only)
- `docs-deploy.yml`: `contents: read, pages: write, id-token: write`
- `contributors.yml`: `contents: write`

### Job dependencies

```yaml
needs: build
```

`deploy` waits for `build` to succeed. If the build fails, deploy never runs.

---

## Creating New Pipelines

1. Place the file in `.github/workflows/` with a `.yml` extension
2. Use actions pinned to their latest **major** version (check `https://github.com/<owner>/<repo>/releases`)
3. Set `runs-on: ubuntu-latest` unless you need a specific OS
4. Use `oven-sh/setup-bun@v2` for the Bun runtime
5. Always run `bun install --frozen-lockfile` for reproducible builds
6. Declare minimal `permissions:` — never use `write-all`
7. Add `concurrency:` if multiple runs of the same pipeline could conflict
8. Use `paths:` filtering on push triggers to avoid unnecessary runs
9. Use `[skip ci]` in automated commit messages if the commit shouldn't trigger other pipelines
