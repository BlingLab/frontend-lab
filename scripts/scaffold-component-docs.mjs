import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { componentCatalog, componentCategories } from "../packages/ui/src/components/catalog.js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const force = process.argv.includes("--force");
const categoryLabels = new Map(componentCategories.map((category) => [category.id, category.label]));

function renderList(items) {
  return items.map((item) => `- \`${item}\``).join("\n");
}

function renderReadme(component) {
  const categoryLabel = categoryLabels.get(component.category) || component.category;
  const apgLine = component.apg
    ? `- Reference pattern: ${component.apg}`
    : "- Reference pattern: native semantic HTML; add ARIA only when behavior requires it.";

  return `# ${component.name}

> Status: \`${component.status}\` | Priority: \`${component.priority}\` | Category: ${categoryLabel}

## Purpose

${component.purpose}

## Summary

${component.summary}

## Public API Draft

${renderList(component.props)}

## States

${renderList(component.states)}

## Accessibility Contract

- Base primitive: \`${component.primitive}\`
${apgLine}
- Must expose an accessible name whenever the visible label is not enough.
- Must support keyboard operation before the component can move to \`ready\`.
- Must document focus movement when the component opens, closes, selects, or dismisses content.

## Token Hooks

${renderList(component.tokens)}

## Implementation Notes

- Keep source colocated in this folder.
- Prefer native elements before custom ARIA widgets.
- Use \`data-state\`, \`data-disabled\`, \`data-invalid\`, \`data-orientation\`, and \`data-size\` for styling state.
- Avoid hard-coded color, spacing, radius, or z-index values; use \`--ds-*\` tokens.

## Examples

TODO: Add usage examples when implementation starts.

## Open Questions

- TODO: Confirm required variants with product usage.
- TODO: Confirm mobile density and keyboard behavior.
`;
}

function renderSpec(component) {
  return `# ${component.name} Spec

## Anatomy

- Root
- Content
- Optional accessory or action region

## Variants

TODO: Define allowed variants and when each one is appropriate.

## Behavior

- Default state: TODO
- Interaction: TODO
- Disabled/read-only behavior: TODO
- Validation or error behavior: TODO

## Accessibility

- Primitive: \`${component.primitive}\`
- Pattern reference: ${component.apg || "native semantic HTML"}
- Keyboard support: TODO
- Focus management: TODO
- Screen reader announcement: TODO

## Tokens

${renderList(component.tokens)}

## Test Plan

- Unit behavior: TODO
- Keyboard navigation: TODO
- Focus visible state: TODO
- High contrast and reduced motion: TODO
- Responsive layout: TODO

## Decision Log

- TODO: Record API and behavior decisions before implementation.
`;
}

async function writeIfMissing(path, content) {
  await mkdir(dirname(path), { recursive: true });

  if (!force && existsSync(path)) {
    return false;
  }

  await writeFile(path, content, "utf8");
  return true;
}

let written = 0;

for (const component of componentCatalog) {
  const componentDir = join(
    rootDir,
    "packages",
    "ui",
    "src",
    "components",
    component.category,
    component.slug
  );

  if (await writeIfMissing(join(componentDir, "README.md"), renderReadme(component))) {
    written += 1;
  }

  if (await writeIfMissing(join(componentDir, "spec.md"), renderSpec(component))) {
    written += 1;
  }
}

console.log(`${written} component documentation file(s) written.`);
