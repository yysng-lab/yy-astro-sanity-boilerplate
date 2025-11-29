# YY Astro-Sanity Boilerplate

A universal Astro + Tailwind + Sanity boilerplate designed for multi-site builds including:

* Blogs
* Corporate websites
* Coaching websites
* Travel guides
* Landing pages
* Microsites

Sanity Studio remains separate per project.

---

## Features

### Core Architecture

* Astro SSR / Static ready
* TailwindCSS utility-first styling
* Config-driven routing, metadata, and theme
* Reusable layouts and components
* Image optimization layer
* Universal blog scaffolding

### SEO Engine (Advanced)

* Title and description management
* Canonical URLs
* Robots configuration
* OpenGraph and Twitter metadata
* Configurable extra meta tags
* Theme color meta
* Preconnect-ready

### GEO Optimization (Optional)

* `geo.region`
* `geo.placename`
* `geo.position`
* ICBM coordinates
* Fully configurable per project

### Ask Engine Optimization (AEO)

Supports next-generation search (Google SGE, Bing AI, Perplexity, ChatGPT Search):

* SearchAction schema (SERP search bar)
* BreadcrumbList schema (config + auto-generated)
* FAQPage schema (config + auto-generated)
* BlogPosting schema (auto-injected per blog post)
* Organization schema
* LocalBusiness schema
* Fully configurable, page-level JSON-LD
* Multi-schema stacking

### Schema Engine

* Global JSON-LD injection
* Per-page schema injection
* Schema builder utilities
* Breadcrumb generator
* FAQ schema generator
* BlogPosting schema generator
* Router-agnostic breadcrumb creation

### Utility Helpers

* Breadcrumb generation from route
* FAQ schema building
* Safe image URL utility
* Sanity fetch helper

---

## How to Use

### 1. Install the boilerplate

```
npm install @yy/astro-sanity-boilerplate
```

(or clone the repository directly)

### 2. Override config files

All metadata, branding, SEO, AEO, GEO and schema behavior lives under:

```
/config/*
```

Each project overrides these files according to its needs.

### 3. Add your pages

Use the built-in layouts:

* `BaseLayout.astro`
* `PageLayout.astro`
* `BlogPost.astro`

### 4. Connect your Sanity Studio

Each project uses its own Sanity dataset and schema.
The boilerplate includes a universal Sanity client wrapper.

---

## UI Component Philosophy

This boilerplate intentionally does not include a UI component library.

Reasons:

* Different sites require different branding
* Tailwind allows rapid creation of project-specific components
* Reusable UI should only be created once patterns emerge

Per-project UI components should live in:

```
/src/components/ui/
```

Document UI components in:

```
/docs/ui.md
```

If multiple future projects reuse UI components, a standalone **YY UI Kit** package can be created later.

---

## Built-In Schema Capabilities

### Global Schema (`jsonld.config.ts`)

Supports:

* WebSite
* Organization
* LocalBusiness
* Social profiles
* Knowledge Graph metadata

### Page-Level Schema

Any page can pass JSON-LD:

```astro
<BaseHead jsonld={mySchema} />
```

Or multiple schemas:

```astro
<BaseHead jsonld={[schema1, schema2]} />
```

### Breadcrumb Schema

Supports:

* Config-defined breadcrumbs
* Auto-generated breadcrumbs based on URL
* Per-page breadcrumb override

### FAQ Schema

Supports:

* Config-defined FAQs
* Data-driven FAQ schema generation

### BlogPosting Schema

Automatically injected for blog posts with:

* Title
* Image
* Published date
* Modified date
* Breadcrumbs

---

## AEO SearchAction (SERP Search Bar)

Enable in `aeo.config.ts`:

```ts
export const aeoConfig = {
  enableSearchAction: true,
  searchUrl: "/search?q={search_term_string}"
};
```

This enables Google to show an embedded search bar inside your search result listing.

---

## GEO Tag System

Enable GEO metadata in `geo.config.ts`:

```ts
export const geoConfig = {
  enabled: true,
  region: "SG",
  placename: "Singapore",
  position: "1.3521;103.8198",
  latitude: "1.3521",
  longitude: "103.8198"
};
```

---

## Schema Builder Toolkit

Located in:

```
/lib/schema/
```

Includes:

* Breadcrumb builder
* FAQ builder
* BlogPosting builder

This makes JSON-LD generation consistent, maintainable and reusable.

---

## Blog System

Features:

* Blog post layout with automatic schema injection
* Automatic breadcrumbs
* Reusable blog card component
* Sanity-powered content fetching
* SEO-friendly URLs

---

## BaseHead Engine

The `<BaseHead>` component provides:

* Full SEO metadata
* OpenGraph
* Twitter Card
* GEO metadata
* SearchAction schema
* Breadcrumb schema
* FAQ schema
* Business schema
* Global JSON-LD
* Per-page JSON-LD
* Schema stacking
* Extension slot for project-level overrides

This is optimized for modern search engines, SGE, AI crawlers, and future search models.

---

## Extending the Boilerplate

Examples:

* Custom UI Kit
* Analytics wrapper
* Cookie manager
* Multilingual routing
* eCommerce schema
* Localized Place schema

Each extension should be created as its own module to keep the boilerplate universal.

---

## Documentation Roadmap (Optional)

Potential future additions:

* `/docs/seo.md`
* `/docs/schema.md`
* `/docs/ui.md`
* `/docs/routes.md`
* `/docs/sanity.md`

---

## Support

Submit issues or suggestions via the repository’s issue tracker.

---

# Summary

This boilerplate provides:

* Future-proof architecture
* Enterprise-grade SEO
* Advanced AEO support
* GEO metadata
* Full schema integration
* Sanity-ready architecture
* Tailwind + Astro foundation
* Multi-site scalability

Ideal for all current and future projects using Astro + Sanity.

---


