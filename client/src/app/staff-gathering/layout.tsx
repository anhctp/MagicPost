import NavBar from "@/components/header/navBar/navBar";

export default function StaffGatheringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
