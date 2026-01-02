import './globals.css';

export const metadata = {
  title: 'AI Chatbot',
  description: 'A simple AI Chatbot powered by Gemini',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}