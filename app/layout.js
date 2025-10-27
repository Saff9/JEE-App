// app/layout.js
import './globals.css';

export const metadata = {
  title: 'JEE Prep Pro - Study App',
  description: 'Comprehensive JEE preparation platform with video lectures and study materials',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
