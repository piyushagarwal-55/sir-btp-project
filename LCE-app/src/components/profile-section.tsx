import * as React from "react";
import { StartupProfile } from "../Pages/StartupDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Save, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function ProfileSection({
  startup,
  onUpdate,
}: {
  startup: StartupProfile;
  onUpdate: (updatedStartup: StartupProfile) => void;
}) {
  const [editMode, setEditMode] = React.useState<Record<string, boolean>>({});
  const [editedStartup, setEditedStartup] = React.useState(startup);
  const [isChanged, setIsChanged] = React.useState(false);

  const handleEdit = (field: keyof StartupProfile) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
  };

  const handleCancel = (field: keyof StartupProfile) => {
    setEditMode((prev) => ({ ...prev, [field]: false }));
    setEditedStartup((prev) => ({ ...prev, [field]: startup[field] }));
  };

  const handleChange = (
    field: keyof StartupProfile,
    value: string | number | boolean
  ) => {
    setEditedStartup((prev) => ({ ...prev, [field]: value }));
    setIsChanged(true);
  };

  const handleSave = async (field: keyof StartupProfile) => {
    try {
      const response = await fetch(
        `https://lce-backend-j2kx.onrender.com/startups/update/${startup.user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [field]: editedStartup[field] }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update startup profile");
      }

      setEditMode((prev) => ({ ...prev, [field]: false }));
      onUpdate(editedStartup);
      setIsChanged(false);
    } catch (error) {
      console.error("Error updating startup profile:", error);
    }
  };

  const renderField = (
    label: string,
    field: keyof StartupProfile,
    type: string = "text"
  ) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="flex items-center space-x-2">
        {editMode[field] ? (
          <>
            {type === "textarea" ? (
              <Textarea
                id={field}
                value={editedStartup[field] as string}
                onChange={(e) => handleChange(field, e.target.value)}
                className="flex-1"
              />
            ) : type === "boolean" ? (
              <Switch
                id={field}
                checked={editedStartup[field] as boolean}
                onCheckedChange={(checked) => handleChange(field, checked)}
              />
            ) : (
              <Input
                id={field}
                type={type}
                value={editedStartup[field] as string}
                onChange={(e) =>
                  handleChange(
                    field,
                    type === "number" ? Number(e.target.value) : e.target.value
                  )
                }
                className="flex-1"
              />
            )}
            <Button size="sm" onClick={() => handleSave(field)}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCancel(field)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </>
        ) : (
          <>
            <span className="flex-1 text-sm">
              {typeof startup[field] === "boolean" ? (
                <Switch
                  checked={startup[field] as boolean}
                  onCheckedChange={() => {}}
                  disabled
                />
              ) : (
                startup[field]
              )}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(field)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-indigo-700 text-white p-6">
        <CardTitle className="text-2xl font-bold">Startup Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("Name", "name")}
            {renderField("Entity Name", "entity_name")}
            {renderField("Sector", "sector")}
            {renderField("Categories", "categories")}
            {renderField("Year", "year", "number")}
            {renderField("Brand Name", "brand_name")}
            {renderField("Stage", "stage")}
            {renderField("Size", "size", "number")}
          </div>
          <Separator />
          <div className="space-y-4">
            {renderField(
              "Entity Registration Status",
              "entityRegistrationStatus",
              "boolean"
            )}
            {renderField("Incubation Status", "incubation_status", "boolean")}
            {renderField(
              "Startup India Registration",
              "startupIndiaRegister",
              "boolean"
            )}
          </div>
          <Separator />
          {renderField("Details", "detailsText", "textarea")}
          <div className="flex items-center justify-between mt-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Approval Status
              </Label>
              <Badge
                variant={startup.isApproved ? "default" : "secondary"}
                className="mt-1"
              >
                {startup.isApproved ? "Approved" : "Pending"}
              </Badge>
            </div>
            {isChanged && (
              <Button
                onClick={() => onUpdate(editedStartup)}
                className="bg-indigo-700 text-white hover:bg-indigo-800"
              >
                Save All Changes
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
