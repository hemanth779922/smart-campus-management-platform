import {
  LayoutDashboard,
  CalendarDays,
  Megaphone,
  MessageSquareWarning,
  Search,
  MapPin,
  Bell,
  User,
  LogOut,
  BookOpen,
  Clock,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    title: "Events",
    description: "View campus events",
    icon: CalendarDays,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Announcements",
    description: "Latest campus updates",
    icon: Megaphone,
    color: "bg-violet-500/10 text-violet-400",
  },
  {
    title: "Complaints",
    description: "Report campus issues",
    icon: MessageSquareWarning,
    color: "bg-orange-500/10 text-orange-400",
  },
  {
    title: "Lost & Found",
    description: "Find lost belongings",
    icon: Search,
    color: "bg-green-500/10 text-green-400",
  },
  {
    title: "Campus Services",
    description: "Explore campus facilities",
    icon: MapPin,
    color: "bg-pink-500/10 text-pink-400",
  },
];

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 md:block">

        <div className="flex items-center gap-3 border-b border-white/10 p-6">
          <div className="rounded-xl bg-violet-600 p-2">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="font-bold">Smart Campus</h1>
            <p className="text-xs text-slate-500">
              Student Portal
            </p>
          </div>
        </div>

        <nav className="space-y-2 p-4">

          <a
            href="#"
            className="flex items-center gap-3 rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </a>

          <a
            href="#events"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <CalendarDays size={19} />
            Events
          </a>

          <a
            href="#announcements"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <Megaphone size={19} />
            Announcements
          </a>

          <a
            href="#complaints"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <MessageSquareWarning size={19} />
            Complaints
          </a>

          <a
            href="#lost-found"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <Search size={19} />
            Lost & Found
          </a>

          <a
            href="#services"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <MapPin size={19} />
            Campus Services
          </a>

        </nav>

        <div className="absolute bottom-5 left-0 w-full px-4">

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="md:ml-64">

        {/* Top Bar */}
        <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 py-5 backdrop-blur">

          <div>
            <p className="text-sm text-slate-400">
              Student Dashboard
            </p>

            <h2 className="text-2xl font-bold">
              Welcome back, Hemanth 👋
            </h2>
          </div>

          <div className="flex items-center gap-4">

            <button className="relative rounded-xl border border-white/10 p-3 hover:bg-white/5">
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
            </button>

            <div className="hidden items-center gap-3 sm:flex">

              <div className="rounded-full bg-violet-600/20 p-2 text-violet-400">
                <User size={20} />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Hemanth
                </p>

                <p className="text-xs text-slate-500">
                  Student
                </p>
              </div>

            </div>

          </div>

        </header>

        <div className="space-y-8 p-6">

          {/* Stats */}
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <CalendarDays size={22} />
                </div>

                <ArrowUpRight size={18} className="text-slate-500" />

              </div>

              <p className="mt-5 text-sm text-slate-400">
                Upcoming Events
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                6
              </h3>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400 w-fit">
                <Megaphone size={22} />
              </div>

              <p className="mt-5 text-sm text-slate-400">
                New Announcements
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                4
              </h3>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400 w-fit">
                <MessageSquareWarning size={22} />
              </div>

              <p className="mt-5 text-sm text-slate-400">
                Active Complaints
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                2
              </h3>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <div className="rounded-xl bg-green-500/10 p-3 text-green-400 w-fit">
                <CheckCircle size={22} />
              </div>

              <p className="mt-5 text-sm text-slate-400">
                Resolved Issues
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                12
              </h3>

            </div>

          </section>

          {/* Quick Services */}
          <section id="services">

            <div className="mb-5">
              <h2 className="text-xl font-bold">
                Quick Services
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Access important campus services
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {services.map((service) => {

                const Icon = service.icon;

                return (
                  <div
                    key={service.title}
                    className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-violet-500/30"
                  >

                    <div className={`mb-4 w-fit rounded-xl p-3 ${service.color}`}>
                      <Icon size={22} />
                    </div>

                    <h3 className="font-semibold">
                      {service.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {service.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-violet-400">
                      Open
                      <ArrowUpRight size={16} />
                    </div>

                  </div>
                );

              })}

            </div>

          </section>

          {/* Announcements */}
          <section id="announcements">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Latest Announcements
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Important updates from your campus
                </p>
              </div>

              <button className="text-sm text-violet-400">
                View all
              </button>

            </div>

            <div className="space-y-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                    <Megaphone size={20} />
                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      Semester examination schedule released
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Check the examination portal for your detailed schedule.
                    </p>

                    <p className="mt-3 text-xs text-slate-600">
                      2 hours ago
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <CalendarDays size={20} />
                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      Annual Tech Fest registration is open
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Register now to participate in technical events.
                    </p>

                    <p className="mt-3 text-xs text-slate-600">
                      Yesterday
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* Upcoming Events */}
          <section id="events">

            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Upcoming Events
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Don't miss what's happening on campus
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

                <div className="flex gap-4">

                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-violet-600/15 text-violet-400">

                    <span className="text-xs font-semibold">
                      AUG
                    </span>

                    <span className="text-2xl font-bold">
                      20
                    </span>

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Innovation & Startup Summit
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={15} />
                      10:00 AM
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      Main Auditorium
                    </p>

                  </div>

                </div>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

                <div className="flex gap-4">

                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-blue-600/15 text-blue-400">

                    <span className="text-xs font-semibold">
                      AUG
                    </span>

                    <span className="text-2xl font-bold">
                      25
                    </span>

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Inter College Sports Meet
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={15} />
                      9:00 AM
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      University Ground
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;