import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Package,
  Plus,
  ShoppingBag,
  Store,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Total Revenue",
    value: "SAR 8,450",
    change: "+12.5%",
    positive: true,
    description: "Compared to last month",
    icon: Wallet,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    positive: true,
    description: "Compared to last month",
    icon: ShoppingBag,
  },
  {
    title: "Total Products",
    value: "86",
    change: "4 low stock",
    positive: false,
    description: "Products in inventory",
    icon: Package,
  },
  {
    title: "Total Branches",
    value: "04",
    change: "All active",
    positive: true,
    description: "Store locations",
    icon: Store,
  },
];

const salesData = [
  { day: "Sat", value: 45 },
  { day: "Sun", value: 70 },
  { day: "Mon", value: 55 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 95 },
  { day: "Fri", value: 75 },
];

const orders = [
  {
    id: "#BC-1024",
    customer: "Ahmed Hassan",
    product: "Cappuccino",
    date: "Today, 10:45 AM",
    amount: "SAR 18.00",
    status: "Completed",
  },
  {
    id: "#BC-1023",
    customer: "Mohammed Ali",
    product: "Spanish Latte",
    date: "Today, 10:30 AM",
    amount: "SAR 22.00",
    status: "Processing",
  },
  {
    id: "#BC-1022",
    customer: "Omar Khalid",
    product: "Americano",
    date: "Today, 09:50 AM",
    amount: "SAR 12.00",
    status: "Completed",
  },
  {
    id: "#BC-1021",
    customer: "Abdullah Noor",
    product: "Iced Latte",
    date: "Today, 09:15 AM",
    amount: "SAR 20.00",
    status: "Pending",
  },
];

const topProducts = [
  { name: "Spanish Latte", category: "Coffee", sold: 320, percentage: 90 },
  { name: "Cappuccino", category: "Coffee", sold: 280, percentage: 78 },
  {
    name: "Iced Americano",
    category: "Cold Coffee",
    sold: 210,
    percentage: 62,
  },
  { name: "Caramel Macchiato", category: "Coffee", sold: 180, percentage: 45 },
];

