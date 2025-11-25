'use client';

import dynamic from 'next/dynamic';

const Toaster = dynamic(() => import('react-hot-toast').then((m) => m.Toaster), { ssr: false });

export function ToasterClient() {
  return <Toaster position="top-right" />;
}
