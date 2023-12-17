import SideBar from "@/components/sideBar"

export default function in4Layout({children}: {
    children: React.ReactNode
  }) {
    return (
        <section className="flex">
            <section className="w-[15%]"><SideBar/></section>
            <section className="w-[85%] px-5">{children}</section>
        </section>
    )
}