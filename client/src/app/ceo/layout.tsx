import NavBar from "@/components/header/navBar/navBar";

export default function CEOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-5">
      <NavBar />
      {children}
    </div>
  );
}
