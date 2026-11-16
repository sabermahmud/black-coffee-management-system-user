import AdminNavbar from "./adminNav/AdminNavbar";
import DashboardPage from "./dashboard/page";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F1] border-2">
        <div className="m-4">
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">Admin Page</h2>
        </div>
      {/* Admin Navbar */}
      <header className="sticky top-0 z-50">
        <AdminNavbar />
      </header>

      {/* Dashboard Content */}
      <main className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
        <DashboardPage />
      </main>
    </div>
  );
}