function SectionHeading({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-bold text-[#111111]">{title}</h2>
        <p className="mt-1 text-xs text-[#77736E]">{description}</p>
      </div>

      {href && (
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#79543A] hover:text-[#111111]"
        >
          View all <ChevronRight size={15} />
        </Link>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F7F5F1] p-4 sm:p-6 lg:p-8">
      {/* Dashboard Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-[#79543A]">
            BLACK COFFEE / OVERVIEW
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-[#77736E]">
            Welcome back! Here is what is happening in your store.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 rounded-lg border border-[#E7E2DC] bg-white px-4 py-2.5 text-sm font-semibold text-[#292929] transition hover:border-[#79543A]"
          >
            <ShoppingBag size={16} />
            Orders
          </Link>

          <Link
            href="/admin/inventory/add-product"
            className="inline-flex items-center gap-2 rounded-lg bg-[#111111] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#79543A]"
          >
            <Plus size={17} />
            Add Product
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="gap-4 border-[#E7E2DC] bg-white py-5 shadow-none"
            >
              <CardContent className="px-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#77736E]">
                      {stat.title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#111111]">
                      {stat.value}
                    </h3>
                  </div>

                  <div className="rounded-xl bg-[#F7F5F1] p-3 text-[#79543A]">
                    <Icon size={21} />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      stat.positive ? "text-[#228B55]" : "text-[#DC4444]"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {stat.change}
                  </span>

                  <span className="text-xs text-[#77736E]">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Chart and Quick Summary */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Weekly Sales */}
        <Card className="gap-5 border-[#E7E2DC] bg-white py-5 shadow-none xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between px-5">
            <div>
              <CardTitle className="text-base font-bold text-[#111111]">
                Sales Overview
              </CardTitle>
              <CardDescription className="mt-1">
                Your weekly revenue performance
              </CardDescription>
            </div>

            <Badge
              variant="outline"
              className="border-[#E7E2DC] text-[#79543A]"
            >
              This Week
            </Badge>
          </CardHeader>

          <CardContent className="px-5">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-[#111111]">
                SAR 4,280.00
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#228B55]">
                <TrendingUp size={14} />
                12.5% increase this week
              </p>
            </div>

            <div className="flex h-52 items-end justify-between gap-2 sm:gap-4">
              {salesData.map((item) => (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="flex h-full w-full items-end">
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        item.day === "Thu"
                          ? "bg-[#79543A]"
                          : "bg-[#E7DCD1] hover:bg-[#B58A68]"
                      }`}
                      style={{ height: `${item.value}%` }}
                    />
                  </div>

                  <span className="text-xs text-[#77736E]">{item.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Summary */}
        <Card className="gap-5 border-[#E7E2DC] bg-white py-5 shadow-none">
          <CardHeader className="px-5">
            <CardTitle className="text-base font-bold text-[#111111]">
              Store Summary
            </CardTitle>
            <CardDescription>Today's store performance</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 px-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#F7F5F1] p-2.5 text-[#79543A]">
                  <Wallet size={19} />
                </div>
                <span className="text-sm text-[#77736E]">Today's Sales</span>
              </div>
              <span className="font-bold text-[#111111]">SAR 850</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#F7F5F1] p-2.5 text-[#79543A]">
                  <ShoppingBag size={19} />
                </div>
                <span className="text-sm text-[#77736E]">Today's Orders</span>
              </div>
              <span className="font-bold text-[#111111]">64</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#F7F5F1] p-2.5 text-[#79543A]">
                  <Clock size={19} />
                </div>
                <span className="text-sm text-[#77736E]">Pending Orders</span>
              </div>
              <span className="font-bold text-[#DC4444]">08</span>
            </div>

            <div className="border-t border-[#E7E2DC] pt-4">
              <Link
                href="/admin/orders"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#111111] py-3 text-sm font-semibold text-white transition hover:bg-[#79543A]"
              >
                Manage Orders <ArrowUpRight size={16} />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Best Sellers */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Orders */}
        <Card className="min-w-0 gap-4 border-[#E7E2DC] bg-white py-5 shadow-none xl:col-span-2">
          <CardHeader className="px-5">
            <SectionHeading
              title="Recent Orders"
              description="Latest transactions from your store"
              href="/admin/orders"
            />
          </CardHeader>

          <CardContent className="px-5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-162.5 text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E7E2DC] text-xs text-[#77736E]">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-[#F0EDE8] last:border-0"
                    >
                      <td className="py-4 font-semibold text-[#79543A]">
                        {order.id}
                        <p className="mt-1 text-[11px] font-normal text-[#77736E]">
                          {order.date}
                        </p>
                      </td>

                      <td className="py-4 font-medium text-[#292929]">
                        {order.customer}
                      </td>

                      <td className="py-4 text-[#77736E]">{order.product}</td>

                      <td className="py-4 font-semibold text-[#111111]">
                        {order.amount}
                      </td>

                      <td className="py-4">
                        <Badge
                          variant="outline"
                          className={
                            order.status === "Completed"
                              ? "border-[#228B55]/20 bg-[#228B55]/10 text-[#228B55]"
                              : order.status === "Pending"
                                ? "border-[#DC4444]/20 bg-[#DC4444]/10 text-[#DC4444]"
                                : "border-[#79543A]/20 bg-[#79543A]/10 text-[#79543A]"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Best Selling Products */}
        <Card className="gap-5 border-[#E7E2DC] bg-white py-5 shadow-none">
          <CardHeader className="px-5">
            <SectionHeading
              title="Top Products"
              description="Your best-selling items"
              href="/admin/products"
            />
          </CardHeader>

          <CardContent className="space-y-5 px-5">
            {topProducts.map((product, index) => (
              <div key={product.name}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F7F5F1] text-sm font-bold text-[#79543A]">
                      0{index + 1}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#292929]">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#77736E]">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-[#111111]">
                    {product.sold} sold
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-[#F0EDE8]">
                  <div
                    className="h-full rounded-full bg-[#79543A]"
                    style={{ width: `${product.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Inventory Alert */}
      <Card className="mt-6 gap-4 border-[#E7E2DC] bg-white py-5 shadow-none">
        <CardContent className="flex flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#DC4444]/10 p-3 text-[#DC4444]">
              <AlertTriangle size={21} />
            </div>

            <div>
              <h3 className="font-bold text-[#111111]">
                Inventory Attention Required
              </h3>
              <p className="mt-1 text-sm text-[#77736E]">
                4 products are running low on stock. Check your inventory.
              </p>
            </div>
          </div>

          <Link
            href="/admin/inventory"
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#E7E2DC] px-4 py-2.5 text-sm font-semibold text-[#292929] transition hover:border-[#79543A] hover:text-[#79543A]"
          >
            View Inventory <ChevronRight size={16} />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
