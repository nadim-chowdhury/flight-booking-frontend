import Link from "next/link";
import Dashboard from "../../components/Dashboard";

export default function AdminPage() {
  // Define the sections dynamically
  const adminSections = [
    { href: "/admin/airlines", label: "Manage Airlines" },
    { href: "/admin/airports", label: "Manage Airports" },
    { href: "/admin/bookings", label: "Manage Bookings" },
    { href: "/admin/countries", label: "Manage Countries" },
    { href: "/admin/flights", label: "Manage Flights" },
    { href: "/admin/planes", label: "Manage Planes" },
    { href: "/admin/reports", label: "Manage Reports" },
    { href: "/admin/routes", label: "Manage Routes" },
    { href: "/admin/users", label: "Manage users" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Dashboard />

      <ul className="grid grid-cols-4 gap-4">
        {adminSections.map((section) => (
          <li key={section.href}>
            <Link href={section.href}>
              <div className="text-blue-500 hover:underline bg-slate-50 border p-6 rounded-md">
                {section.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
