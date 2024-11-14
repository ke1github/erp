import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Solar EPC ERP',
  description: 'ERP System for Solar EPC Company',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
