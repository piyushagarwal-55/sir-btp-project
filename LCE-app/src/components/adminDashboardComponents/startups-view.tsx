import * as React from "react";
import { Card } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";

type RegistrationDetails = {
  user_id: string;
  reg_number: string;
  reg_date: string;
  reg_certificate: string;
  gst: string;
  ipr: boolean;
};

type RegisteredAddress = {
  addr_id: number;
  addrLine1: string;
  addLine2: string;
  state: string;
  city: string;
  district: string;
  pincode: number;
};

type Founder = {
  founderid: string;
  user_id: string;
  name: string;
  designation: string;
  mobile: string;
  address: string;
  equity: number;
  email: string;
};

type Documents = {
  user_id: string;
  pitch_deck: string;
  Aadhar_Number: string;
  Pan_Number: string;
  Reg_certificate: string;
  Dipp_number: string;
};

type StartupProfile = {
  user_id: string;
  name: string;
  entity_name: string;
  sector: string;
  categories: string;
  year: number;
  brand_name: string | null;
  entityRegistrationStatus: boolean | null;
  stage: string | null;
  detailsText: string | null;
  size: number;
  incubation_status: boolean;
  isApproved: boolean;
  startupIndiaRegister: boolean;
  registrations: RegistrationDetails | null;
  addresses: RegisteredAddress[];
  founders: Founder[];
  documents: Documents | null;
};

export function StartupsView() {
  const [startups, setStartups] = React.useState<StartupProfile[]>([]);
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
        "https://lce-backend-j2kx.onrender.com/startups/getStartupList"
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

  const handleAddStartup = async (
    startupData: Omit<StartupProfile, "user_id">
  ) => {
    try {
      const response = await fetch(
        "https://lce-backend-j2kx.onrender.com/startups/addStartup",
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
    userId: string,
    startupData: Partial<StartupProfile>
  ) => {
    try {
      const response = await fetch(
        `https://lce-backend-j2kx.onrender.com/startups/update/${userId}`,
        {
          method: "PATCH",
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

  const handleDeleteStartup = async (userId: string) => {
    try {
      const response = await fetch(
        `https://lce-backend-j2kx.onrender.com/startups/reject/${userId}`,
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
    return <div>Loading startups...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Startups</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Startup
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Startup</DialogTitle>
              <DialogDescription>
                Create a new startup by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <StartupForm onSubmit={handleAddStartup} />
          </DialogContent>
        </Dialog>
      </div>
      <Card className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Approval Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {startups.map((startup) => (
              <TableRow key={startup.user_id}>
                <TableCell className="font-medium">{startup.name}</TableCell>
                <TableCell>{startup.sector}</TableCell>
                <TableCell>{startup.year}</TableCell>
                <TableCell>{startup.stage || "N/A"}</TableCell>
                <TableCell>
                  <Badge variant={startup.isApproved ? "default" : "secondary"}>
                    {startup.isApproved ? "Approved" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Startup</DialogTitle>
                            <DialogDescription>
                              Make changes to the startup details below.
                            </DialogDescription>
                          </DialogHeader>
                          <StartupForm
                            onSubmit={(data) =>
                              handleEditStartup(startup.user_id, data)
                            }
                            initialData={startup}
                          />
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem
                        onClick={() => handleDeleteStartup(startup.user_id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function StartupForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (data: Omit<StartupProfile, "user_id">) => void;
  initialData?: StartupProfile;
}) {
  const [formData, setFormData] = React.useState<
    Omit<StartupProfile, "user_id">
  >({
    name: initialData?.name || "",
    entity_name: initialData?.entity_name || "",
    sector: initialData?.sector || "",
    categories: initialData?.categories || "",
    year: initialData?.year || new Date().getFullYear(),
    brand_name: initialData?.brand_name || "",
    entityRegistrationStatus: initialData?.entityRegistrationStatus || false,
    stage: initialData?.stage || "",
    detailsText: initialData?.detailsText || "",
    size: initialData?.size || 0,
    incubation_status: initialData?.incubation_status || false,
    isApproved: initialData?.isApproved || false,
    startupIndiaRegister: initialData?.startupIndiaRegister || false,
    registrations: initialData?.registrations || null,
    addresses: initialData?.addresses || [],
    founders: initialData?.founders || [],
    documents: initialData?.documents || null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Startup Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="entity_name">Entity Name</Label>
        <Input
          id="entity_name"
          name="entity_name"
          value={formData.entity_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sector">Sector</Label>
        <Input
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="categories">Categories</Label>
        <Input
          id="categories"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="brand_name">Brand Name</Label>
        <Input
          id="brand_name"
          name="brand_name"
          value={formData.brand_name || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stage">Stage</Label>
        <Input
          id="stage"
          name="stage"
          value={formData.stage || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="size">Team Size</Label>
        <Input
          id="size"
          name="size"
          type="number"
          value={formData.size}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="detailsText">Details</Label>
        <Textarea
          id="detailsText"
          name="detailsText"
          value={formData.detailsText || ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="entityRegistrationStatus"
          name="entityRegistrationStatus"
          checked={formData.entityRegistrationStatus || false}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor="entityRegistrationStatus">
          Entity Registration Status
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="incubation_status"
          name="incubation_status"
          checked={formData.incubation_status || false}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor="incubation_status">Incubation Status</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isApproved"
          name="isApproved"
          checked={formData.isApproved || false}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor="isApproved">Approval Status</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="startupIndiaRegister"
          name="startupIndiaRegister"
          checked={formData.startupIndiaRegister || false}
          onChange={handleCheckboxChange}
        />
        <Label htmlFor="startupIndiaRegister">Startup India Registration</Label>
      </div>
      <Button type="submit">Save Startup</Button>
    </form>
  );
}
