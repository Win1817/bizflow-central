
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreHorizontal, Truck, Mail, Phone, MapPin } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const suppliers: any[] = [];

const Suppliers = () => {
  return (
    <MainLayout
      title="Suppliers"
      description="Manage your supplier network"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
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
          Add Supplier
        </Button>
      </div>

      {/* Suppliers Grid */}
      {suppliers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{supplier.name}</h3>
                      <p className="text-sm text-muted-foreground">{supplier.id}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                      <DropdownMenuItem>Create PO</DropdownMenuItem>
                      <DropdownMenuItem>View Orders</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Deactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-foreground font-medium">
                    Contact: {supplier.contact}
                  </p>
                  <p className="text-sm flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {supplier.email}
                  </p>
                  <p className="text-sm flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {supplier.phone}
                  </p>
                  <p className="text-sm flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {supplier.address}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <StatusBadge status={supplier.status} />
                  <Button variant="outline" size="sm">
                    Create PO
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-lg font-semibold">No suppliers found</h3>
          <p className="text-muted-foreground mt-2">Get started by adding a new supplier.</p>
          <Button size="sm" className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default Suppliers;
