# Design System Strategy: The Digital Archive

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **The Intellectual Monolith**. This system is designed for high-intensity technical analysis and deep work, moving beyond the "cluttered dashboard" trope to create a focused, editorial experience. It prioritizes content density without visual noise. 

By leveraging intentional asymmetry—such as a rigid, high-density sidebar contrasted against a spacious, centered manuscript view—the design breaks the typical "SaaS template" look. We evoke the feeling of a premium dark-mode IDE combined with the legibility of a high-end broadsheet. 

## 2. Colors & Surface Philosophy
The palette is rooted in deep charcoal and "void" blacks, creating a high-contrast environment that minimizes eye strain during long technical sessions.

### The "No-Line" Rule
To achieve a sophisticated, modern aesthetic, **1px solid borders are prohibited for sectioning**. Boundaries must be defined solely through background color shifts.
*   **Sidebar:** Use `surface_container_lowest` (#0e0e0e).
*   **Main Canvas:** Use `background` (#131313).
*   **Floating Panels:** Use `surface_container_high` (#2a2a2a).
By relying on tonal shifts rather than lines, the UI feels expansive and integrated.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Base:** `surface` (#131313) is the desk.
*   **Sidebar/Navigation:** `surface_container_low` (#1c1b1b) is a recessed tray.
*   **Active Editing Area:** `surface_container` (#201f1f) provides the primary focus layer.
*   **Modals/Menus:** `surface_bright` (#393939) sits highest in the stack.

### Glass & Texture
*   **The Glass Rule:** For top navigation bars or floating toolbars, use `surface` with a 70% opacity and a `20px` backdrop-blur. This "frosted" effect allows document content to bleed through subtly as it scrolls.
*   **Signature Textures:** Primary actions should use a subtle linear gradient: `primary` (#adc6ff) to `primary_container` (#4d8eff). This prevents buttons from looking "flat" and adds a premium, tactile glow.

## 3. Typography
The typography is driven by the **Inter** typeface, utilizing a wide scale to differentiate between "System UI" (labels/controls) and "Knowledge Content" (documentation).

*   **Display & Headline (The Narrative):** Use `display-md` for document titles and `headline-sm` for section starts. These are tracking-compressed (-2%) to feel authoritative and editorial.
*   **Title & Body (The Detail):** Use `title-sm` for sidebar headers and `body-md` for documentation text. The `body-md` uses a generous line-height (1.6) to ensure technical analysis remains readable.
*   **Labels (The Metadata):** Use `label-sm` in `on_surface_variant` (#c2c6d6) for timestamps, line counts, and file paths. This keeps secondary data from competing with the primary text.

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** and ambient light simulation, not structural lines.

*   **Layering Principle:** Place a `surface_container_lowest` sidebar against a `surface` background. The slight shift in value creates a natural "drop" without the need for a shadow.
*   **Ambient Shadows:** For floating elements (like an "Edit" button or a context menu), use a "Deep Ambient" shadow: `0px 12px 32px rgba(0, 0, 0, 0.45)`. The shadow must feel like an occlusion of light, not a black smudge.
*   **The Ghost Border Fallback:** If a border is required for accessibility (e.g., in a search input), use `outline_variant` at **20% opacity**. It should be a suggestion of a container, not a cage.

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#adc6ff) with `on_primary` (#002e6a) text. Use `md` (0.375rem) roundedness.
*   **Secondary/Ghost:** No background. Use `on_background` text. On hover, apply a `surface_variant` background at 40% opacity.

### Navigation Sidebar
*   **Lists:** Forbid divider lines. Use `spacing-4` (0.9rem) between groups.
*   **Active State:** Use a vertical "pill" indicator (2px wide) of `primary` color on the left edge, and a subtle `surface_container_highest` background for the selected item.

### The Tab System
*   **Editorial Tabs:** Tabs should not have boxes. Use `title-sm` text. The active tab is indicated by a 2px `primary` underline and a shift to `on_surface` (white). Inactive tabs remain `on_surface_variant`.

### Technical Chips
*   **Status/Tags:** Use `secondary_container` backgrounds with `on_secondary_container` text. These should be `full` roundedness to contrast with the more angular document structure.

### Input Fields
*   **Structure:** Minimalist. No solid box. Only a `surface_container_highest` background with a `ghost border` at the bottom. The label should use `label-sm` floating above the input.

## 6. Do's and Don'ts

### Do
*   **Do** use `spacing-12` and `spacing-16` to create significant "breathing room" between major analysis sections.
*   **Do** use `tertiary` (#ffb786) sparingly for alerts or "Attention Required" metrics—it is a warm contrast to the cool blue/charcoal palette.
*   **Do** ensure that the central reading pane has a max-width (e.g., 800px) to maintain editorial line lengths, even on wide monitors.

### Don't
*   **Don't** use pure black (#000000) for backgrounds. It feels "dead." Always use `surface_container_lowest` (#0e0e0e) to maintain tonal depth.
*   **Don't** use high-contrast dividers between list items. Use whitespace (`spacing-2`) to imply separation.
*   **Don't** use standard blue (#0000FF) for links. Always use the specified `primary` (#adc6ff) to maintain the sophisticated dark-mode harmony.