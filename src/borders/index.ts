/**
 * Border Effects Library - Master Barrel
 * Imports base, pro effects, pro modifiers, and shared modifiers.
 *
 * Alt border effects (no webkit-mask dependency) are planned for a future release.
 * See plan.md for details.
 */
import './base.css';
import './effects';
import './modifiers';
import './shared';
// Alt border effects intentionally excluded from v1.
// They use alternative rendering (no -webkit-mask dependency)
// for broader Firefox/Safari support. Only 1 of 11 planned
// effects exists (glow-ring). Do NOT re-wire alt effects
// until explicitly requested by maintainers. See plan.md "Future".
// import './alt';
