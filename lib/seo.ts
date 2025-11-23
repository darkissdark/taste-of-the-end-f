import type { Metadata } from 'next';

const siteName = 'Tasteorama';
const siteUrl = 'https://taste-of-the-end-f.vercel.app';
const defaultDescription = 'Discover, filter and save recipes tailored to your taste.';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description: defaultDescription,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    images: ['/og.png'],
  },
  icons: { icon: '/favicon.svg' },
};

export function pageMeta({
  title,
  description,
  path = '/',
  image = '/og.png',
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const finalDescription = description ?? defaultDescription;
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description: finalDescription,
    openGraph: {
      title,
      description: finalDescription,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: finalDescription,
      images: [image],
    },
    alternates: { canonical: url },
  };
}
