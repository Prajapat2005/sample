import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "ChatGPT",
  description: "ChatGPT App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <AppContextProvider>
          <body
            className={`${inter.className} antialiased`}
          >
            {children}
          </body>
        </AppContextProvider>
      </html>
    </ClerkProvider>
  );
}

