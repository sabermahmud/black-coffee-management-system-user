import AdminNavbar from "./adminNav/AdminNavbar";
import DashboardPage from "./dashboard/page";

export default function AdminPage() {
  return (
    <>
      {/* Dashboard Content */}
      <main className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
        <DashboardPage />
      </main>
    </>
  );
}
