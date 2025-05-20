import * as React from "react";
import { format, parse, isValid } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "lucide-react";
import { DayPicker, DropdownProps } from "react-day-picker";

export function CustomSelectDropdown(props: DropdownProps) {
  const { options, value, onChange } = props;
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
  };
  return (
    <Select value={value?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function CustomDropdown({
  selected,
  onSelect,
}: {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}) {
  return (
    <DayPicker
      captionLayout="dropdown"
      components={{ Dropdown: CustomSelectDropdown }}
      mode="single"
      selected={selected}
      onSelect={onSelect}
      className="bg-white border rounded-md shadow-md p-3 w-[180px]"
    />
  );
}

export type AddUserFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  designation: string;
  dateofbirth: string;
  dateofjoninig: string;
  dob: Date | undefined;
  doj: Date | undefined;
};

type CardWithAddUserProps = {
  values: AddUserFormValues;
  onChange: <K extends keyof AddUserFormValues>(
    field: K,
    value: AddUserFormValues[K]
  ) => void;
  onCancel?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  errors?: Partial<Record<keyof AddUserFormValues, string>>;
  submitted?: boolean;
  loading?: boolean;
};

export function CardWithAddUser({
  values,
  onChange,
  onCancel,
  onSubmit,
  errors = {},
  submitted,
  loading,
}: CardWithAddUserProps) {

  const [isDobPopoverOpen, setIsDobPopoverOpen] = React.useState(false);
  const [isDojPopoverOpen, setIsDojPopoverOpen] = React.useState(false);

  const showError = (field: keyof AddUserFormValues) =>
    (submitted || !!errors[field]) && errors[field];

  const handleDateInput = (
    value: string,
    fieldDate: "dob" | "doj",
    fieldString: "dateofbirth" | "dateofjoninig"
  ) => {
    onChange(fieldString, value);
    try {
      let parsedDate = parse(value, "PPP", new Date());
      if (!isValid(parsedDate)) {
        parsedDate = parse(value, "MM/dd/yyyy", new Date());
      }
      if (!isValid(parsedDate)) {
        parsedDate = parse(value, "yyyy-MM-dd", new Date());
      }
      if (isValid(parsedDate)) {
        onChange(fieldDate, parsedDate);
      } else {
        onChange(fieldDate, undefined);
      }
    } catch {
      onChange(fieldDate, undefined);
    }
  };

  return (
    <Card className="w-[900px] mx-10 my-10 shadow-md  bg-(--an-color-text-Adduser) pt-[30px] pb-[0px] ">
      <CardHeader>
        <CardTitle className="flex">
          <div className="font-[urbanist] text-(--an-color-text-cardtitlec) text-(length:--an-text-cardtitle-font-sizec) leading-(--an-text-cardtitle-line-heightc) font-(--an-text-cardtitle-font-weightc)">
            Add User
          </div>
        </CardTitle>
        <CardDescription className="capitalize mt-8">
          <div className="font-[urbanist] text-(--an-color-text-cardtitlec) text-(length:--an-text-cardD-font-size) leading-(--an-text-cardD-line-height) font-(--an-text-cardtitle-font-weightc)">
            Personal Details 
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* First Name */}
            <div>
              <Label htmlFor="firstname">
                <div className="capitalize font-[urbanist] text-(--an-color-text-firstN) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                  First Name
                </div>
              </Label>
              <input
                id="firstname"
                className="w-full h-7 px-2 border-b border-black/10 focus:outline-none"
                value={values.firstname}
                onChange={e => onChange("firstname", e.target.value)}
              />
              {showError("firstname") && (
                <p className="text-red-600 text-xs mt-1">{errors.firstname}</p>
              )}
            </div>
            {/* Last Name */}
            <div>
              <Label htmlFor="lastname">
                <div className="capitalize font-[urbanist] text-(--an-color-text-firstN) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                  Last Name
                </div>
              </Label>
              <input
                id="lastname"
                className="w-full h-7 px-2 border-b border-black/10 focus:outline-none"
                value={values.lastname}
                onChange={e => onChange("lastname", e.target.value)}
              />
              {showError("lastname") && (
                <p className="text-red-600 text-xs mt-1">{errors.lastname}</p>
              )}
            </div>
            {/* Email */}
            <div>
              <Label htmlFor="email">
                <div className="capitalize font-[urbanist] text-(--an-color-text-firstN) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                  Email Address
                </div>
              </Label>
              <input
                id="email"
                type="email"
                className="w-full h-7 px-2 border-b border-black/10 focus:outline-none"
                value={values.email}
                onChange={e => onChange("email", e.target.value)}
              />
              {showError("email") && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            {/* Mobile */}
            <div>
              <Label htmlFor="mobile">
                <div className="capitalize font-[urbanist] text-(--an-color-text-firstN) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                  Mobile Number
                </div>
              </Label>
              <input
                id="mobile"
                className="w-full h-7 px-2 border-b border-black/10 focus:outline-none"
                value={values.mobile}
                onChange={e =>
                  onChange(
                    "mobile",
                    e.target.value.replace(/[^\d]/g, "").slice(0, 10)
                  )
                }
                maxLength={10}
              />
              {showError("mobile") && (
                <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <Label htmlFor="dob">
                <div className="capitalize font-[urbanist] text-(--an-color-text-firstN) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                  DOB
                </div>
              </Label>
              <div className="relative w-full">
                <div className="flex items-center border-b -mt-1 border-black/10">
                  <input
                    id="dob"
                    value={values.dateofbirth}
                    onChange={e =>
                      handleDateInput(e.target.value, "dob", "dateofbirth")
                    }
                    placeholder="mm/dd/yyyy"
                    className="w-full h-9 px-3 pr-10 focus:outline-none font-[urbanist] text-(--an-text-doj-color) text-(length:--an-text-firstN-font-size) font-(--an-text-cardtitle-font-weightc) leading-(--an-text-firstN-line-height)"
                  />
                  <Popover
                    open={isDobPopoverOpen}
                    onOpenChange={setIsDobPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="p-2"
                        onClick={() =>
                          setIsDobPopoverOpen((prev) => !prev)
                        }
                      >
                        <Calendar className="h-5 w-5 text-gray-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CustomDropdown
                        selected={values.dob}
                        onSelect={(date) => {
                          onChange("dob", date);
                          onChange(
                            "dateofbirth",
                            date ? format(date, "MM/dd/yyyy") : ""
                          );
                          setIsDobPopoverOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {showError("dateofbirth") && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.dateofbirth}
                </p>
              )}
            </div>
            {/* Date of Joining */}
            <div>
              <Label htmlFor="doj">
                <div className="capitalize font-[urbanist] text-(--an-color-text-firstN) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                  Date of Joining
                </div>
              </Label>
              <div className="relative w-full">
                <div className="flex items-center border-b border-black/10">
                  <input
                    id="doj"
                    value={values.dateofjoninig}
                    onChange={e =>
                      handleDateInput(e.target.value, "doj", "dateofjoninig")
                    }
                    placeholder="mm/dd/yyyy"
                    className="w-full h-9 px-3 pr-10 focus:outline-none font-[urbanist] text-(--an-text-doj-color) text-(length:--an-text-firstN-font-size) font-(--an-text-cardtitle-font-weightc) leading-(--an-text-firstN-line-height)"
                  />
                  <Popover
                    open={isDojPopoverOpen}
                    onOpenChange={setIsDojPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="p-2"
                        onClick={() =>
                          setIsDojPopoverOpen((prev) => !prev)
                        }
                      >
                        <Calendar className="h-5 w-5 text-gray-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CustomDropdown
                        selected={values.doj}
                        onSelect={(date) => {
                          onChange("doj", date);
                          onChange(
                            "dateofjoninig",
                            date ? format(date, "MM/dd/yyyy") : ""
                          );
                          setIsDojPopoverOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {showError("dateofjoninig") && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.dateofjoninig}
                </p>
              )}
            </div>
            {/* Designation */}
            <div className="col-span-2">
              <Label htmlFor="designation">
                <div className="capitalize font-[urbanist] text-(--an-color-text-firstN) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                  Designation
                </div>
              </Label>
              <input
                id="designation"
                className="w-full h-7 px-2 border-b border-black/10 focus:outline-none"
                value={values.designation}
                onChange={e => onChange("designation", e.target.value)}
              />
              {showError("designation") && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.designation}
                </p>
              )}
            </div>
          </div>
          <CardFooter className="flex justify-end gap-4 m-8">
            <Button
              variant="outline"
              className="capitalize font-[urbanist] text-(--an-color-text-cardfooter) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)"
              type="button"
              onClick={onCancel}
              disabled={loading}
            >
              <div className="capitalize font-[urbanist] text-(--an-color-text-cardfooter) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                Cancel
              </div>
            </Button>
            <Button
              className="bg-red-600  hover:bg-red-400"
              disabled={loading}
            > 
              <div className="capitalize font-[urbanist] text-(--an-color-text-Adduser) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                {loading ? "Adding..." : "Add User"}
              </div>
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
