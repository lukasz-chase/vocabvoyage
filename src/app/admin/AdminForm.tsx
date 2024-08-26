"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminFieldStructure } from "@/lib/constants";
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
    }, {} as Record<string, string>)
  );
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <Input
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formState[field.name]}
            onChange={handleChange}
            disabled={pending}
          />
        </div>
      ))}
      <Button type="submit" variant="primary" disabled={pending}>
        {data ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default AdminForm;
