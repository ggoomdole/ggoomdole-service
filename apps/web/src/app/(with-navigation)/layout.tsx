import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";

export default function WithLayoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-with-navigation flex flex-col">
      <Header />
      {children}
      <BottomNavigation />
    </div>
  );
}
