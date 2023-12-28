import Footer from "@/components/footer/footer"
import NavBar from "@/components/header/navBar/navBar"

export default function CustomerLayout({
    children // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    return (
      <section className="px-1 h-full flex flex-col">
        {/* Include shared UI here e.g. a header or sidebar */}
        <section className=""><NavBar/> </section>  
        <section className="py-3 w-full h-[84vh] overflow-auto">{children}</section>
      </section>
    )
  }