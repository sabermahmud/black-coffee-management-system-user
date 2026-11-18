"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
  Building2,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Check,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserRole = "management" | "branch_manager";

const branches = [
  { value: "branch-01", label: "Branch 01  (Branch Dawar Sa'ah)" },
  { value: "branch-02", label: "Branch 02 (Branch Nazma)" },
  { value: "branch-03", label: "Branch 03 (Branch Aqda)" },
  { value: "branch-04", label: "Branch 04 (Branch Estetan)" },
];

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: "branch_manager" as UserRole,
  branch: "",
};

const passwordRules = [
  {
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "One uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "One lowercase letter",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "One number",
    test: (value: string) => /\d/.test(value),
  },
  {
    label: "One special character (@$!%*?&)",
    test: (value: string) => /[@$!%*?&]/.test(value),
  },
];

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordChecks = passwordRules.map((rule) => ({
    label: rule.label,
    valid: rule.test(formData.password),
  }));

  const completedRules = passwordChecks.filter((item) => item.valid).length;

  const isPasswordValid = completedRules === passwordRules.length;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value !== "branch_manager" ? { branch: "" } : {}),
    }));

    setError("");
    setSuccess("");
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.role === "branch_manager" && !formData.branch) {
      setError("Please select your assigned branch.");
      return;
    }

    try {
      setLoading(true);

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      if (!serverUrl) {
        throw new Error("Server configuration is missing.");
      }

      const response = await fetch(`${serverUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          password: formData.password,
          requestedRole: formData.role,
          branch: formData.role === "branch_manager" ? formData.branch : null,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again.",
        );
      }

      setSuccess(
        data.message ||
          "Registration submitted successfully! Awaiting approval.",
      );

      setFormData(initialFormData);
      setShowPassword(false);
      setShowConfirmPassword(false);

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Access",
      description: "Role-based permissions for every team member.",
    },
    {
      icon: Building2,
      title: "Branch Management",
      description: "Manage multiple branches from one platform.",
    },
    {
      icon: CheckCircle2,
      title: "Centralized Control",
      description: "Keep daily business operations organized.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-8 sm:px-6 lg:flex lg:items-center lg:py-12">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-[#E8E1D7] bg-white shadow-[0_25px_80px_-30px_rgba(65,47,25,0.18)] lg:grid-cols-2">
        {/* Branding Section */}
        <section className="relative flex flex-col justify-between overflow-hidden bg-[#F0EAE0] p-7 sm:p-10 lg:p-12">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#B78B52]/15" />

          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#B78B52]/15" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#B78B52]/10 blur-3xl" />

          <div className="relative z-10">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Black Coffee home"
            >
              <Image
                src="/logo.png"
                alt="Black Coffee"
                width={320}
                height={100}
                priority
                className="h-auto w-56 object-contain object-left"
              />
            </Link>

            {/* Hero Content */}
            <div className="mt-16 lg:mt-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B78B52]/25 bg-white/70 px-4 py-2">
                <Sparkles className="h-4 w-4 text-[#98703F]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98703F]">
                  Welcome Aboard
                </span>
              </div>

              <h2 className="mt-7 text-4xl font-bold leading-[1.15] tracking-tight text-[#25231F] sm:text-5xl">
                Manage Your
                <br />
                Business With
                <br />
                <span className="text-[#98703F]">Confidence.</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#777064] sm:text-base">
                A smarter way to manage branches, products, inventory, and daily
                operations from one centralized platform.
              </p>
            </div>

            {/* Brand Divider */}
            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-12 bg-[#B78B52]" />
              <Coffee className="h-4 w-4 text-[#98703F]" />
              <div className="h-px w-12 bg-[#B78B52]" />
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 mt-14 space-y-7">
            {features.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E3D8C8] bg-white/80 shadow-sm">
                  <item.icon className="h-5 w-5 text-[#98703F]" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#302B24]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#81796D]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-[#DCD2C4] pt-6">
              <p className="text-xs text-[#918879]">
                © 2026 Black Coffee. All rights reserved.
              </p>
            </div>
          </div>
        </section>

        {/* Signup Form */}
        <section className="p-6 sm:p-10 lg:p-12">
          <Card className="border-0 p-4 shadow-none">
            <CardHeader className="px-0 pb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2E9DC]">
                <User className="h-6 w-6 text-[#98703F]" />
              </div>

              <CardTitle className="text-3xl font-bold tracking-tight text-[#25231F]">
                Create Account
              </CardTitle>

              <CardDescription className="mt-2 leading-6 text-[#898276]">
                Enter your details to request access to the Black Coffee
                management system.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleSignup} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#403B33]">
                    Full Name
                  </Label>

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49A8C]" />

                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-[#E8E1D7] bg-[#FDFCFB] pl-10 text-[#302B24] placeholder:text-[#B4ADA3] focus-visible:border-[#B78B52] focus-visible:ring-[#B78B52]/20"
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#403B33]">
                      Email Address
                    </Label>

                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49A8C]" />

                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-[#E8E1D7] bg-[#FDFCFB] pl-10 text-[#302B24] placeholder:text-[#B4ADA3] focus-visible:border-[#B78B52] focus-visible:ring-[#B78B52]/20"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#403B33]">
                      Phone Number
                      <span className="ml-1 text-xs text-[#A49A8C]">
                        (Optional)
                      </span>
                    </Label>

                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49A8C]" />

                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+966 5X XXX XXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-[#E8E1D7] bg-[#FDFCFB] pl-10 text-[#302B24] placeholder:text-[#B4ADA3] focus-visible:border-[#B78B52] focus-visible:ring-[#B78B52]/20"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>

                {/* Requested Role */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-[#403B33]">
                    Requested Role
                  </Label>

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-[#E8E1D7] bg-[#FDFCFB] px-3 text-sm text-[#302B24] outline-none transition-colors focus:border-[#B78B52] focus:ring-2 focus:ring-[#B78B52]/20"
                    required
                  >
                    <option value="branch_manager">Business Owner</option>

                    <option value="management">Management Team</option>

                    <option value="branch_manager">Branch Manager</option>

                    <option value="branch_manager">Admin</option>
                  </select>

                  <p className="text-xs leading-5 text-[#999083]">
                    Your requested role will be reviewed by an administrator
                    before activation.
                  </p>
                </div>

                {/* Branch */}
                {formData.role === "branch_manager" && (
                  <div className="space-y-2">
                    <Label htmlFor="branch" className="text-[#403B33]">
                      Assigned Branch
                    </Label>

                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-[#E8E1D7] bg-[#FDFCFB] px-3 text-sm text-[#302B24] outline-none transition-colors focus:border-[#B78B52] focus:ring-2 focus:ring-[#B78B52]/20"
                      required
                    >
                      <option value="">Select your branch</option>

                      {branches.map((branch) => (
                        <option key={branch.value} value={branch.value}>
                          {branch.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Password */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-[#403B33]">
                    Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49A8C]" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-[#E8E1D7] bg-[#FDFCFB] pl-10 pr-12 text-[#302B24] placeholder:text-[#B4ADA3] focus-visible:border-[#B78B52] focus-visible:ring-[#B78B52]/20"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A49A8C] transition-colors hover:text-[#98703F]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#898276]">
                        Password strength
                      </span>

                      <span className="text-xs font-semibold text-[#98703F]">
                        {completedRules}/5 completed
                      </span>
                    </div>

                    <div
                      className="flex gap-1.5"
                      role="progressbar"
                      aria-label="Password requirements completed"
                      aria-valuemin={0}
                      aria-valuemax={5}
                      aria-valuenow={completedRules}
                    >
                      {passwordChecks.map((item) => (
                        <div
                          key={item.label}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            item.valid ? "bg-[#6B9872]" : "bg-[#EAE5DC]"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
                      {passwordChecks.map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 text-xs ${
                            item.valid ? "text-[#58805E]" : "text-[#A49A8C]"
                          }`}
                        >
                          {item.valid ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <div className="h-3.5 w-3.5 shrink-0 rounded-full border border-[#D7CFC2]" />
                          )}

                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#403B33]">
                    Confirm Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49A8C]" />

                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-[#E8E1D7] bg-[#FDFCFB] pl-10 pr-12 text-[#302B24] placeholder:text-[#B4ADA3] focus-visible:border-[#B78B52] focus-visible:ring-[#B78B52]/20"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A49A8C] transition-colors hover:text-[#98703F]"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {formData.confirmPassword.length > 0 && (
                    <p
                      className={`flex items-center gap-1.5 text-xs ${
                        formData.password === formData.confirmPassword
                          ? "text-[#58805E]"
                          : "text-red-500"
                      }`}
                    >
                      {formData.password === formData.confirmPassword ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5" />
                      )}

                      {formData.password === formData.confirmPassword
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </p>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Success */}
                {success && (
                  <div
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{success}</span>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading || !!success}
                  className="h-12 w-full rounded-xl bg-[#25231F] font-semibold text-white shadow-sm transition-all hover:bg-[#98703F] hover:shadow-md disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Request...
                    </>
                  ) : success ? (
                    <>
                      Request Submitted
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Submit Registration
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Login */}
                <p className="pt-2 text-center text-sm text-[#898276]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#98703F] transition-colors hover:text-[#B78B52] hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
