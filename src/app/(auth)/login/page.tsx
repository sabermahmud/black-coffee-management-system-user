"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  Building2,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Coffee,
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

import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Handle login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const { error: loginError } = await signIn.email({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        callbackURL: "/",
      });

      if (loginError) {
        setError(
          loginError.message || "Invalid email or password. Please try again.",
        );
        return;
      }

      setSuccess("Login successful! Redirecting...");

      router.push("/");
      router.refresh();
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

  // Features
  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Access",
      description: "Secure access for every team member.",
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

            {/* Heading */}
            <div className="mt-16 lg:mt-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B78B52]/25 bg-white/70 px-4 py-2">
                <Sparkles className="h-4 w-4 text-[#98703F]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98703F]">
                  Welcome Back
                </span>
              </div>

              <h2 className="mt-7 text-4xl font-bold leading-[1.15] tracking-tight text-[#25231F] sm:text-5xl">
                Your Business.
                <br />
                Your Control.
                <br />
                <span className="text-[#98703F]">One Platform.</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#777064] sm:text-base">
                Sign in to access your Black Coffee management system and keep
                your business operations running smoothly.
              </p>
            </div>

            {/* Divider */}
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

        {/* Login Form */}
        <section className="flex items-center p-6 sm:p-10 lg:p-12">
          <Card className="w-full border-0 p-4 shadow-none">
            <CardHeader className="px-0 pb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2E9DC]">
                <User className="h-6 w-6 text-[#98703F]" />
              </div>

              <CardTitle className="text-3xl font-bold tracking-tight text-[#25231F]">
                Welcome Back
              </CardTitle>

              <CardDescription className="mt-2 leading-6 text-[#898276]">
                Enter your credentials to access your Black Coffee management
                account.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email */}
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
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-[#403B33]">
                      Password
                    </Label>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49A8C]" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-12 rounded-xl border-[#E8E1D7] bg-[#FDFCFB] pl-10 pr-12 text-[#302B24] placeholder:text-[#B4ADA3] focus-visible:border-[#B78B52] focus-visible:ring-[#B78B52]/20"
                      autoComplete="current-password"
                      disabled={loading}
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
                      Signing In...
                    </>
                  ) : success ? (
                    <>
                      Login Successful
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Sign In to Your Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Signup Link */}
                <p className="pt-2 text-center text-sm text-[#898276]">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-[#98703F] transition-colors hover:text-[#B78B52] hover:underline"
                  >
                    Create Account
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
