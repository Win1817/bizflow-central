
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, MoreHorizontal, FileText } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoices: any[] = [];

const Invoices = () => {
  return (
    <MainLayout
      title="Invoices"
      description="Track and manage customer invoices"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="w-80 pl-9"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      {invoices.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="cursor-pointer">
                    <td className="font-semibold text-accent flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {invoice.id}
                    </td>
                    <td className="text-muted-foreground">{invoice.orderId}</td>
                    <td className="font-medium">{invoice.customer}</td>
                    <td className="text-muted-foreground">{invoice.date}</td>
                    <td className="text-muted-foreground">{invoice.dueDate}</td>
                    <td className="font-semibold">${invoice.total.toLocaleString()}</td>
                    <td>
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Invoice</DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Send to Customer</DropdownMenuItem>
                          <DropdownMenuItem>Record Payment</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Void Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No invoices yet</h3>
          <p className="text-muted-foreground mt-1">Create your first invoice to get started</p>
          <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Outstanding</p>
          <p className="text-2xl font-bold text-foreground mt-1">$0.00</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Overdue</p>
          <p className="text-2xl font-bold text-destructive mt-1">$0.00</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Collected This Month</p>
          <p className="text-2xl font-bold text-success mt-1">$0.00</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Invoices;
