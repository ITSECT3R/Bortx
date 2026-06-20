## Issues Found

### #4 Barrel import `@itsect3r/bortx` requires React

- **Severity:** Medium — breaks vanilla JS / non-React projects.
- `import '@itsect3r/bortx'` loads `dist/index.js`, which inline-imports React hooks:

```

- **Chrome/Edge/Opera/Brave:** Full smooth animations
- **Firefox:** `@property` not supported — animations will jump/not interpolate (values snap between keyframes)
- **Safari:** Same as Firefox — no `@property` support

This is noted in the library docs as a known limitation. The library's `README.md` mentions "Cross-browser alt effects are planned for a future release."
```
