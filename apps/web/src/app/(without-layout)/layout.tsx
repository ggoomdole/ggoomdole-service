export default function WithoutLayoutLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-without-layout flex flex-col">{children}</div>;
}
