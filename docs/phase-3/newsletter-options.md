# Newsletter readiness

The homepage already states that subscription is not open. Do not add a form until a provider is configured.

## Options (practical)

| Option | Fit | Overhead | Design later |
| --- | --- | --- | --- |
| **Buttondown** | Independent writers, Markdown, simple paid/free lists | Low | Hosted pages; custom domain later |
| Beehiiv | Growth/newsletter-as-media | Medium | Strong templates, more product surface |
| Kit (ConvertKit) | Creator email + automations | Medium | Fine, heavier than needed at 0 subscribers |
| Resend + own list | Full control, you own schema and UI | High | Maximum flexibility, you operate the list |

## Recommendation

**Buttondown** for first launch.

This is a small independent English editorial publication with a 10k-subscriber ambition and no newsletter backend today. Buttondown keeps operations to writing and sending. A custom-designed archive can wait until the list exists.

Do not integrate now. When ready:

1. Create the Buttondown account.
2. Point the form (or embed) at that list only.
3. Keep `siteSettings.newsletterName` / `newsletterDescription` as the CMS copy source.
4. Replace the homepage “not open yet” note with the real form — do not fake success states.
