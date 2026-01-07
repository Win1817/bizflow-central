
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

const salesOrders: any[] = [];

const SalesOrders = () => {
  return (
    <MainLayout
      title="Sales Orders"
      description="Manage and track customer sales orders"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
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
            New Sales Order
          </Button>
        </div>
      </div>

      {/* Sales Orders Table */}
      {salesOrders.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Order Date</th>
                  <th>Expected Delivery</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {salesOrders.map((order) => (
                  <tr key={order.id} className="cursor-pointer">
                    <td className="font-semibold text-accent flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {order.id}
                    </td>
                    <td className="font-medium">{order.customer}</td>
                    <td className="text-muted-foreground">{order.date}</td>
                    <td className="text-muted-foreground">{order.deliveryDate}</td>
                    <td className="font-semibold">${order.total.toLocaleString()}</td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Order</DropdownMenuItem>
                          <DropdownMenuItem>Create Invoice</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Shipped</DropdownMenuItem>
                          <DropdownMenuItem>Download Picking List</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Cancel Order
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
          <h3 className="text-lg font-medium text-foreground">No sales orders found</h3>
          <p className="text-muted-foreground mt-1">Create your first sales order to get started</p>
          <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Sales Order
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default SalesOrders;
