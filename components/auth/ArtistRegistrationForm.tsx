// components/auth/ArtistRegistrationForm.tsx
"use client";

import { useState, useEffect } from "react"; // No specific changes needed to React imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Stage1RegisterValues,
  stage1RegisterSchema,
  INITIAL_ARTIST_REGISTER_VALUES,
  ART_FORMS_DATA,
} from "@/lib/types/users"; // Ensure correct path to types
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming this is your EnhancedInput or shadcn Input
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Mail,
  KeyRound,
  MapPin as MapPinIconLucide,
  Instagram,
  Palette,
  Info,
  Eye,
  EyeOff,
  ChevronDown,
  Sparkles,
  Loader2,
  Check,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react"; // Ensure React is imported for React.forwardRef

// Enhanced Input Component (Keep your existing EnhancedInput - it's good!)
interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /* ... as before ... */ Icon?: React.ElementType;
  SuffixIcon?: React.ElementType;
  onSuffixIconClick?: () => void;
  LeftAddon?: string;
}
const EnhancedInput = React.forwardRef<
  HTMLInputElement,
  EnhancedInputProps
> /* ... your full EnhancedInput code ... */(
  (
    { className, Icon, SuffixIcon, onSuffixIconClick, LeftAddon, ...props },
    ref
  ) => {
    return (
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        )}
        {LeftAddon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-base pointer-events-none">
            {LeftAddon}
          </span>
        )}
        <Input
          className={cn(
            "h-12 text-base rounded-lg border-border focus:border-primary focus:ring-1 focus:ring-primary",
            Icon ? "pl-11" : LeftAddon ? "pl-8" : "pl-4",
            SuffixIcon && "pr-11",
            className
          )}
          ref={ref}
          {...props}
        />
        {SuffixIcon && (
          <button
            type="button"
            onClick={onSuffixIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded-md p-1"
            tabIndex={-1}
          >
            <SuffixIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);
EnhancedInput.displayName = "EnhancedInput";

// Password Strength Indicator (Keep your existing - it's good!)
const PasswordStrengthIndicator = ({ password }: { password?: string }) => {
  /* ... your full PasswordStrengthIndicator code ... */
  const getStrength = () => {
    if (!password)
      return {
        width: "0%",
        color: "bg-slate-200 dark:bg-slate-700",
        text: "Create a strong password",
        score: 0,
        checks: {
          length: false,
          uppercase: false,
          number: false,
          special: false,
        },
      };
    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    Object.values(checks).forEach((check) => check && score++);
    const strengthMap = {
      0: {
        width: "0%",
        color: "bg-slate-200 dark:bg-slate-700",
        text: "Minimum 8 characters",
      },
      1: { width: "25%", color: "bg-red-500", text: "Weak" },
      2: { width: "50%", color: "bg-orange-500", text: "Fair" },
      3: { width: "75%", color: "bg-yellow-500", text: "Good" },
      4: { width: "100%", color: "bg-green-500", text: "Strong" },
    } as const;
    return { ...strengthMap[score as keyof typeof strengthMap], score, checks };
  };
  const strength = getStrength();
  if (!password && strength.score === 0 && strength.width === "0%")
    return (
      <p className="text-xs text-muted-foreground mt-1.5">{strength.text}</p>
    );
  return (
    <div className="space-y-1.5 mt-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              strength.color
            )}
            style={{ width: strength.width }}
          />
        </div>
        <span
          className={cn(
            "text-xs font-medium",
            strength.score <= 1
              ? "text-red-600"
              : strength.score <= 2
              ? "text-orange-600"
              : strength.score <= 3
              ? "text-yellow-600"
              : "text-green-600"
          )}
        >
          {strength.text}
        </span>
      </div>
    </div>
  );
};

