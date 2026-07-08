# JSON Schema Docs Playground

An experimental playground for developing and testing documentation generators and canonicalizers for JSON Schema, focusing initially on the Draft 3 dialect.

## Overview

The purpose of this repository is to build a visual sandbox to guide the development of the C++ documentation generator inside the Blaze compiler. By compiling complex schemas and inspecting them across various brand interfaces, we can visually audit the compiler and prove that canonicalization makes generated documentation cleaner and simpler.

## Repository Contents

### 1. The Recursive Layouts (recursive-mockups)
Contains 20 different layout designs based on various styles (like Stripe, Google Developers, Wikipedia, and a plain-text RFC style) to see how different UIs handle documentation formatting. Rather than flattening schemas, these layout templates traverse the canonical JSON Schema tree recursively in its native hierarchical format to render collapsible nested child properties.
* Layout 10 (Kraken Fintech): Renders schema properties as digital crypto assets inside a trading terminal featuring transaction trade limits and an order book ledger.

### 2. Interactive Preview Dashboard (showcase_recursive.html)
An iframe-based showcase workspace to preview any of the 10 Draft 3 schemas across all 20 layouts.
* Collapsible Workspace: Features a floating trigger button to toggle all header and layout panels, maximizing height and width for full-screen inspection.
* Scroll Selectors: Features Left/Right arrow scroll buttons to easily slide and choose between layouts on non-touchpad devices.

### 3. Test Schemas & Generator (draft-3-docs and generate_schemas.js)
A test suite containing 10 detailed, real-world Draft 3 schemas (exceeding 100 lines each) such as:
* NPM package.json configurations
* TypeScript tsconfig.json compiler settings
* Kubernetes Pod specs, Docker Compose setups, and OpenAPI specs.

### 4. Compiler & Validator Scripts
* run_recursive.js: Iterates through canonical JSON schemas and compiles them into the 20 documentation layout variations.
* verify_recursive.js: A completeness validator running 6500 assertions across compiled HTML templates to ensure all parameter paths, types, names, and descriptions are successfully rendered.
* canonicalize_all.js: Automatically compiles raw schemas using the Blaze C++ canonicalizer contrib CLI.

## Roadmap and Objectives

Our next phase involves bridging this sandbox with the main Blaze C++ compiler development:

1. Docs-Driven Canonicalization: We use our HTML documentation outputs as diagnostic guides. If a schema outputs confusing or redundant documentation rules, we identify how to improve the Blaze C++ canonicalizer to simplify the schema tree before it gets sent to the documentation generator.
2. Selecting default UIs: We will select from these 20 layouts to decide which interfaces will be compiled directly into the Blaze C++ CLI documentation tool.
3. C++ Documentation Engine Implementation: Once layout designs and canonicalization rules are finalized, we will port the layout rendering logic from JS into optimized C++ rendering modules in the Blaze repository.

## Getting Started

1. Install Dependencies:
   ```bash
   npm install
   ```
2. Generate and Compile layouts:
   ```bash
   # Generate raw Draft 3 schemas
   node generate_schemas.js
   
   # Optional: Canonicalize schemas using compiled Blaze contrib CLI
   node canonicalize_all.js
   
   # Compile layouts to HTML pages
   node recursive-mockups/run_recursive.js
   ```
3. Run Validation Checks:
   ```bash
   node recursive-mockups/verify_recursive.js
   ```
4. Inspect Showcase Dashboard:
   Open recursive-mockups/showcase_recursive.html in your web browser.
