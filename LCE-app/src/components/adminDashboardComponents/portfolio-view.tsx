import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";

type Startup = {
  id: number;
  name: string;
  icon: string;
  description: string;
  website: string;
  category: string;
  impact: string;
  team: string;
  growth: string;
};

export function PortfolioView() {
  const [startups, setStartups] = React.useState<Startup[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://lce-backend-j2kx.onrender.com/portfolios/portfolios"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch startups");
      }
      const data = await response.json();
      setStartups(data);
    } catch (error) {
      console.error("Error fetching startups:", error);
      setError("Failed to fetch startups. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStartup = async (startupData: Omit<Startup, "id">) => {
    try {
      const response = await fetch(
        "https://lce-backend-j2kx.onrender.com/portfolios/addPortfolios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(startupData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add startup");
      }
      fetchStartups();
    } catch (error) {
      console.error("Error adding startup:", error);
      setError("Failed to add startup. Please try again later.");
    }
  };

  const handleEditStartup = async (
    id: number,
    startupData: Omit<Startup, "id">
  ) => {
    try {
      const response = await fetch(
        `https://lce-backend-j2kx.onrender.com/portfolios/portfolios/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(startupData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update startup");
      }
      fetchStartups();
    } catch (error) {
      console.error("Error updating startup:", error);
      setError("Failed to update startup. Please try again later.");
    }
  };

  const handleDeleteStartup = async (id: number) => {
    try {
      const response = await fetch(
        `https://lce-backend-j2kx.onrender.com/portfolios/portfolios/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete startup");
      }
      fetchStartups();
    } catch (error) {
      console.error("Error deleting startup:", error);
      setError("Failed to delete startup. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>Loading portfolio...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Startup
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Startup</DialogTitle>
              <DialogDescription>
                Add a new startup to the portfolio by filling out the form
                below.
              </DialogDescription>
            </DialogHeader>
            <StartupForm onSubmit={handleAddStartup} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {startups.map((startup) => (
          <StartupCard
            key={startup.id}
            startup={startup}
            onEdit={(data) => handleEditStartup(startup.id, data)}
            onDelete={() => handleDeleteStartup(startup.id)}
          />
        ))}
      </div>
    </div>
  );
}

function StartupCard({
  startup,
  onEdit,
  onDelete,
}: {
  startup: Startup;
  onEdit: (data: Omit<Startup, "id">) => void;
  onDelete: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <img
              src={startup.icon}
              alt={`${startup.name} icon`}
              className="w-6 h-6 mr-2"
            />
            {startup.name}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Startup</DialogTitle>
                    <DialogDescription>
                      Make changes to the startup details below.
                    </DialogDescription>
                  </DialogHeader>
                  <StartupForm onSubmit={onEdit} initialData={startup} />
                </DialogContent>
              </Dialog>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{startup.description}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm">
            <strong>Category:</strong> {startup.category}
          </p>
          <p className="text-sm">
            <strong>Impact:</strong> {startup.impact}
          </p>
          <p className="text-sm">
            <strong>Team:</strong> {startup.team}
          </p>
          <p className="text-sm">
            <strong>Growth:</strong> {startup.growth}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(startup.website, "_blank")}
        >
          Visit Website
        </Button>
      </CardFooter>
    </Card>
  );
}

function StartupForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: Omit<Startup, "id">) => void;
  initialData?: Startup;
}) {
  const [formData, setFormData] = React.useState(
    initialData || {
      name: "",
      icon: "",
      description: "",
      website: "",
      category: "",
      impact: "",
      team: "",
      growth: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="icon">Icon URL</Label>
        <Input
          id="icon"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="impact">Impact</Label>
        <Input
          id="impact"
          name="impact"
          value={formData.impact}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="team">Team</Label>
        <Input
          id="team"
          name="team"
          value={formData.team}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="growth">Growth</Label>
        <Input
          id="growth"
          name="growth"
          value={formData.growth}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Save Startup</Button>
    </form>
  );
}
