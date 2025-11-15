import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  FileText,
  MapPin,
  Building2,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sectors = [
  "Agriculture",
  "Automotive",
  "Education",
  "Energy",
  "Finance",
  "Healthcare",
  "IT",
  "Manufacturing",
  "Retail",
  "Others",
];

const categories = [
  "B2B",
  "B2C",
  "B2B2C",
  "C2C",
  "D2C",
  "Hardware",
  "SaaS",
  "Marketplace",
  "Others",
];

const stages = [
  "Ideation",
  "Validation",
  "Early Traction",
  "Scaling",
  "Mature",
];

const designations = ["CEO", "CTO", "CFO", "COO", "CMO", "Other"];

const indianStates = [
  "Andhra Pradesh",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
];

const citiesByState: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra"],
};

const formSchema = z.object({
  step1: z.object({
    name: z.string().min(1, "Startup name is required"),
    entity_name: z.string().min(1, "Entity name is required"),
    sector: z.string().min(1, "Please select a sector"),
    categories: z.string().min(1, "Please select a category"),
    year: z
      .number()
      .int("Year must be a whole number")
      .min(1900, "Year must be after 1900")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    brand_name: z.string().optional(),
    entityRegistrationStatus: z.boolean(),
    stage: z.string().optional(),
    detailsText: z.string().optional(),
    size: z.number().int().min(1, "Team size must be at least 1"),
    incubation_status: z.boolean(),
    startupIndiaRegister: z.boolean(),
  }),
  step2: z.object({
    reg_number: z.string().min(1, "Registration number is required"),
    reg_date: z.string().min(1, "Registration date is required"),
    reg_certificate: z.string().min(1, "Registration certificate is required"),
    gst: z.string().min(1, "GST number is required"),
    ipr: z.boolean(),
  }),
  step3: z.object({
    addrLine1: z.string().min(1, "Address line 1 is required"),
    addLine2: z.string().min(1, "Address line 2 is required"),
    state: z.string().min(1, "Please select a state"),
    city: z.string().min(1, "Please select a city"),
    district: z.string().min(1, "District is required"),
    pincode: z
      .number()
      .int("PIN code must be a number")
      .min(100000, "Invalid PIN code")
      .max(999999, "Invalid PIN code"),
  }),
  step4: z.object({
    founderName: z.string().min(1, "Founder name is required"),
    designation: z.string().min(1, "Please select a designation"),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
    address: z.string().min(1, "Founder address is required"),
    equity: z
      .number()
      .int("Equity must be a whole number")
      .min(0, "Equity cannot be negative")
      .max(100, "Equity cannot exceed 100%"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password too long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    pitch_deck: z.string().min(1, "Pitch deck link is required"),
    Aadhar_Number: z.string().length(12, "Aadhar number must be 12 digits"),
    Pan_Number: z.string().length(10, "PAN number must be 10 characters"),
    Dipp_number: z.string().min(1, "DIPP number is required"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
});

type FormData = z.infer<typeof formSchema>;

const stepTitles = [
  { title: "Basic Information", icon: FileText },
  { title: "Registration Details", icon: Building2 },
  { title: "Address Details", icon: MapPin },
  { title: "Founder Details", icon: ClipboardList },
];

export default function Component() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    setValue,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      step1: {
        name: "",
        entity_name: "",
        sector: "",
        categories: "",
        year: new Date().getFullYear(),
        entityRegistrationStatus: false,
        size: 1,
        incubation_status: false,
        startupIndiaRegister: false,
        brand_name: "",
        stage: "",
        detailsText: "",
      },
      step2: {
        reg_number: "",
        reg_date: "",
        reg_certificate: "",
        gst: "",
        ipr: false,
      },
      step3: {
        addrLine1: "",
        addLine2: "",
        state: "",
        city: "",
        district: "",
        pincode: 100000,
      },
      step4: {
        founderName: "",
        designation: "",
        mobile: "",
        address: "",
        equity: 0,
        email: "",
        password: "",
        confirmPassword: "",
        pitch_deck: "",
        Aadhar_Number: "",
        Pan_Number: "",
        Dipp_number: "",
      },
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submit function called with data:", data);
    console.log("Current step:", step);
    setIsSubmitting(true);
    try {
      const flattenedData = {
        ...data.step1,
        ...data.step2,
        ...data.step3,
        ...data.step4,
        // Remove confirmPassword from the data sent to backend
      };
      // Remove confirmPassword as it's only for validation
      delete flattenedData.confirmPassword;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flattenedData),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const responseData = await response.json();
      console.log(responseData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Registration error:", error);
      setShowFailureModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger(`step${step}` as keyof FormData);
    if (isValid) {
      setCompletedSteps((prev) => [...new Set([...prev, step])]);
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const getStepContent = () => {
    const commonInputClasses = "h-12 text-lg bg-white";
    const commonLabelClasses = "text-sm font-medium text-gray-700";
    const commonErrorClasses = "text-sm text-red-500 mt-1";

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className={commonLabelClasses}>
                  Name of Startup *
                </Label>
                <Input
                  id="name"
                  {...register("step1.name")}
                  className={commonInputClasses}
                />
                {touchedFields.step1?.name && errors.step1?.name && (
                  <p className={commonErrorClasses}>
                    {errors.step1.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="entity_name" className={commonLabelClasses}>
                  Entity Name *
                </Label>
                <Input
                  id="entity_name"
                  {...register("step1.entity_name")}
                  className={commonInputClasses}
                />
                {touchedFields.step1?.entity_name &&
                  errors.step1?.entity_name && (
                    <p className={commonErrorClasses}>
                      {errors.step1.entity_name.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector" className={commonLabelClasses}>
                  Sector *
                </Label>
                <Controller
                  name="step1.sector"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={commonInputClasses}>
                        <SelectValue placeholder="Select Sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {touchedFields.step1?.sector && errors.step1?.sector && (
                  <p className={commonErrorClasses}>
                    {errors.step1.sector.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="categories" className={commonLabelClasses}>
                  Categories *
                </Label>
                <Controller
                  name="step1.categories"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={commonInputClasses}>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {touchedFields.step1?.categories &&
                  errors.step1?.categories && (
                    <p className={commonErrorClasses}>
                      {errors.step1.categories.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="year" className={commonLabelClasses}>
                  Year of Establishment *
                </Label>
                <Input
                  id="year"
                  type="number"
                  {...register("step1.year", { valueAsNumber: true })}
                  className={commonInputClasses}
                />
                {touchedFields.step1?.year && errors.step1?.year && (
                  <p className={commonErrorClasses}>
                    {errors.step1.year.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand_name" className={commonLabelClasses}>
                  Brand Name
                </Label>
                <Input
                  id="brand_name"
                  {...register("step1.brand_name")}
                  className={commonInputClasses}
                />
              </div>
              <div className="space-y-2">
                <Label className={commonLabelClasses}>
                  Entity Registration Status
                </Label>
                <Controller
                  name="step1.entityRegistrationStatus"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="registered" />
                        <Label htmlFor="registered">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="not-registered" />
                        <Label htmlFor="not-registered">No</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage" className={commonLabelClasses}>
                  Current Stage
                </Label>
                <Controller
                  name="step1.stage"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={commonInputClasses}>
                        <SelectValue placeholder="Select Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="detailsText" className={commonLabelClasses}>
                  Details
                </Label>
                <Textarea
                  id="detailsText"
                  {...register("step1.detailsText")}
                  className="min-h-[100px] text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size" className={commonLabelClasses}>
                  Team Size *
                </Label>
                <Input
                  id="size"
                  type="number"
                  {...register("step1.size", { valueAsNumber: true })}
                  className={commonInputClasses}
                />
                {touchedFields.step1?.size && errors.step1?.size && (
                  <p className={commonErrorClasses}>
                    {errors.step1.size.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className={commonLabelClasses}>Incubation Status</Label>
                <Controller
                  name="step1.incubation_status"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="incubated" />
                        <Label htmlFor="incubated">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="not-incubated" />
                        <Label htmlFor="not-incubated">No</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label className={commonLabelClasses}>
                  Registered under Startup India Program
                </Label>
                <Controller
                  name="step1.startupIndiaRegister"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="true"
                          id="registered-startup-india"
                        />
                        <Label htmlFor="registered-startup-india">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="false"
                          id="not-registered-startup-india"
                        />
                        <Label htmlFor="not-registered-startup-india">No</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="reg_number" className={commonLabelClasses}>
                  Registration Number *
                </Label>
                <Input
                  id="reg_number"
                  {...register("step2.reg_number")}
                  className={commonInputClasses}
                />
                {touchedFields.step2?.reg_number &&
                  errors.step2?.reg_number && (
                    <p className={commonErrorClasses}>
                      {errors.step2.reg_number.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg_date" className={commonLabelClasses}>
                  Registration Date *
                </Label>
                <Input
                  id="reg_date"
                  type="date"
                  {...register("step2.reg_date")}
                  className={commonInputClasses}
                />
                {touchedFields.step2?.reg_date && errors.step2?.reg_date && (
                  <p className={commonErrorClasses}>
                    {errors.step2.reg_date.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg_certificate" className={commonLabelClasses}>
                  Registration Certificate *
                </Label>
                <Input
                  id="reg_certificate"
                  {...register("step2.reg_certificate")}
                  className={commonInputClasses}
                />
                {touchedFields.step2?.reg_certificate &&
                  errors.step2?.reg_certificate && (
                    <p className={commonErrorClasses}>
                      {errors.step2.reg_certificate.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gst" className={commonLabelClasses}>
                  GST Number *
                </Label>
                <Input
                  id="gst"
                  {...register("step2.gst")}
                  className={commonInputClasses}
                />
                {touchedFields.step2?.gst && errors.step2?.gst && (
                  <p className={commonErrorClasses}>
                    {errors.step2.gst.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className={commonLabelClasses}>IPR Status</Label>
                <Controller
                  name="step2.ipr"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="ipr-yes" />
                        <Label htmlFor="ipr-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="ipr-no" />
                        <Label htmlFor="ipr-no">No</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="addrLine1" className={commonLabelClasses}>
                  Address Line 1 *
                </Label>
                <Input
                  id="addrLine1"
                  {...register("step3.addrLine1")}
                  className={commonInputClasses}
                />
                {touchedFields.step3?.addrLine1 && errors.step3?.addrLine1 && (
                  <p className={commonErrorClasses}>
                    {errors.step3.addrLine1.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="addLine2" className={commonLabelClasses}>
                  Address Line 2 *
                </Label>
                <Input
                  id="addLine2"
                  {...register("step3.addLine2")}
                  className={commonInputClasses}
                />
                {touchedFields.step3?.addLine2 && errors.step3?.addLine2 && (
                  <p className={commonErrorClasses}>
                    {errors.step3.addLine2.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className={commonLabelClasses}>
                  State *
                </Label>
                <Controller
                  name="step3.state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setValue("step3.city", "");
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className={commonInputClasses}>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {touchedFields.step3?.state && errors.step3?.state && (
                  <p className={commonErrorClasses}>
                    {errors.step3.state.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className={commonLabelClasses}>
                  City *
                </Label>
                <Controller
                  name="step3.city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!watch("step3.state")}
                    >
                      <SelectTrigger className={commonInputClasses}>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {watch("step3.state") &&
                          citiesByState[watch("step3.state")]?.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {touchedFields.step3?.city && errors.step3?.city && (
                  <p className={commonErrorClasses}>
                    {errors.step3.city.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="district" className={commonLabelClasses}>
                  District *
                </Label>
                <Input
                  id="district"
                  {...register("step3.district")}
                  className={commonInputClasses}
                />
                {touchedFields.step3?.district && errors.step3?.district && (
                  <p className={commonErrorClasses}>
                    {errors.step3.district.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode" className={commonLabelClasses}>
                  PIN Code *
                </Label>
                <Input
                  id="pincode"
                  type="number"
                  {...register("step3.pincode", { valueAsNumber: true })}
                  className={commonInputClasses}
                />
                {touchedFields.step3?.pincode && errors.step3?.pincode && (
                  <p className={commonErrorClasses}>
                    {errors.step3.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="founderName" className={commonLabelClasses}>
                  Founder Name *
                </Label>
                <Input
                  id="founderName"
                  {...register("step4.founderName")}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.founderName &&
                  errors.step4?.founderName && (
                    <p className={commonErrorClasses}>
                      {errors.step4.founderName.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation" className={commonLabelClasses}>
                  Designation *
                </Label>
                <Controller
                  name="step4.designation"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={commonInputClasses}>
                        <SelectValue placeholder="Select Designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {designations.map((designation) => (
                          <SelectItem key={designation} value={designation}>
                            {designation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {touchedFields.step4?.designation &&
                  errors.step4?.designation && (
                    <p className={commonErrorClasses}>
                      {errors.step4.designation.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className={commonLabelClasses}>
                  Mobile Number *
                </Label>
                <Input
                  id="mobile"
                  {...register("step4.mobile")}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.mobile && errors.step4?.mobile && (
                  <p className={commonErrorClasses}>
                    {errors.step4.mobile.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className={commonLabelClasses}>
                  Founder Address *
                </Label>
                <Input
                  id="address"
                  {...register("step4.address")}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.address && errors.step4?.address && (
                  <p className={commonErrorClasses}>
                    {errors.step4.address.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="equity" className={commonLabelClasses}>
                  Equity (%) *
                </Label>
                <Input
                  id="equity"
                  type="number"
                  {...register("step4.equity", { valueAsNumber: true })}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.equity && errors.step4?.equity && (
                  <p className={commonErrorClasses}>
                    {errors.step4.equity.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className={commonLabelClasses}>
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("step4.email")}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.email && errors.step4?.email && (
                  <p className={commonErrorClasses}>
                    {errors.step4.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className={commonLabelClasses}>
                  Password *
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("step4.password")}
                  className={commonInputClasses}
                  placeholder="Enter your password"
                />
                {touchedFields.step4?.password && errors.step4?.password && (
                  <p className={commonErrorClasses}>
                    {errors.step4.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className={commonLabelClasses}>
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("step4.confirmPassword")}
                  className={commonInputClasses}
                  placeholder="Confirm your password"
                />
                {touchedFields.step4?.confirmPassword && errors.step4?.confirmPassword && (
                  <p className={commonErrorClasses}>
                    {errors.step4.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pitch_deck" className={commonLabelClasses}>
                  Pitch Deck *
                </Label>
                <Input
                  id="pitch_deck"
                  {...register("step4.pitch_deck")}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.pitch_deck &&
                  errors.step4?.pitch_deck && (
                    <p className={commonErrorClasses}>
                      {errors.step4.pitch_deck.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="Aadhar_Number" className={commonLabelClasses}>
                  Aadhar Number *
                </Label>
                <Input
                  id="Aadhar_Number"
                  {...register("step4.Aadhar_Number")}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.Aadhar_Number &&
                  errors.step4?.Aadhar_Number && (
                    <p className={commonErrorClasses}>
                      {errors.step4.Aadhar_Number.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="Pan_Number" className={commonLabelClasses}>
                  PAN Number *
                </Label>
                <Input
                  id="Pan_Number"
                  {...register("step4.Pan_Number")}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.Pan_Number &&
                  errors.step4?.Pan_Number && (
                    <p className={commonErrorClasses}>
                      {errors.step4.Pan_Number.message}
                    </p>
                  )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="Dipp_number" className={commonLabelClasses}>
                  DIPP Number *
                </Label>
                <Input
                  id="Dipp_number"
                  {...register("step4.Dipp_number")}
                  className={commonInputClasses}
                />
                {touchedFields.step4?.Dipp_number &&
                  errors.step4?.Dipp_number && (
                    <p className={commonErrorClasses}>
                      {errors.step4.Dipp_number.message}
                    </p>
                  )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-28">
      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardContent className="p-0">
          <div className="flex">
            {/* Left sidebar with steps */}
            <div className="w-64 bg-gray-100 p-6 border-r">
              <h2 className="text-lg font-semibold mb-6">Registration Steps</h2>
              <div className="space-y-4">
                {stepTitles.map((stepItem, index) => {
                  const stepNumber = index + 1;
                  const Icon = stepItem.icon;
                  return (
                    <div
                      key={stepNumber}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                        step === stepNumber &&
                          "bg-primary text-primary-foreground",
                        completedSteps.includes(stepNumber) && "text-green-600",
                        step !== stepNumber &&
                          !completedSteps.includes(stepNumber) &&
                          "text-gray-500"
                      )}
                    >
                      <div className="relative">
                        {completedSteps.includes(stepNumber) ? (
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              step === stepNumber
                                ? "bg-primary-foreground text-primary"
                                : "bg-gray-200 text-gray-500"
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                        )}
                        {stepNumber < 4 && (
                          <div
                            className={cn(
                              "absolute left-4 top-8 w-0.5 h-12 -ml-px",
                              completedSteps.includes(stepNumber)
                                ? "bg-green-600"
                                : "bg-gray-300"
                            )}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className={cn(
                            "font-medium",
                            step === stepNumber
                              ? "text-primary-foreground"
                              : completedSteps.includes(stepNumber)
                              ? "text-green-600"
                              : "text-gray-700"
                          )}
                        >
                          {stepItem.title}
                        </p>
                        <p className="text-sm opacity-75">
                          Step {stepNumber} of 4
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 p-8">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                  {stepTitles[step - 1].title}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {getStepContent()}

                  {/* Debug validation errors */}
                  {Object.keys(errors).length > 0 && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                      <h3 className="text-sm font-medium text-red-800 mb-2">Validation Errors:</h3>
                      <div className="text-xs text-red-600">
                        {Object.entries(errors).map(([step, stepErrors]) => (
                          <div key={step} className="mb-2">
                            <strong>{step}:</strong>
                            <ul className="ml-4">
                              {stepErrors && typeof stepErrors === 'object' && 
                                Object.entries(stepErrors).map(([field, error]) => (
                                  <li key={field}>
                                    {field}: {error && typeof error === 'object' && 'message' in error ? (error as { message: string }).message : 'Invalid'}
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        className="flex items-center"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                    )}

                    {step < 4 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="ml-auto flex items-center"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="ml-auto bg-green-600 hover:bg-green-700"
                        disabled={isSubmitting}
                        onClick={() => {
                          console.log("Submit button clicked");
                          console.log("Form errors:", errors);
                          console.log("Current step:", step);
                        }}
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            Submit
                            <Check className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600">
              Registration Successful
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <div className="rounded-full bg-green-100 p-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <p className="text-center text-lg text-gray-600">
            Your startup has been successfully registered.
          </p>
        </DialogContent>
      </Dialog>

      {/* Failure Modal */}
      <Dialog open={showFailureModal} onOpenChange={setShowFailureModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-600">
              Registration Failed
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <div className="rounded-full bg-red-100 p-4">
              <X className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <p className="text-center text-lg text-gray-600">
            There was an error registering your startup. Please try again.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
