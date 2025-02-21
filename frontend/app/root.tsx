import { json, MetaFunction, type LinksFunction, type LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import styles from './tailwind.css?url';
import fonts from './fonts.css?url';

export const meta: MetaFunction = () => {
  return [
    { title: "Make It Jake's" },
    { name: "description", content: "Transform your SWE resume into Jake's elegant LaTeX template with just one click. No LaTeX knowledge required." },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: fonts },
  { rel: 'icon', href: '/favicon.ico?v=4' },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const ENV = {
    API_URL: process.env.API_URL || 'http://localhost:3000',
  };
  
  return json({ ENV });
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();

  // Set window.ENV as soon as we have the data
  if (typeof window !== 'undefined') {
    window.ENV = ENV;
  }

  return (
    <html lang="en" className="min-h-screen">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N3EE5SVTX2"></script>
        <script 
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-N3EE5SVTX2');
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
