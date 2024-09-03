import CopyRight from "./Compontes/CopyRight";
import Nav from "./Compontes/nav";
import "./globals.css"; 


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className="bg-gray-200">
        <Nav/>
        {children}</body>
        {/* <CopyRight/> */}
    </html>
  );
}
