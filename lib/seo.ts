import type { Metadata } from "next";

const siteName = "Tasteorama";
const siteUrl = "https://example.com";
const defaultDescription =
  "Discover, filter and save recipes tailored to your taste.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export function pageMeta({
  title,
  description,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const url = new URL(path, siteUrl).toString();
  return {
    title,
    description: description ?? defaultDescription,
    openGraph: {
      title,
      description: description ?? defaultDescription,
      url,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    alternates: { canonical: url },
  };
}
