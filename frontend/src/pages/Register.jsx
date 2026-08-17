import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  User,
  Mail,
  Hash,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();

    const email = form.email.value
      .trim()
      .toLowerCase();

    const registrationNumber =
      form.registrationNumber.value
        .trim()
        .toUpperCase();

    const password = form.password.value;

    // Validate fields
    if (
      !name ||
      !email ||
      !registrationNumber ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    // Password validation
    if (password.length < 6) {
      alert(
        "Password must be at least 6 characters long"
      );

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            registrationNumber,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Register response:",
        data
      );

      if (!response.ok) {
        alert(
          data.message ||
            "Registration failed"
        );

        return;
      }

      alert(
        "Account created successfully!"
      );

      navigate("/login");

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      alert(
        "Unable to connect to server"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-md">

        {/* Back to Home */}

        <Link
          to="/"
          className="mb-10 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Header */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 w-fit rounded-2xl bg-violet-600 p-4">
            <GraduationCap size={32} />
          </div>

          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Join your Smart Campus
          </p>

        </div>

        {/* Form Card */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 outline-none focus:border-violet-500"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 outline-none focus:border-violet-500"
                />

              </div>

            </div>

            {/* Registration Number */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Registration Number
              </label>

              <div className="relative">

                <Hash
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  name="registrationNumber"
                  type="text"
                  placeholder="Enter registration number"
                  required
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 uppercase outline-none focus:border-violet-500"
                />

              </div>

              <p className="mt-1 text-xs text-slate-500">
                This will be used to login to your account.
              </p>

            </div>

            {/* Password */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 outline-none focus:border-violet-500"
                />

              </div>

              <p className="mt-1 text-xs text-slate-500">
                Minimum 6 characters.
              </p>

            </div>

            {/* Role */}

            <div>

              <label className="mb-2 block text-sm text-slate-300">
                Account Type
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              >

                <option value="student">
                  Student
                </option>

                <option value="faculty">
                  Faculty
                </option>

              </select>

            </div>

            {/* Register Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login Link */}

          <p className="mt-6 text-center text-sm text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-violet-400 hover:text-violet-300"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;