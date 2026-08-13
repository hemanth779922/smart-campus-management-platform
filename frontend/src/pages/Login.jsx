import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const loginData = {
      email: form.email.value,
      password: form.password.value,
    };

    console.log("Login data:", loginData);

    try {
   const response = await fetch(
  "https://obscure-space-enigma-q76pp7r69649f9qw4-5000.app.github.dev/api/auth/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  }
);

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to server");
    }
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
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-400">
            Login to your Smart Campus account
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

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
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 outline-none focus:border-violet-500"
                />

              </div>

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
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-11 py-3 outline-none focus:border-violet-500"
                />

              </div>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500"
            >
              Login
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-400">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-violet-400 hover:text-violet-300"
            >
              Create account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;