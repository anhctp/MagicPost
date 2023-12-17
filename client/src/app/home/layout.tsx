import Footer from "@/components/footer"
import NavBar from "@/components/header/navBar"

export default function CustomerLayout({
    children // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    return (
      <section className="px-5">
        {/* Include shared UI here e.g. a header or sidebar */}
        <NavBar/>   
        <section className="py-3">{children}</section>
      </section>
    )
  }