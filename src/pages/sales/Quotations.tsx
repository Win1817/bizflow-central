
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

const quotations: any[] = [];

const Quotations = () => {
  return (
    <MainLayout
      title="Quotations"
      description="Create and manage sales quotations"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search quotations..."
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
            New Quotation
          </Button>
        </div>
      </div>

      {/* Quotations Table */}
      {quotations.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quote ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Expiry Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((quote) => (
                  <tr key={quote.id} className="cursor-pointer">
                    <td className="font-semibold text-accent flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {quote.id}
                    </td>
                    <td className="font-medium">{quote.customer}</td>
                    <td className="text-muted-foreground">{quote.date}</td>
                    <td className="text-muted-foreground">{quote.expiryDate}</td>
                    <td className="font-semibold">${quote.total.toLocaleString()}</td>
                    <td>
                      <StatusBadge status={quote.status} />
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Quotation</DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Create Sales Order</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Sent</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Cancel Quotation
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
          <h3 className="text-lg font-medium text-foreground">No quotations yet</h3>
          <p className="text-muted-foreground mt-1">Create your first quotation to send to a customer</p>
          <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            New Quotation
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default Quotations;
