import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type Program = {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
};

export function ProgramsView() {
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://lce-backend-j2kx.onrender.com/programs/programs"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch programs");
      }
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setError("Failed to fetch programs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProgram = async (programData: Omit<Program, "id">) => {
    try {
      const response = await fetch(
        "https://lce-backend-j2kx.onrender.com/programs/addProgram",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add program");
      }
      fetchPrograms();
    } catch (error) {
      console.error("Error adding program:", error);
      setError("Failed to add program. Please try again later.");
    }
  };

  const handleEditProgram = async (
    id: number,
    programData: Omit<Program, "id">
  ) => {
    try {
      const response = await fetch(
        `https://lce-backend-j2kx.onrender.com/programs/programs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update program");
      }
      fetchPrograms();
    } catch (error) {
      console.error("Error updating program:", error);
      setError("Failed to update program. Please try again later.");
    }
  };

  const handleDeleteProgram = async (id: number) => {
    try {
      const response = await fetch(
        `https://lce-backend-j2kx.onrender.com/programs/programs/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete program");
      }
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
      setError("Failed to delete program. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>Loading programs...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Program</DialogTitle>
              <DialogDescription>
                Create a new program by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <ProgramForm onSubmit={handleAddProgram} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onEdit={(data) => handleEditProgram(program.id, data)}
            onDelete={() => handleDeleteProgram(program.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ProgramCard({
  program,
  onEdit,
  onDelete,
}: {
  program: Program;
  onEdit: (data: Omit<Program, "id">) => void;
  onDelete: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{program.title}</CardTitle>
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
                    <DialogTitle>Edit Program</DialogTitle>
                    <DialogDescription>
                      Make changes to the program details below.
                    </DialogDescription>
                  </DialogHeader>
                  <ProgramForm onSubmit={onEdit} />
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
        <p className="text-sm text-muted-foreground">{program.description}</p>
        <ul className="mt-2 list-disc list-inside">
          {program.features.map((feature, index) => (
            <li key={index} className="text-sm">
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function ProgramForm({
  onSubmit,
}: {
  onSubmit: (data: Omit<Program, "id">) => void;
}) {
  const [formData, setFormData] = React.useState<Omit<Program, "id">>({
    title: "",
    description: "",
    icon: "",
    features: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value
      .split("\n")
      .filter((feature) => feature.trim() !== "");
    setFormData((prev) => ({ ...prev, features }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
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
        <Label htmlFor="icon">Icon</Label>
        <Input
          id="icon"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          name="features"
          value={formData.features.join("\n")}
          onChange={handleFeaturesChange}
          required
        />
      </div>
      <Button type="submit">Save Program</Button>
    </form>
  );
}
