import * as React from "react";
import { format, isValid } from "date-fns";
import { parse } from "date-fns/parse";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { DayPicker, DropdownProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "lucide-react";

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

export type SelectOption = {
  label: string;
  value: string;
};

export type CommitFormData = {
  project: string;
  date: Date | undefined;
  lines: string;
  commit: string;
  commitname: string;
  name: string;
};

type CardWithAddUserProps = {
  values: CommitFormData;
  onValueChange: (field: keyof CommitFormData, value: any) => void;
  onSubmit: (data: CommitFormData) => void;
  selectOptions: SelectOption[];
  errors: Partial<Record<keyof CommitFormData, string>>;
};

export function CardWithAddUser({
  values,
  onValueChange,
  onSubmit,
  selectOptions,
  errors,
}: CardWithAddUserProps) {
  const handleDateInputChange = (value: string) => {
    try {
      const parsedDate = parse(value, "MM/dd/yyyy", new Date());
      if (isValid(parsedDate)) {
        onValueChange("date", parsedDate);
      } else {
        onValueChange("date", undefined);
      }
    } catch {
      onValueChange("date", undefined);
    }
  };

  const formattedDateInput = values.date ? format(values.date, "MM/dd/yyyy") : "";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <Card className="w-[900px] mx-10 my-10 shadow-md bg-(--an-color-text-Adduser)">
      <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="flex">
          <div className="ml-2 font-[urbanist] text-(--an-CU-text-cardtitle-color) text-(length:--an-CU-text-cardtite-fontsize) leading-(--an-CU-text-cardtitle-height) font-(--an-CU-text-cardtitle-weight)">
            Add Commit
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="w-full space-y-1 font-[urbanist]">
              <Label
                htmlFor="project"
                className="ml-2 capitalize font-[urbanist] text-(--an-CU-text-color) text-(length:--an-CU-text-fontsize) leading-(--an-CU-text-height) font-(--an-CU-text-weight)"
              >
                Project
              </Label>
              <div className="font-[urbanist] text-(--an-text-doj-color) text-(length:--an-text-firstN-font-size) font-(--an-text-cardtitle-font-weightc) leading-(--an-text-firstN-line-height)">
                <Select
                  value={values.project}
                  onValueChange={(value:any) => onValueChange("project", value)}
                >
                  <SelectTrigger
                    id="project"
                    className="w-full ml-2 border-0 border-b-2 border-black/8 shadow-[0_0px_2px_-2px_rgba(0,0,0,0.1)] -mt-0.5 rounded-none px-0"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="w-full bg-white shadow-md rounded-md">
                    {selectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.project && (
                  <p className="ml-2 text-(length:--an-text-fontsize-v) text-(--an-text-color-v) font-[urbanist]">
                    *{errors.project}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="date">
                <div className="capitalize font-[urbanist] text-(--an-color-text-firstN) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
                  Date
                </div>
              </Label>
              <div className="relative w-full">
                <div className="flex items-center border-b -mt-1 border-black/8">
                  <input
                    id="date"
                    value={formattedDateInput}
                    onChange={(e) => handleDateInputChange(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="w-full h-9 px-3 pr-10 focus:outline-none font-[urbanist] text-(--an-text-doj-color) text-(length:--an-text-firstN-font-size) font-(--an-text-cardtitle-font-weightc) leading-(--an-text-firstN-line-height)"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="p-2">
                        <Calendar />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CustomDropdown
                        selected={values.date}
                        onSelect={(date) => onValueChange("date", date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {errors.date && (
                <p className="text-(length:--an-text-fontsize-v) text-(--an-text-color-v) font-[urbanist]">
                  *{errors.date}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="lines">
                <div className="ml-2 capitalize font-[urbanist] text-(--an-CU-text-color) text-(length:--an-CU-text-fontsize) leading-(--an-CU-text-height) font-(--an-CU-text-weight)">
                  Link Of Codes
                </div>
              </Label>
              <input
                id="lines"
                type="text"
                value={values.lines}
                onChange={(e) => onValueChange("lines", e.target.value)}
                className="w-full ml-2 h-7 border-b border-black/8 focus:outline-none"
              />
              {errors.lines && (
                <p className="ml-2 text-(length:--an-text-fontsize-v) text-(--an-text-color-v) font-[urbanist]">
                  *{errors.lines}
                </p>
              )}
            </div>
            <div className="ml-3">
              <Label htmlFor="commit">
                <div className="capitalize font-[urbanist] text-(--an-CU-text-color) text-(length:--an-CU-text-fontsize) leading-(--an-CU-text-height) font-(--an-CU-text-weight)">
                  Commit Links
                </div>
              </Label>
              <input
                id="commit"
                type="text"
                value={values.commit}
                onChange={(e) => onValueChange("commit", e.target.value)}
                className="w-98 h-7 px-2 border-b border-black/8 focus:outline-none"
              />
              {errors.commit && (
                <p className="text-(length:--an-text-fontsize-v) text-(--an-text-color-v) font-[urbanist]">
                  *{errors.commit}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="commitname">
                <div className="ml-2 capitalize font-[urbanist] text-(--an-CU-text-color) text-(length:--an-CU-text-fontsize) leading-(--an-CU-text-height) font-(--an-CU-text-weight)">
                  Commit Name
                </div>
              </Label>
              <input
                id="commitname"
                type="text"
                value={values.commitname}
                onChange={(e) => onValueChange("commitname", e.target.value)}
                className="w-full ml-2 h-7 px-2 border-b border-black/8 focus:outline-none"
              />
              {errors.commitname && (
                <p className="ml-2 text-(length:--an-text-fontsize-v) text-(--an-text-color-v) font-[urbanist]">
                  *{errors.commitname}
                </p>
              )}
            </div>
            <div className="ml-3">
              <Label htmlFor="name">
                <div className="capitalize font-[urbanist] text-(--an-CU-text-color) text-(length:--an-CU-text-fontsize) leading-(--an-CU-text-height) font-(--an-CU-text-weight)">
                  Name
                </div>
              </Label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={(e) => onValueChange("name", e.target.value)}
                className="w-98 h-7 px-2 border-b border-black/8 focus:outline-none"
              />
              {errors.name && (
                <p className="text-(length:--an-text-fontsize-v) text-(--an-text-color-v) font-[urbanist]">
                  *{errors.name}
                </p>
              )}
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-end mt-5 gap-4">
        <Button variant="outline">
          <div className="capitalize font-[urbanist] text-(--an-color-text-cardfooter) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
            Cancel
          </div>
        </Button>
        <Button
          type="submit"
          className="bg-red-600  hover:bg-red-400">
          <div className=" capitalize font-[urbanist] text-(--an-color-text-Adduser) text-(length:--an-text-firstN-font-size) leading-(--an-text-firstN-line-height) font-(--an-text-firstN-font-weight)">
            Add
          </div>
        </Button>
      </CardFooter>
            </form>
    </Card>
  );
}