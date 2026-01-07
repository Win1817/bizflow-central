
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreHorizontal, User, Mail, Phone, Building } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const leads: any[] = [];

const Leads = () => {
  const newLeads = leads.filter((l) => l.status === "new");
  const pendingLeads = leads.filter((l) => l.status === "pending");
  const convertedLeads = leads.filter((l) => l.status === "converted");
  const closedLeads = leads.filter((l) => l.status === "closed");

  const LeadCard = ({ lead }: { lead: any }) => (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{lead.name}</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                <Building className="w-3 h-3" />
                {lead.company}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Lead</DropdownMenuItem>
              <DropdownMenuItem>Convert to Customer</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Mark as Lost
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Mail className="w-3 h-3" />
            {lead.email}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Phone className="w-3 h-3" />
            {lead.phone}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Source: {lead.source}</span>
          <span className="text-xs text-muted-foreground">{lead.createdAt}</span>
        </div>
      </CardContent>
    </Card>
  );

  const NoLeads = ({ message }: { message: string }) => (
    <div className="text-center text-sm text-muted-foreground py-4">
      {message}
    </div>
  );

  return (
    <MainLayout
      title="Leads"
      description="Track and convert sales leads"
    >
      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
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
          Add Lead
        </Button>
      </div>

      {/* Kanban Board */}
      {leads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* New */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">New</h3>
                <span className="text-xs bg-info/10 text-info px-2 py-0.5 rounded-full">
                  {newLeads.length}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {newLeads.length > 0 ? (
                newLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <NoLeads message="No new leads." />
              )}
            </div>
          </div>

          {/* In Progress */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">In Progress</h3>
                <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full">
                  {pendingLeads.length}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {pendingLeads.length > 0 ? (
                pendingLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <NoLeads message="No leads in progress." />
              )}
            </div>
          </div>

          {/* Converted */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Converted</h3>
                <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                  {convertedLeads.length}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {convertedLeads.length > 0 ? (
                convertedLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <NoLeads message="No converted leads." />
              )}
            </div>
          </div>

          {/* Closed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Closed</h3>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  {closedLeads.length}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {closedLeads.length > 0 ? (
                closedLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
              ) : (
                <NoLeads message="No closed leads." />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No leads yet</h3>
          <p className="text-muted-foreground mt-2">When a new lead is added, it will appear here</p>
          <Button size="sm" className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default Leads;
