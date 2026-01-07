
import MainLayout from "@/components/layout/MainLayout";
import MetricCard from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Package,
  Activity,
  FileText,
} from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Mon", sales: 0 },
  { name: "Tue", sales: 0 },
  { name: "Wed", sales: 0 },
  { name: "Thu", sales: 0 },
  { name: "Fri", sales: 0 },
  { name: "Sat", sales: 0 },
  { name: "Sun", sales: 0 },
];

const dashboardMetrics = {
  totalSales: { value: 0, change: "+0%", changeType: "increase" as const },
  totalOrders: { value: 0, change: "+0%", changeType: "increase" as const },
  activeCustomers: { value: 0, change: "+0%", changeType: "increase" as const },
  lowStockItems: { value: 0, change: "+0%", changeType: "increase" as const },
};

const recentActivity: any[] = [];
const salesOrders: any[] = [];
const products: any[] = [];

const Dashboard = () => {
  const lowStockProducts = products.filter((p) => p.stock < p.minStock);

  return (
    <MainLayout title="Dashboard" description="Welcome back, here's your business overview">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Sales (MTD)"
          value={`$${dashboardMetrics.totalSales.value.toLocaleString()}`}
          change={dashboardMetrics.totalSales.change}
          changeType={dashboardMetrics.totalSales.changeType}
          icon={DollarSign}
        />
        <MetricCard
          title="Total Orders"
          value={dashboardMetrics.totalOrders.value.toString()}
          change={dashboardMetrics.totalOrders.change}
          changeType={dashboardMetrics.totalOrders.changeType}
          icon={ShoppingCart}
        />
        <MetricCard
          title="Active Customers"
          value={dashboardMetrics.activeCustomers.value.toString()}
          change={dashboardMetrics.activeCustomers.change}
          changeType={dashboardMetrics.activeCustomers.changeType}
          icon={Users}
        />
        <MetricCard
          title="Low Stock Items"
          value={dashboardMetrics.lowStockItems.value.toString()}
          change={dashboardMetrics.lowStockItems.change}
          changeType={dashboardMetrics.lowStockItems.changeType}
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Weekly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="px-6 py-3">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.details}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{activity.time}</p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <Activity className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                  <p>No recent activity.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <a
              href="/sales/orders"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </a>
          </CardHeader>
          <CardContent className="p-0">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {salesOrders.length > 0 ? (
                  salesOrders.slice(0, 4).map((order) => (
                    <tr key={order.id}>
                      <td className="font-medium">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>${order.total.toLocaleString()}</td>
                      <td>
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-muted-foreground">
                      <FileText className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                      <p>No recent orders to show.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Low Stock Alert
            </CardTitle>
            <a
              href="/inventory/products"
              className="text-sm text-accent hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-4 h-4" />
            </a>
          </CardHeader>
          <CardContent className="p-0">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Stock</th>
                  <th>Min</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="font-medium flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        {product.name}
                      </td>
                      <td className="text-muted-foreground">{product.sku}</td>
                      <td className="text-destructive font-medium">{product.stock}</td>
                      <td>{product.minStock}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-muted-foreground">
                      <Package className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                      <p>No low stock items.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
