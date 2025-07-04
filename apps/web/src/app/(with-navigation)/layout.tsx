import BottomNavigation from "@/components/bottom-navigation";

export default function WithLayoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-with-navigation pb-navigation flex flex-col">
      {children}
      <BottomNavigation />
    </div>
  );
}
