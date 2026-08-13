const handleRegister = async (e) => {
  e.preventDefault();

  const form = e.target;

  const userData = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
    role: form.role.value,
  };

  console.log("Sending:", userData);

  try {
    const response = await fetch(
      "https://obscure-space-enigma-q76pp7r69649f9qw4-5000.app.github.dev/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    console.log("Server response:", data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Account created successfully!");

    navigate("/login");
  } catch (error) {
    console.error("Registration error:", error);
    alert("Unable to connect to server");
  }
};
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Temporary frontend registration
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-md">

        <Link
          to="/"
          className="mb-10 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 w-fit rounded-2xl bg-violet-600 p-4">
            <GraduationCap size={32} />
          </div>

          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Join the Smart Campus platform
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">

          <form onSubmit={handleRegister} className="space-y-5">

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
  placeholder="Your full name"
  required
  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 outline-none focus:border-violet-500"
/>
              </div>
            </div>

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
  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 outline-none focus:border-violet-500"
/>
              </div>
            </div>

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
  placeholder="Create a password"
  required
  minLength={8}
  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 outline-none focus:border-violet-500"
/>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Account Type
              </label>

             <select
  name="role"
  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
>
  <option value="student">Student</option>
  <option value="faculty">Faculty</option>
</select>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500"
            >
              Create Account
            </button>

          </form>

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