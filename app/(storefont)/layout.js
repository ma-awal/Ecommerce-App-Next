import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Ei layout shudhu (storefront) group er page e apply hoy -
// admin route ei Header/Footer পাবে না, karon admin আলাদা layout ব্যবহার করে।
export default function StorefrontLayout({ children }) {
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </>
  );
}