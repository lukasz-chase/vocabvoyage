"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminFieldStructure, FieldTypes } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  data?: any;
  entityType: keyof typeof AdminFieldStructure;
  updateHandler?: (data: any) => Promise<void>;
  createHandler?: (data: any) => Promise<void>;
};

const AdminForm = ({
  data,
  entityType,
  updateHandler,
  createHandler,
}: Props) => {
  const fields = AdminFieldStructure[entityType];
  const [formState, setFormState] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = data ? data[field.name] || "" : "";
      return acc;
    }, {} as Record<string, string | boolean>)
  );
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { value: string | boolean; name: string } }
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      try {
        e.preventDefault();
        if (data) {
          if (updateHandler) {
            await updateHandler({ ...data, ...formState });
            toast.success(`${entityType} updated successfully`);
          }
        } else {
          if (createHandler) {
            await createHandler(formState);
            toast.success(`${entityType} created successfully`);
            router.push(`/admin/${entityType}`);
          }
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <form
      className="w-full flex flex-col mx-auto max-w-5xl gap-4 p-4"
      onSubmit={handleSubmit}
    >
      {fields.map((field, i) => (
        <div key={`${field.name} - ${i}`}>
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === FieldTypes.INPUT && (
            <Input
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formState[field.name] as string}
              onChange={handleChange}
              disabled={pending}
            />
          )}
          {field.type === FieldTypes.SELECT && "selectOptions" in field && (
            <Select
              name={field.name}
              value={formState[field.name] as string}
              onValueChange={(value) =>
                handleChange({ target: { value, name: field.name } })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.selectOptions!.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {field.type === FieldTypes.CHECKBOX && (
            <div className="items-top flex space-x-2">
              <Checkbox
                id={field.name}
                checked={!!formState[field.name]}
                name={field.name}
                onCheckedChange={(checked) =>
                  handleChange({
                    target: {
                      value: checked,
                      name: field.name,
                    },
                  })
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  is this the correct answer
                </label>
              </div>
            </div>
          )}
        </div>
      ))}
      <Button type="submit" variant="primary" disabled={pending}>
        {data ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default AdminForm;
