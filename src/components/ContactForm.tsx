import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more — at least 20 characters")
    .max(5000, "Please keep it under 5,000 characters"),
});

type FormValues = z.infer<typeof schema>;

const projectTypes = [
  "Full interior design",
  "Architectural renovation",
  "Art direction & styling",
  "Hospitality",
  "Other",
];

const budgets = [
  "Under €50k",
  "€50k – €150k",
  "€150k – €500k",
  "€500k+",
  "Prefer not to say",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", projectType: "", budget: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submission received:", {
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      project_type: values.projectType || null,
      budget: values.budget || null,
      message: values.message,
    });

    toast.success("Thank you — your message is on its way.");
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="border border-border p-10 lg:p-14 bg-secondary/30 animate-fade-up">
        <p className="eyebrow mb-6">Message received · 001</p>
        <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
          Thank you. We'll be in touch within two working days.
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
          A member of the studio will reply personally from Copenhagen. In the meantime, feel free to browse our selected work or follow the studio's journal.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm border-b border-foreground pb-1 hover:text-accent transition-colors"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div className="grid md:grid-cols-2 gap-8">
        <Field label="Name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputCls}
            placeholder="Anna Holm"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputCls}
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={inputCls}
            placeholder="+45 ..."
          />
        </Field>
        <Field label="Project type" error={errors.projectType?.message}>
          <select {...register("projectType")} className={cn(inputCls, "appearance-none bg-background")}>
            <option value="">Select a service</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget" error={errors.budget?.message} className="md:col-span-2">
          <select {...register("budget")} className={cn(inputCls, "appearance-none bg-background")}>
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Tell us about the home you imagine" error={errors.message?.message}>
        <textarea
          rows={5}
          {...register("message")}
          className={cn(inputCls, "resize-none")}
          placeholder="A little about the project, the space, and what you hope it could feel like…"
        />
      </Field>

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-sm tracking-wide hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-muted-foreground max-w-sm">
          By submitting, you agree that Forma Interiors may contact you regarding your enquiry. We never share your details.
        </p>
      </div>
    </form>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none focus:ring-0 py-3 text-base placeholder:text-muted-foreground/60 transition-colors";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow block mb-2">{label}</span>
      {children}
      {error ? (
        <span className="block mt-2 text-xs text-clay" style={{ color: "var(--clay)" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
