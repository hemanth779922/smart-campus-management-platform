import { Link } from "react-router-dom";
import {
  GraduationCap,
  CalendarDays,
  Megaphone,
  MessageSquareWarning,
  Search,
  MapPin,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: CalendarDays,
    title: "Campus Events",
    description: "Discover upcoming college events, workshops and activities.",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description: "Stay updated with important campus announcements.",
  },
  {
    icon: MessageSquareWarning,
    title: "Complaints",
    description: "Report campus issues and track their resolution.",
  },
  {
    icon: Search,
    title: "Lost & Found",
    description: "Find lost belongings or report items you have found.",
  },
  {
    icon: MapPin,
    title: "Campus Services",
    description: "Quickly find important facilities and services.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-600 p-2">
              <GraduationCap size={26} />
            </div>

            <div>
              <h1 className="text-xl font-bold">Smart Campus</h1>
              <p className="text-xs text-slate-400">
                Management Platform
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm text-slate-300 hover:text-white">
              Home
            </a>
            <a href="#services" className="text-sm text-slate-300 hover:text-white">
              Services
            </a>
            <a href="#events" className="text-sm text-slate-300 hover:text-white">
              Events
            </a>
            <a href="#about" className="text-sm text-slate-300 hover:text-white">
              About
            </a>
          </div>

          <div className="flex gap-3">
            <Link
                to="/login"
                    className="rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10"
                    >
                Login
            </Link>

            <Link
            to="/register"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold hover:bg-violet-500"
                >
            Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden px-6 py-24"
      >
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <GraduationCap size={18} />
            Smart Campus • One Connected Campus
          </div>

          <h2 className="mx-auto max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Your Campus,
            <span className="text-violet-500"> Smarter.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            A unified digital platform connecting students, faculty and
            administrators with everything they need on campus.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-4 font-semibold hover:bg-violet-500">
              Explore Campus
              <ArrowRight size={20} />
            </button>

            <button className="rounded-xl border border-white/15 px-7 py-4 font-semibold hover:bg-white/10">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="font-semibold text-violet-400">CAMPUS SERVICES</p>

            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Everything you need in one place
            </h2>

            <p className="mt-4 max-w-2xl text-slate-400">
              Access essential campus services quickly and manage your
              college experience from one platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/[0.06]"
                >
                  <div className="mb-5 w-fit rounded-xl bg-violet-600/15 p-3 text-violet-400">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    {service.description}
                  </p>

                  <button className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-400">
                    Explore
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-violet-500/20 bg-violet-600/10 p-10 text-center md:p-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            Make your campus experience smarter.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Join the Smart Campus platform and connect with your entire
            campus community.
          </p>

          <button className="mt-8 rounded-xl bg-violet-600 px-7 py-3 font-semibold hover:bg-violet-500">
            Create Your Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Smart Campus Management Platform</p>
          <p>Built for DevFusion 4.0</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;