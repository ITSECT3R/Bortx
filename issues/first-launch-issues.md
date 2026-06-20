## Issues Found

### Issue #1: npm Package Published Without `dist/` Directory (BLOCKER)

**Severity:** Critical  
**Status:** Open

The npm tarball (`bortx-0.1.0.tgz`) contains only 3 files:

```
package.json   (102 lines — correct, exports point to dist/)
LICENSE
README.md
```

The `package.json` `"files"` field is `["dist", "LICENSE", "README.md"]`, but the `dist/` directory is **missing** from the published package. This means:

- All `"main"`, `"module"`, `"types"`, and `"exports"` entries in `package.json` point to **non-existent files** (e.g. `./dist/index.js`, `./dist/borders/index.js`, etc.)
- Importing `import '@itsect3r/bortx'` fails silently or with a module-not-found error
- The npm package is effectively **unusable** as published

**Root cause:** The package was published without running `npm run build` (which runs `tsup`) first. The `dist/` directory was never generated.

**Fix:** Run `npm run build` before `npm publish`, or add a `prepublishOnly` script:

```json
"scripts": {
  "prepublishOnly": "npm run build"
}
```

### Issue #2: `npm install @itsect3r/bortx` Fails with ENOVERSIONS

**Severity:** Medium (may be environment-specific)  
**Status:** Open

```
npm error code ENOVERSIONS
npm error No versions available for @itsect3r/bortx
```

- `npm view @itsect3r/bortx` works correctly (shows version 0.1.0, tarball URL, metadata)
- `npm install @itsect3r/bortx`, `npm pack @itsect3r/bortx`, and `npm install @itsect3r/bortx@latest` all fail with ENOVERSIONS
- Clearing npm cache (`npm cache clean --force`) did not help
- Environment: node v24.14.1, npm v11.11.0, Linux 6.17.0
- **Workaround:** Download tarball directly and install from local path:
  ```bash
  curl -L -o /tmp/bortx.tgz "https://registry.npmjs.org/@itsect3r/bortx/-/bortx-0.1.0.tgz"
  npm install /tmp/bortx.tgz
  ```
- The packument response includes a `versions` field, but `npm-pick-manifest` fails to find any matching version for the `*` range. May be related to scoped package handling or the packument format.

### Issue #3: CSS `@property` — Chromium-Only Smooth Animation

**Severity:** Low (documented limitation)  
**Status:** Known

The library uses CSS `@property` for smooth animation interpolation:

```css
@property --effect-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@property --shimmer-position {
  syntax: '<percentage>';
  initial-value: -30%;
  inherits: false;
}
```

- **Chrome/Edge/Opera/Brave:** Full smooth animations
- **Firefox:** `@property` not supported — animations will jump/not interpolate (values snap between keyframes)
- **Safari:** Same as Firefox — no `@property` support

This is noted in the library docs as a known limitation. The library's `README.md` mentions "Cross-browser alt effects are planned for a future release."
