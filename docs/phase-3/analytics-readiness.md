# Analytics readiness

No analytics product is configured. Do not add PostHog, GA, or similar until you choose one.

The root layout mounts `web/components/site/AnalyticsSlot.tsx`, which currently returns `null`. When you have a real provider, put the script or tag there only — do not scatter tags across pages.

No dashboard belongs in this publication.
