import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';

import type { QueryClient } from '@tanstack/react-query';

import TanStackQueryProvider from '#/integrations/tanstack-query/Provider';
import appCss from '@/styles.css?url';

interface RouterContext {
  queryClient: QueryClient
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Postgraduate SIS',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent/>
      </head>
      <body>
        <TanStackQueryProvider>
          {children}
        </TanStackQueryProvider>
        <Scripts />
      </body>
    </html>
  )
}
