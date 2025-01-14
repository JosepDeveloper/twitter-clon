import { Onest } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

/**
 * Metadatos de la aplicación.
 * Define el título y la descripción que se mostrarán en el navegador y en los motores de búsqueda.
 * 
 * @property {string} title - Título de la aplicación.
 * @property {string} description - Descripción de la aplicación.
 */
export const metadata = {
  title: 'Chigüire.Net (Twitter Clon)',
  description: 'Un Clon de Twitter, hecho con NextJS, Redis y PostgreSQL',
  url: 'https://twitter-clon-sepia.vercel.app/',
  images: [
    {
      url: '/screen-page.webp', // Must be an absolute URL
      width: 800,
      height: 600,
    },
    {
      url: '/screen-page-alt.webp', // Must be an absolute URL
      width: 1800,
      height: 1600,
      alt: 'My custom alt',
    },
  ],
  siteName: 'Chigüire.Net',
  locale: 'es_VE',
  type: 'website'
};

/**
 * Fuente personalizada Onest.
 * Se carga con el subconjunto de caracteres 'latin' para optimizar el rendimiento.
 * 
 * @constant {Object} onest
 * @property {string} className - Clase CSS que aplica la fuente Onest.
 */
const onest = Onest({ subsets: ['latin'] });

/**
 * Componente RootLayout.
 * Define la estructura base de la aplicación, incluyendo metadatos, fuentes y estilos globales.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que se renderizarán dentro del layout.
 * @returns {JSX.Element} - Elemento JSX que representa el layout raíz de la aplicación.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <Head>
        <meta
          property="og:image"
          content="https://twitter-clon-sepia.vercel.app/screen-page.webp"
        />
        <meta
          property="og:image:alt"
          content="Chigüire.Net"
        />

        <meta
          name='twitter:image'
          content='https://twitter-clon-sepia.vercel.app/screen-page.webp'
        />
      </Head>
      <body
        className={`
          ${onest.className} antialiased
          bg-black
          w-[100vw]
          h-[100vh]
          overflow-x-hidden
        `}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}