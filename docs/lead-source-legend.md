# Lead-source legend

Every WhatsApp message sent from the website ends with a short code such as
**`(ref: SAR-IG)`**. Website enquiry forms carry the same code in the hidden
`source`, `page`, `ref_code` and, on the homepage enquiry form, `found_via` fields in Formspree.
`found_via` is optional. When chosen it is one of: Google, ChatGPT or other AI, Instagram, Friend or reseller, Other.

The format is **PAGE-SOURCE**: which page the visitor clicked from, and how
they first reached the site in that browser session.

## Page codes

| Code | Page                                                                     |
| ---- | ------------------------------------------------------------------------ |
| HOM  | Homepage `/`                                                             |
| SAR  | Polyester sarees page `/polyester-sarees-wholesale-surat`                |
| USU  | Unstitched suits page `/unstitched-suits-wholesale-surat`                |
| DRS  | Dress material page `/dress-material-wholesale-surat`                    |
| BLG  | A Fabric Desk article `/blog/...`                                        |
| BLI  | Fabric Desk index `/blog`                                                |
| ABT  | About page `/about`                                                      |
| RES  | Saree wholesale for resellers `/saree-wholesale-for-resellers`           |
| ORG  | Organza and net fabric for boutiques `/organza-net-fabric-for-boutiques` |
| FES  | Diwali and Karva Chauth wholesale `/diwali-karva-chauth-wholesale-surat` |
| COM  | Vidhi Reseller Circle join page `/reseller-circle` (form only)           |
| GUI  | Home business guide `/start-suit-saree-business-from-home`               |
| PBG  | Polyester saree buying guide `/how-to-buy-polyester-sarees-wholesale-surat` |
| DMG  | Dress material and unstitched suit buying guide `/how-to-buy-dress-material-unstitched-suits-wholesale-surat-online` |
| FAQ  | FAQ page `/faq`. The WhatsApp button on that page sends `(ref: FAQ)` with no source suffix. |
| ERR  | "Page not found" (404) page, at any mistyped or old URL                  |
| OTH  | Any other page                                                           |
| SUIT | Not a page. Temporary unstitched-suit catalogue buttons only (no source suffix: the message ends `(ref: SUIT)`) |
| PSAREE | Not a page code. Polyester saree catalogue buttons on `/polyester-sarees-wholesale-surat` only (no source suffix: the message ends `(ref: PSAREE)`) |
| USUIT | Not a page code. Unstitched suit catalogue buttons on `/unstitched-suits-wholesale-surat` only (no source suffix: the message ends `(ref: USUIT)`) |
| CIRCLE | Not a page. Homepage Reseller Circle WhatsApp links only (no source suffix: the message ends `(ref: CIRCLE)`) |
| SEARCH | Not a page. Homepage smart search WhatsApp button only (no source suffix: the message ends `(ref: SEARCH)`) |

Hindi pages add **H** to the page code: HOMH, SARH, USUH, DRSH, BLGH, BLIH, ABTH, RESH, ORGH,
FESH, COMH, GUIH, PBGH, DMGH, FAQH, ERRH (a 404 under `/hi/...`). PSAREE, USUIT, SEARCH and the FAQ button ref stay the same on the Hindi pages.

The Reseller Circle join form sends `form=reseller-circle` with `ref_code` such
as `COM-IG`. This means the person _asked to join_ from the website. It is not
the same as joining the WhatsApp Community itself.

An **ERR** code means the visitor landed on a broken or mistyped link and then
messaged you. If you see several, ask where the link came from so it can be
fixed or redirected.

## Short links

These short addresses permanently redirect to the full pages, and keep any
`?utm_source=...` tags, so they are safe to use in the channel links below.
Each one also works with `/hi` in front, going to the Hindi page (for example
`/hi/sarees`).

| Short link                               | Goes to                                |
| ---------------------------------------- | -------------------------------------- |
| `/sarees`, `/saree`, `/polyester-sarees` | `/polyester-sarees-wholesale-surat`    |
| `/dress-material`, `/dress-materials`    | `/dress-material-wholesale-surat`      |
| `/resellers`, `/reseller`                | `/saree-wholesale-for-resellers`       |
| `/organza`, `/net`, `/organza-net`       | `/organza-net-fabric-for-boutiques`    |
| `/diwali`, `/karva-chauth`               | `/diwali-karva-chauth-wholesale-surat` |
| `/circle`, `/community`                  | `/reseller-circle`                     |

