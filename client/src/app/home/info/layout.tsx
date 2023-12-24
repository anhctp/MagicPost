import SideBar from "@/components/header/navBar/sideBar"

export default function infoLayout({children}: {
    children: React.ReactNode
  }) {
    return (
        <section className="flex w-full h-full">
            <section className="w-1/6"><SideBar/></section>
            <section className="w-5/6 px-5 h-[80vh] overflow-auto">{children}</section>
        </section>
    )
}