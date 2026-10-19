/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Cloudflare Turnstile site key for the enquiry forms; leave unset to build without the check. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}
