// app/layout.js
import './globals.css';

export const metadata = {
  title: 'JEE Prep Pro',
  description: 'JEE Study App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
