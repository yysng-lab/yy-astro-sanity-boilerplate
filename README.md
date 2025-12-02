Here is the clean, production-ready README.md in pure Markdown, ready for copy–paste into your repo.

⸻

🚀 YY Astro–Sanity Boilerplate

A multi-site, multi-language, SEO-first Astro boilerplate with a unified JSON-LD @graph engine.

This boilerplate is built for large-scale content ecosystems: travel blogs, multi-domain brands, coaching sites, landing pages, and any project using Astro + Sanity with strict SEO and schema requirements.

It ensures maximum portability, scalability, and zero duplication across all JSON-LD, SEO, and AEO (Ask-Engine Optimization) definitions.

⸻

✨ Core Features

🧩 Architecture
	•	Astro (static or SSR)
	•	Cloudflare adapter compatible
	•	TailwindCSS 3
	•	Clean, lightweight component system
	•	Import aliasing for shared boilerplate modules

🔍 SEO Engine
	•	Canonical URLs
	•	OpenGraph & Twitter metadata
	•	Hreflang (multi-language & x-default)
	•	Config-driven default title & meta description
	•	Site-wide theme color
	•	Fully centralized BaseHead component

📦 JSON-LD Automation (Advanced)

This boilerplate compiles all schema sources into one clean:

{
  "@context": "https://schema.org",
  "@graph": []
}

Schema layers merged automatically:
	1.	Global JSON-LD Config
(jsonld.config.ts) – e.g. WebSite, Organization, Identity schemas
	2.	Business Config
(business.config.ts) – e.g. LocalBusiness, Org, Logo
	3.	Page-level Overrides
(jsonld, faq, breadcrumbs, itemList, etc. passed from page)
	4.	Geo Config or Per-Page GEO Override
Optional GEO injection (if enabled)
	5.	SearchAction (AEO)
Enabled only for homepage unless overridden
	6.	Breadcrumb List
Automated fallback + customizable per page
	7.	FAQ Schema
Automatically expanded into FAQPage → mainEntity[]

The result is always:
	•	Single JSON-LD script
	•	No duplicates
	•	Google-valid schema
	•	Fully consistent across every site that uses this boilerplate

⸻

🌍 Multi-Site & Multi-Language Support

This boilerplate supports:
	•	Multiple domains (e.g., blog.laimi.vn, laimi.com, partner sites)
	•	Independent SEO & business identity per site
	•	Per-project configuration overrides
	•	Automatic hreflang generation
	•	Vietnamese (vi-VN) + x-default by default (customizable)

⸻

🧱 Sanity Integration

Included:
	•	sanityClient.js with safe fallback when ENV missing
	•	Smooth integration for GROQ queries
	•	Environment-based configuration (project ID, dataset, API version)

Sanity schemas are not included here — each project maintains its own Studio.

⸻

📁 Boilerplate Folder Structure

yy-astro-sanity-boilerplate/
│
├── components/
│   ├── BaseHead.astro        # SEO + JSON-LD brain
│   ├── Header.astro
│   ├── Footer.astro
│   └── utilities...
│
├── lib/
│   ├── sanityClient.js
│   └── schema/               # (Optional shared schema helpers)
│
├── config/
│   ├── site.config.ts
│   ├── seo.config.ts
│   ├── geo.config.ts
│   ├── aeo.config.ts
│   ├── jsonld.config.ts
│   ├── business.config.ts
│   ├── nav.config.ts
│   └── theme.config.ts
│
└── README.md


⸻

🧠 How Projects Use This Boilerplate

Each real project (e.g. blog-phase-3) imports components from the boilerplate:

import BaseHead from "@yy/boilerplate/components/BaseHead.astro";

Each project defines its own local config:

src/config/
  site.config.ts
  seo.config.ts
  jsonld.config.ts
  geo.config.ts
  business.config.ts
  aeo.config.ts

This gives you:
	•	Boilerplate = global rules
	•	Project = environment-specific values
(domain, brand name, logos, colors, social links, business details)

⸻

📝 JSON-LD Architecture Rules (Official)

✔ Rule 1 — Boilerplate NEVER contains real business data

Only schema structure and defaults.

✔ Rule 2 — Project config ALWAYS overrides boilerplate defaults

Ensures multi-site compatibility.

✔ Rule 3 — Every page must pass only page-specific data

(FAQ, breadcrumbs, geo override, itemList, custom jsonld)

✔ Rule 4 — Only ONE WebSite schema is allowed

The boilerplate enforces this.

✔ Rule 5 — Organization schema appears ONCE

Controlled through project’s business.config.ts.

✔ Rule 6 — BreadcrumbList only appears when breadcrumbs are passed

No duplication, no auto-injection for deep pages.

✔ Rule 7 — FAQ schema appears only when faq[] is provided

No empty FAQPage ever injected.

⸻

🧪 Example Usage in Pages

<BaseHead
  title="Japan Travel Guide"
  description="A complete guide to visiting Japan"
  url="https://blog.laimi.vn/destinations/japan/"
  image="https://cdn.sanity.io/japan.jpg"
  breadcrumbs={[
    { name: "Trang chủ", url: "https://blog.laimi.vn" },
    { name: "Japan", url: "https://blog.laimi.vn/destinations/japan/" }
  ]}
  faq={[
    { q: "Đi Nhật mùa nào đẹp nhất?", a: "Thu và mùa hoa anh đào." },
    { q: "Có cần visa Nhật không?", a: "Phụ thuộc quốc tịch." }
  ]}
/>


⸻

🔌 Environment Variables

Your project (not boilerplate) should define:

SANITY_PROJECT_ID=
SANITY_DATASET=
SANITY_API_VERSION=
SANITY_READ_TOKEN=


⸻

🏗 Installation

1. Add alias inside project astro.config.mjs

alias: {
  "@yy/boilerplate": fileURLToPath(
    new URL("../yy-astro-sanity-boilerplate", import.meta.url)
  ),
  "@config": "./src/config",
},

2. Import BaseHead in any page

import BaseHead from "@yy/boilerplate/components/BaseHead.astro";

3. Add your local config overrides in src/config/*

⸻

🧭 Philosophy

One boilerplate, unlimited sites.
Project configs can change.
Brands can change.
Logos, geo, business details can change.

The boilerplate must NEVER change.

Everything is fully decoupled so you can:
	•	Create new microsites fast
	•	Share the same SEO/JSON-LD engine
	•	Keep strict consistency across brands
	•	Avoid technical debt

⸻

🏁 Status

This boilerplate now supports:
	•	✔ Full JSON-LD architecture
	•	✔ No duplication
	•	✔ 100/100 validity for schema
	•	✔ Multi-site overrides
	•	✔ Perfect Lighthouse SEO structure
	•	✔ Fully hydrated BaseHead component

Ready for Phase 3 integration.

⸻