The visitor's page code is the page they end up on, e.g. `/sarees` gives SAR.

## Source codes

| Code | Source                  | How it's detected                                                                   |
| ---- | ----------------------- | ----------------------------------------------------------------------------------- |
| G    | Google search (organic) | Google referrer, or `utm_source=google`                                             |
| GA   | Google Ads              | `gclid` in the URL, or `utm_source=google` with `utm_medium=cpc`                    |
| GB   | Google Business Profile | `utm_source=gbp` (the GBP links below)                                              |
| IG   | Instagram               | `utm_source=instagram`, or an instagram.com / l.instagram.com referrer              |
| FB   | Facebook                | `utm_source=facebook`, or a facebook.com / l.facebook.com / m.facebook.com referrer |
| WC   | WhatsApp Channel        | `utm_source=whatsapp`                                                               |
| CT   | Catalogue / shared link | `utm_source=catalogue`                                                              |
| D    | Direct or unknown       | No referrer and no UTM (typed URL, bookmark, WhatsApp/app links without UTM)        |
| O    | Other                   | Any other website, or an unrecognised `utm_source`                                  |

UTM tags win over the referrer. The first source in a session is kept as the
visitor moves between pages, unless a new UTM link replaces it.

A message with **no ref** came from a browser without JavaScript, or was
typed by hand. Log it as D.

## Links to use on each channel

Always use these links instead of the bare website address. Without them,
Instagram, Facebook and WhatsApp visits often show up as D.

| Channel                                             | Link                                                                                                                               |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Instagram bio                                       | `https://www.vidhifabrics.com/?utm_source=instagram&utm_medium=social&utm_campaign=bio`                                            |
| Facebook page (website field and posts)             | `https://www.vidhifabrics.com/?utm_source=facebook&utm_medium=social&utm_campaign=page`                                            |
| WhatsApp Channel posts                              | `https://www.vidhifabrics.com/?utm_source=whatsapp&utm_medium=channel&utm_campaign=channel`                                        |
| Google Business Profile website button              | `https://www.vidhifabrics.com/?utm_source=gbp&utm_medium=organic&utm_campaign=profile`                                             |
| Catalogue PDF / shared link (sarees)                | `https://www.vidhifabrics.com/polyester-sarees-wholesale-surat?utm_source=catalogue&utm_medium=shared_link&utm_campaign=catalogue` |
| Catalogue PDF / shared link (dress material)        | `https://www.vidhifabrics.com/dress-material-wholesale-surat?utm_source=catalogue&utm_medium=shared_link&utm_campaign=catalogue`   |
| Catalogue PDF / shared link (Diwali & Karva Chauth) | `https://www.vidhifabrics.com/diwali?utm_source=catalogue&utm_medium=shared_link&utm_campaign=festive`                             |

**Not live yet (3 October 2026):** the Facebook page and the WhatsApp Channel
don't exist yet. Use the links above once they are created, from the very
first post.

To point any of these at another page, keep the part from `?utm_source=...`
and change the path, for example
`https://www.vidhifabrics.com/hi/polyester-sarees-wholesale-surat?utm_source=instagram&utm_medium=social&utm_campaign=bio`.

## Logging a lead in HubSpot

1. When a WhatsApp lead comes in, copy the code from the end of the first
   message, e.g. `SAR-IG`.
2. In HubSpot, create or open the contact and paste the code into a
   **Lead source code** contact property. Create this property once as a
   single-line text field, or as a dropdown of the codes above.
3. Also set HubSpot's standard **Lead source** or **Original source** using the
   source part of the code: IG = Instagram, FB = Facebook, G = Organic search,
   GA = Paid search, GB = Google Business Profile, WC = WhatsApp Channel,
   CT = Catalogue, D = Direct, O = Other.
4. For form leads, read `source`, `page` and `ref_code` from the Formspree
   email or submission and log them in the same way.
5. If the visitor deleted the code from the message, ask how they found you
   and log that. If you can't tell, log D.