// Main Form Component
export default function ArtistRegistrationForm() {
  // ... (your existing useState, useForm, form.watch, onSubmit, handleDetectLocation logic remains the same)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const router = useRouter();

  const form = useForm<Stage1RegisterValues>({
    resolver: zodResolver(stage1RegisterSchema),
    defaultValues: INITIAL_ARTIST_REGISTER_VALUES,
    mode: "onTouched",
  });

  const selectedArtForms = form.watch("artForms");
  const watchedPassword = form.watch("password");

  const onSubmit = async (data: Stage1RegisterValues) => {
    /* ... KEEP YOUR SUBMIT LOGIC ... */
    setIsSubmitting(true);
    setRegistrationError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      console.log("Registration successful for:", data.email);
      alert(
        "Mock Registration Successful! Redirecting to complete your profile."
      );
      // router.push('/onboarding/artist/profile-details');
    } catch (error: any) {
      console.error("Registration error:", error);
      setRegistrationError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDetectLocation = async () => {
    /* ... KEEP YOUR LOCATION LOGIC ... */
    setIsDetectingLocation(true);
    if (!navigator.geolocation) {
      form.setError("city", {
        type: "manual",
        message: "Geolocation not supported by your browser.",
      });
      setIsDetectingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location detected:", position.coords);
        alert(
          "Location detected! For this demo, we'll set a sample city. Real app would use reverse geocoding."
        );
        form.setValue("city", "Mumbai (Sample)", { shouldValidate: true }); // Placeholder
        setIsDetectingLocation(false);
      },
      (error) => {
        let msg = "Could not detect location.";
        if (error.code === 1)
          msg = "Location access denied. Please enter manually.";
        form.setError("city", { type: "manual", message: msg });
        setIsDetectingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 md:space-y-6"
      >
        {/* Grouped Name & Email for better desktop layout */}
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-5 md:gap-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <EnhancedInput
                    Icon={User}
                    placeholder="Your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <EnhancedInput
                    Icon={Mail}
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Password</FormLabel>
              <FormControl>
                <EnhancedInput
                  Icon={KeyRound}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  {...field}
                  SuffixIcon={showPassword ? EyeOff : Eye}
                  onSuffixIconClick={() => setShowPassword(!showPassword)}
                />
              </FormControl>
              <PasswordStrengthIndicator password={watchedPassword} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Your City{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (India)
                </span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <EnhancedInput
                    Icon={MapPinIconLucide}
                    placeholder="e.g., Delhi, Mumbai"
                    {...field}
                    className="pr-[140px]"
                  />{" "}
                  {/* Adjust pr for button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDetectLocation}
                    disabled={isDetectingLocation}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-3 text-xs font-medium text-primary hover:text-primary border-primary/30 hover:bg-primary/5 disabled:opacity-60"
                  >
                    {isDetectingLocation ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                    ) : (
                      <MapPinIconLucide className="w-3.5 h-3.5 mr-1" />
                    )}
                    {isDetectingLocation ? "Finding..." : "Use Location"}
                  </Button>
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                This helps people discover your local art experiences.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="artForms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>Your Primary Art Form(s)</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {selectedArtForms.length > 0
                    ? `${selectedArtForms.length}/5 selected`
                    : "Select up to 5"}
                </span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full h-12 justify-between text-base font-normal border-border hover:border-input-hover text-muted-foreground data-[state=open]:border-primary data-[state=open]:ring-1 data-[state=open]:ring-primary",
                        selectedArtForms?.length && "text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Palette className="w-5 h-5 text-muted-foreground/70 shrink-0" />
                        {selectedArtForms && selectedArtForms.length > 0
                          ? selectedArtForms.length === 1
                            ? ART_FORMS_DATA.find(
                                (f) => f.id === selectedArtForms[0]
                              )?.name
                            : `${selectedArtForms.length} art forms selected`
                          : "Choose your art forms..."}
                      </div>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 shadow-xl border-border">
                  <Command>
                    <CommandInput
                      placeholder="Search art forms..."
                      className="h-10 text-sm border-b focus:ring-0 rounded-t-md"
                    />
                    <CommandList>
                      <CommandEmpty className="py-4 px-4 text-center text-sm text-muted-foreground">
                        No matching art forms found.
                      </CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="max-h-56 p-1">
                          {ART_FORMS_DATA.map((artForm) => (
                            <CommandItem
                              key={artForm.id}
                              value={artForm.name}
                              onSelect={() => {
                                const currentValues = field.value || [];
                                const isSelected = currentValues.includes(
                                  artForm.id
                                );
                                let newValue = isSelected
                                  ? currentValues.filter(
                                      (id) => id !== artForm.id
                                    )
                                  : [...currentValues, artForm.id];
                                if (newValue.length > 5 && !isSelected) {
                                  return;
                                }
                                form.setValue("artForms", newValue, {
                                  shouldValidate: true,
                                });
                              }}
                              className="py-2.5 px-3 text-sm cursor-pointer rounded-md flex items-center justify-between group hover:bg-accent focus:bg-accent aria-selected:bg-accent"
                            >
                              <div className="flex items-center gap-2.5">
                                <Checkbox
                                  checked={field.value?.includes(artForm.id)}
                                  className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                />
                                <span>{artForm.name}</span>
                              </div>
                              {field.value?.includes(artForm.id) && (
                                <Check className="w-4 h-4 text-primary" />
                              )}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select up to 5 art forms you specialize in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instagramHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Instagram Handle{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (Optional, but highly recommended)
                </span>
              </FormLabel>
              <FormControl>
                <EnhancedInput
                  Icon={Instagram}
                  LeftAddon="@"
                  placeholder="yourartistname"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3.5 pt-4 border-t border-border/70">
          <FormField
            control={form.control}
            name="agreedToGuidelines"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 p-3.5 border border-border/70 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="guidelines-check"
                    className="mt-1 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                </FormControl>
                <div className="grid gap-1.5 leading-tight">
                  <FormLabel
                    htmlFor="guidelines-check"
                    className="text-sm font-medium cursor-pointer"
                  >
                    I have read, understood, and agree to abide by GoArtful's{" "}
                    <Link
                      href="/community-guidelines"
                      target="_blank"
                      className="text-primary font-semibold hover:underline focus:underline focus:outline-none"
                    >
                      Community Guidelines
                    </Link>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreedToTerms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 p-3.5 border border-border/70 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms-check"
                    className="mt-1 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                </FormControl>
                <div className="grid gap-1.5 leading-tight">
                  <FormLabel
                    htmlFor="terms-check"
                    className="text-sm font-medium cursor-pointer"
                  >
                    I accept GoArtful's{" "}
                    <Link
                      href="/terms-of-service"
                      target="_blank"
                      className="text-primary font-semibold hover:underline focus:underline focus:outline-none"
                    >
                      Terms of Service
                    </Link>{" "}
                    and acknowledge the{" "}
                    <Link
                      href="/privacy-policy"
                      target="_blank"
                      className="text-primary font-semibold hover:underline focus:underline focus:outline-none"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        {registrationError && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive text-center">
              {registrationError}
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full text-base font-semibold h-14 mt-8 !bg-gradient-to-r !from-orange-500 !to-rose-500 hover:!opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2.5" />
          ) : (
            <Sparkles className="w-5 h-5 mr-2.5" />
          )}
          {isSubmitting
            ? "Creating Your Profile..."
            : "Create My Artist Account"}
        </Button>
      </form>
    </Form>
  );
}
