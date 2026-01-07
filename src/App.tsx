import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Sales
import SalesOrders from "./pages/sales/SalesOrders";
import Quotations from "./pages/sales/Quotations";
import Invoices from "./pages/sales/Invoices";

// CRM
import Customers from "./pages/crm/Customers";
import Leads from "./pages/crm/Leads";

// Inventory
import Products from "./pages/inventory/Products";
import StockIn from "./pages/inventory/StockIn";
import StockOut from "./pages/inventory/StockOut";
import Suppliers from "./pages/inventory/Suppliers";

// Reports & Settings
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Sales Routes */}
          <Route path="/sales/orders" element={<SalesOrders />} />
          <Route path="/sales/quotations" element={<Quotations />} />
          <Route path="/sales/invoices" element={<Invoices />} />
          
          {/* CRM Routes */}
          <Route path="/crm/customers" element={<Customers />} />
          <Route path="/crm/leads" element={<Leads />} />
          
          {/* Inventory Routes */}
          <Route path="/inventory/products" element={<Products />} />
          <Route path="/inventory/stock-in" element={<StockIn />} />
          <Route path="/inventory/stock-out" element={<StockOut />} />
          <Route path="/inventory/suppliers" element={<Suppliers />} />
          
          {/* Reports & Settings */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
