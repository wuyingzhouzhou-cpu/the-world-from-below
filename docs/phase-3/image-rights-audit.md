# Image-rights audit

Source: seeded CMS metadata only. No outside rights research.

Classification used by the frontend:

- **placeholder** — `provenanceStatus` or `rights` is `placeholder`
- **unknown / do not publish** — `rights` is `unknown` (withheld on the public site)
- **verified** — would require stored credit/source and non-placeholder provenance. **None in the seed.**

## Seeded imagery

| Location | Asset | Stored metadata | Class |
| --- | --- | --- | --- |
| Feature hero `when-the-factory-closed` | Unsplash `photo-1569167419666-e94167ac991d` | alt/caption say PLACEHOLDER / editorial demo; `provenanceStatus: placeholder`; `rights: placeholder` | **placeholder — replace before launch** |
| Feature body image (doorway) | Unsplash `photo-1586776699177-b9d70feea1cd` | same placeholder provenance/rights | **placeholder — replace before launch** |
| Feature wide image (station) | Unsplash `photo-1567951171134-c7dccd06cf39` | same placeholder provenance/rights | **placeholder — replace before launch** |
| Places / Forces / Library covers | none seeded | — | — |
| About | no document | — | — |
| `socialImage` on stories | not set | — | omit OG image (correct) |

## Publication-level default social image

No approved site identity asset exists in the repo (only leftover create-next-app SVGs in `web/public/`). Do not invent a documentary or brand photograph. Open Graph image metadata is omitted until `socialImage` or a real site asset is added.

## Editor action

Replace every placeholder before public launch, or keep it clearly labelled and off the live hostname. Do not publish unverified documentary photographs.
