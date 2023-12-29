export default function infoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="flex flex-col w-full h-full">{children}</section>;
}
