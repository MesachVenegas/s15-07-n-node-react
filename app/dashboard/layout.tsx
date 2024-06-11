import DashboardMenu from "./_components/nav-menu";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
		<main className="flex flex-col justify-start items-center min-h-screen w-full bg-gradient">
      <DashboardMenu />
      <div className="flex flex-col gap-2 w-full p-4">
			  {children}
      </div>
		</main>
	);
}