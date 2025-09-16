import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppSideBar from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mythral Nexus',
  description: 'Mythral Nexus desc',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <AppSideBar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
