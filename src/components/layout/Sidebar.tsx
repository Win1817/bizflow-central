import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Receipt,
  Users,
  UserPlus,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  Boxes,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `nav-link ${isActive(path) ? "nav-link-active" : ""}`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <img
              src="/favicon.ico"
              alt="BizFlow Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="text-xl font-bold text-sidebar-accent-foreground">
            BizFlow
          </span>
        </div>
        <p className="text-xs text-sidebar-muted mt-1">
          Business Management
        </p>
      </div>


      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* Dashboard */}
        <div className="module-section">
          <Link to="/" className={navLinkClass("/")}>
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
        </div>

        {/* Sales Module */}
        <div className="module-section mt-4">
          <p className="module-title">Sales</p>
          <Link to="/sales/orders" className={navLinkClass("/sales/orders")}>
            <ShoppingCart className="w-5 h-5" />
            Sales Orders
          </Link>
          <Link to="/sales/quotations" className={navLinkClass("/sales/quotations")}>
            <FileText className="w-5 h-5" />
            Quotations
          </Link>
          <Link to="/sales/invoices" className={navLinkClass("/sales/invoices")}>
            <Receipt className="w-5 h-5" />
            Invoices
          </Link>
        </div>

        {/* CRM Module */}
        <div className="module-section mt-4">
          <p className="module-title">CRM</p>
          <Link to="/crm/customers" className={navLinkClass("/crm/customers")}>
            <Users className="w-5 h-5" />
            Customers
          </Link>
          <Link to="/crm/leads" className={navLinkClass("/crm/leads")}>
            <UserPlus className="w-5 h-5" />
            Leads
          </Link>
        </div>

        {/* Inventory Module */}
        <div className="module-section mt-4">
          <p className="module-title">Inventory</p>
          <Link to="/inventory/products" className={navLinkClass("/inventory/products")}>
            <Package className="w-5 h-5" />
            Products
          </Link>
          <Link to="/inventory/stock-in" className={navLinkClass("/inventory/stock-in")}>
            <ArrowDownToLine className="w-5 h-5" />
            Stock In
          </Link>
          <Link to="/inventory/stock-out" className={navLinkClass("/inventory/stock-out")}>
            <ArrowUpFromLine className="w-5 h-5" />
            Stock Out
          </Link>
          <Link to="/inventory/suppliers" className={navLinkClass("/inventory/suppliers")}>
            <Truck className="w-5 h-5" />
            Suppliers
          </Link>
        </div>

        {/* Reports */}
        <div className="module-section mt-4">
          <p className="module-title">Reports</p>
          <Link to="/reports" className={navLinkClass("/reports")}>
            <BarChart3 className="w-5 h-5" />
            Analytics
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <Link to="/settings" className={navLinkClass("/settings")}>
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button className="nav-link w-full text-left">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
