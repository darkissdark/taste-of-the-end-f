'use client';

export default function GlobalError() {
  return (
    <section style={{ padding: 24 }}>
      <h1>Something went wrong</h1>
      <p>Please try again. If the issue persists, reload the page.</p>
    </section>
  );
}

// 'use client';

// import NotFoundLayout from '@/components/layout/NotFoundLayout/NotFoundLayout';

// export default function GlobalError() {
//   return (
//     <html>
//       <body>
//         <NotFoundLayout
//           code="500"
//           message="Something went wrong"
//           iconName="img-404"
//           backHref="/"
//           backLabel="Back to Home"
//         />
//       </body>
//     </html>
//   );
// }
