'use client';
import './globals.css';
import { ReactNode } from 'react';
import { ModuleProvider } from '@/context/ModuleContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>SolarPanti Dashboard</title>
        <meta name="description" content="ERP Dashboard for Solar Projects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-100 min-h-screen">
        {/* Wrapping the application with ModuleProvider */}
        <ModuleProvider>
          {children}
        </ModuleProvider>
      </body>
    </html>
  );
}
