import type {Metadata} from 'next';
import { Sora, Hanken_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AIC PropTech & Luxe Domus',
  description: 'Ecosistema de Inteligência Imobiliária: Vitrine de Vendas, Área do Cliente e CRM Corretor',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${hankenGrotesk.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
