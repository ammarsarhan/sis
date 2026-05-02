import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Array<Option>;
  value?: Array<string>;
  onChange?: (value: Array<string>) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const selected = options.filter((opt) => value.includes(opt.value));

  function toggle(optionValue: string) {
    const next = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange?.(next);
  }

  function remove(optionValue: string, e: React.MouseEvent) {
    e.stopPropagation();
    onChange?.(value.filter((v) => v !== optionValue));
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex h-9 w-full items-center justify-between gap-1.5 rounded-md border border-input bg-transparent py-2 pe-2 ps-2.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:bg-input/30 dark:hover:bg-input/50",
            className
          )}
        >
          <div className="flex items-center gap-1 overflow-hidden">
            {selected.length > 0 ? (
              <>
                {selected.slice(0, 2).map((opt) => (
                  <Badge
                    key={opt.value}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1 shrink-0"
                  >
                    {opt.label}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => remove(opt.value, e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onChange?.(value.filter((v) => v !== opt.value));
                        }
                      }}
                      className="ml-1 rounded-sm cursor-pointer hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))}
                {selected.length > 2 && (
                  <Badge variant="secondary" className="shrink-0">
                    +{selected.length - 2}
                  </Badge>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="pointer-events-none size-4 text-muted-foreground shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-1 gap-0!"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className="relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground"
          >
            <span className="pointer-events-none absolute inset-e-2 flex size-4 items-center justify-center">
              <Check
                className={cn(
                  "size-4",
                  value.includes(opt.value) ? "opacity-100" : "opacity-0"
                )}
              />
            </span>
            {opt.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}