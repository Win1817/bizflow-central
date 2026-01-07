
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, ArrowDownToLine } from "lucide-react";

const stockMovements: any[] = [];

const StockIn = () => {
  const stockInMovements = stockMovements.filter((m) => m.type === "in");

  return (
    <MainLayout
      title="Stock In"
      description="Record incoming inventory"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search movements..."
              className="w-80 pl-9"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Record Stock In
        </Button>
      </div>

      {/* Stock In Table */}
      {stockInMovements.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Reference</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {stockInMovements.map((movement) => (
                  <tr key={movement.id}>
                    <td className="font-medium">{movement.id}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                          <ArrowDownToLine className="w-4 h-4 text-success" />
                        </div>
                        {movement.product}
                      </div>
                    </td>
                    <td className="font-mono text-sm text-muted-foreground">{movement.sku}</td>
                    <td className="font-semibold text-success">+{movement.quantity}</td>
                    <td className="text-muted-foreground">{movement.date}</td>
                    <td className="text-accent">{movement.reference}</td>
                    <td className="text-muted-foreground">{movement.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-12">
          <ArrowDownToLine className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No stock in records</h3>
          <p className="text-muted-foreground mt-1">Record your first stock receipt to get started</p>
          <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Record Stock In
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default StockIn;
