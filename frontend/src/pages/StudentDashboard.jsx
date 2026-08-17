import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const API_URL =
  "https://obscure-space-enigma-q76pp7r69649f9qw4-5000.app.github.dev";

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
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [lostFoundItems, setLostFoundItems] = useState([]);

  const [complaintTitle, setComplaintTitle] = useState("");
  const [complaintDescription, setComplaintDescription] =
    useState("");
  const [complaintCategory, setComplaintCategory] =
    useState("General");

  const [lostFoundType, setLostFoundType] = useState("Lost");
  const [lostFoundItemName, setLostFoundItemName] = useState("");
  const [lostFoundDescription, setLostFoundDescription] =
    useState("");
  const [lostFoundLocation, setLostFoundLocation] = useState("");
  const [lostFoundDate, setLostFoundDate] = useState("");

  // ==========================================
  // FETCH ONLY THIS STUDENT'S COMPLAINTS
  // ==========================================

  const fetchComplaints = () => {
    if (!user?.id) {
      setComplaints([]);
      return;
    }

    fetch(
      `${API_URL}/api/complaints/student/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch complaints"
          );
        }

        return response.json();
      })
      .then((data) => {
        setComplaints(
          Array.isArray(data) ? data : []
        );
      })
      .catch((error) => {
        console.error(
          "Error fetching student complaints:",
          error
        );

        setComplaints([]);
      });
  };

  // ==========================================
  // FETCH ONLY THIS STUDENT'S LOST & FOUND
  // ==========================================

  const fetchLostFoundItems = () => {
    if (!user?.id) {
      setLostFoundItems([]);
      return;
    }

    fetch(
      `${API_URL}/api/lost-found/student/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch lost and found items"
          );
        }

        return response.json();
      })
      .then((data) => {
        setLostFoundItems(
          Array.isArray(data) ? data : []
        );
      })
      .catch((error) => {
        console.error(
          "Error fetching student lost and found:",
          error
        );

        setLostFoundItems([]);
      });
  };

  // ==========================================
  // FETCH DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    // EVENTS
    fetch(`${API_URL}/api/events`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch events"
          );
        }

        return response.json();
      })
      .then((data) => {
        setEvents(
          Array.isArray(data) ? data : []
        );
      })
      .catch((error) => {
        console.error(
          "Error fetching events:",
          error
        );

        setEvents([]);
      });

    // COMPLAINTS
    fetchComplaints();

    // ANNOUNCEMENTS
    fetch(`${API_URL}/api/announcements`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to fetch announcements"
          );
        }

        return response.json();
      })
      .then((data) => {
        setAnnouncements(
          Array.isArray(data) ? data : []
        );
      })
      .catch((error) => {
        console.error(
          "Error fetching announcements:",
          error
        );

        setAnnouncements([]);
      });

    // LOST & FOUND
    fetchLostFoundItems();
  }, []);

  // ==========================================
  // SUBMIT COMPLAINT
  // ==========================================

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert(
        "Student information not found. Please login again."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/complaints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studentId: user.id,
            title: complaintTitle,
            description: complaintDescription,
            category: complaintCategory,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          "Complaint submitted successfully!"
        );

        setComplaintTitle("");
        setComplaintDescription("");
        setComplaintCategory("General");

        fetchComplaints();
      } else {
        alert(
          data.message ||
            "Failed to submit complaint"
        );
      }
    } catch (error) {
      console.error(
        "Complaint error:",
        error
      );

      alert(
        "Unable to connect to server"
      );
    }
  };

  // ==========================================
  // SUBMIT LOST & FOUND
  // ==========================================

  const handleLostFoundSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert(
        "Student information not found. Please login again."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/lost-found`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studentId: user.id,
            type: lostFoundType,
            itemName: lostFoundItemName,
            description: lostFoundDescription,
            location: lostFoundLocation,
            date:
              lostFoundDate ||
              new Date().toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          `${lostFoundType} item reported successfully!`
        );

        setLostFoundType("Lost");
        setLostFoundItemName("");
        setLostFoundDescription("");
        setLostFoundLocation("");
        setLostFoundDate("");

        fetchLostFoundItems();
      } else {
        alert(
          data.message ||
            "Failed to report item"
        );
      }
    } catch (error) {
      console.error(
        "Lost and found error:",
        error
      );

      alert(
        "Unable to connect to server"
      );
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* SIDEBAR */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 md:block">

        <div className="flex items-center gap-3 border-b border-white/10 p-6">

          <div className="rounded-xl bg-violet-600 p-2">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="font-bold">
              Smart Campus
            </h1>

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

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="md:ml-64">

        {/* HEADER */}

        <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 py-5 backdrop-blur">

          <div>

            <p className="text-sm text-slate-400">
              Student Dashboard
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Welcome back, {user?.name} 👋
            </h1>

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
                  {user?.name}
                </p>

                <p className="text-xs text-slate-500">
                  {user?.role}
                </p>

              </div>

            </div>

          </div>

        </header>

        <div className="space-y-8 p-6">

          {/* STATS */}

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <CalendarDays size={22} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-slate-500"
                />

              </div>

              <p className="mt-5 text-sm text-slate-400">
                Upcoming Events
              </p>

              <h3 className="mt-1 text-3xl font-bold">
                {events.length}
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
                {announcements.length}
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
                {
                  complaints.filter(
                    (complaint) =>
                      complaint.status !==
                      "Resolved"
                  ).length
                }
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
                {
                  complaints.filter(
                    (complaint) =>
                      complaint.status ===
                      "Resolved"
                  ).length
                }
              </h3>

            </div>

          </section>

          {/* QUICK SERVICES */}

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

                  <a
                    key={service.title}
                    href={
                      service.title ===
                      "Lost & Found"
                        ? "#lost-found"
                        : service.title ===
                          "Events"
                        ? "#events"
                        : service.title ===
                          "Announcements"
                        ? "#announcements"
                        : service.title ===
                          "Complaints"
                        ? "#complaints"
                        : "#services"
                    }
                    className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-violet-500/30"
                  >

                    <div
                      className={`mb-4 w-fit rounded-xl p-3 ${service.color}`}
                    >
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

                  </a>

                );

              })}

            </div>

          </section>

          {/* COMPLAINTS */}

          <section id="complaints">

            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Submit a Complaint
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Report any campus issue
              </p>

            </div>

            <form
              onSubmit={handleComplaintSubmit}
              className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >

              <input
                type="text"
                placeholder="Complaint title"
                value={complaintTitle}
                onChange={(e) =>
                  setComplaintTitle(
                    e.target.value
                  )
                }
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
              />

              <select
                value={complaintCategory}
                onChange={(e) =>
                  setComplaintCategory(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
              >

                <option value="General">
                  General
                </option>

                <option value="Electrical">
                  Electrical
                </option>

                <option value="Cleanliness">
                  Cleanliness
                </option>

                <option value="Infrastructure">
                  Infrastructure
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

              <textarea
                placeholder="Describe your complaint"
                value={complaintDescription}
                onChange={(e) =>
                  setComplaintDescription(
                    e.target.value
                  )
                }
                required
                rows="4"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
              />

              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500"
              >
                Submit Complaint
              </button>

            </form>

            <div className="mt-6">

              <h3 className="mb-4 text-lg font-semibold">
                My Complaints
              </h3>

              <div className="space-y-3">

                {complaints.length === 0 ? (

                  <p className="text-sm text-slate-500">
                    You have not submitted any
                    complaints yet.
                  </p>

                ) : (

                  complaints.map((complaint) => (

                    <div
                      key={complaint._id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h4 className="font-semibold">
                            {complaint.title}
                          </h4>

                          <p className="mt-1 text-sm text-slate-500">
                            {complaint.description}
                          </p>

                          <p className="mt-2 text-xs text-slate-600">
                            Category:{" "}
                            {complaint.category}
                          </p>

                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            complaint.status ===
                            "Resolved"
                              ? "bg-green-500/10 text-green-400"
                              : complaint.status ===
                                "In Progress"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-orange-500/10 text-orange-400"
                          }`}
                        >
                          {complaint.status}
                        </span>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </section>

          {/* ANNOUNCEMENTS */}

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

              {announcements.length === 0 ? (

                <p className="text-sm text-slate-500">
                  No announcements available.
                </p>

              ) : (

                announcements.map(
                  (announcement) => (

                    <div
                      key={announcement._id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >

                      <div className="flex items-start gap-4">

                        <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                          <Megaphone size={20} />
                        </div>

                        <div className="flex-1">

                          <h3 className="font-semibold">
                            {announcement.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {announcement.message}
                          </p>

                          <p className="mt-3 text-xs text-slate-600">
                            {new Date(
                              announcement.date
                            ).toLocaleDateString()}
                          </p>

                          <p className="mt-1 text-xs text-violet-400">
                            {announcement.category}
                          </p>

                        </div>

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </section>

          {/* LOST & FOUND */}

          <section id="lost-found">

            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Lost & Found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Report lost or found belongings
              </p>

            </div>

            {/* REPORT FORM */}

            <form
              onSubmit={handleLostFoundSubmit}
              className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >

              <div className="grid gap-4 md:grid-cols-2">

                <select
                  value={lostFoundType}
                  onChange={(e) =>
                    setLostFoundType(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                >

                  <option value="Lost">
                    I Lost an Item
                  </option>

                  <option value="Found">
                    I Found an Item
                  </option>

                </select>

                <input
                  type="date"
                  value={lostFoundDate}
                  onChange={(e) =>
                    setLostFoundDate(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                />

              </div>

              <input
                type="text"
                placeholder="Item name"
                value={lostFoundItemName}
                onChange={(e) =>
                  setLostFoundItemName(
                    e.target.value
                  )
                }
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />

              <input
                type="text"
                placeholder="Location"
                value={lostFoundLocation}
                onChange={(e) =>
                  setLostFoundLocation(
                    e.target.value
                  )
                }
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />

              <textarea
                placeholder="Describe the item"
                value={lostFoundDescription}
                onChange={(e) =>
                  setLostFoundDescription(
                    e.target.value
                  )
                }
                required
                rows="4"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />

              <button
                type="submit"
                className="rounded-xl bg-violet-600 px-5 py-3 font-medium hover:bg-violet-500"
              >
                Report{" "}
                {lostFoundType === "Lost"
                  ? "Lost Item"
                  : "Found Item"}
              </button>

            </form>

            {/* MY ITEMS */}

            <div className="mt-8">

              <div className="mb-4">

                <h3 className="text-lg font-semibold">
                  My Reported Items
                </h3>

                <p className="text-sm text-slate-500">
                  Your reported lost and found items
                </p>

              </div>

              <div className="space-y-4">

                {lostFoundItems.length === 0 ? (

                  <p className="text-sm text-slate-500">
                    You have not reported any
                    lost or found items yet.
                  </p>

                ) : (

                  lostFoundItems.map((item) => (

                    <div
                      key={item._id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >

                      <div className="flex flex-col justify-between gap-4 md:flex-row">

                        <div>

                          <div className="flex items-center gap-3">

                            <h4 className="font-semibold">
                              {item.itemName}
                            </h4>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                item.type === "Lost"
                                  ? "bg-orange-500/10 text-orange-400"
                                  : "bg-green-500/10 text-green-400"
                              }`}
                            >
                              {item.type}
                            </span>

                          </div>

                          <p className="mt-2 text-sm text-slate-400">
                            {item.description}
                          </p>

                          <p className="mt-2 text-sm text-slate-500">
                            Location:{" "}
                            {item.location}
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            Date:{" "}
                            {new Date(
                              item.date
                            ).toLocaleDateString()}
                          </p>

                        </div>

                        <div>

                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                              item.status ===
                              "Active"
                                ? "bg-blue-500/10 text-blue-400"
                                : item.status ===
                                  "Resolved"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-violet-500/10 text-violet-400"
                            }`}
                          >
                            {item.status}
                          </span>

                        </div>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </section>

          {/* EVENTS */}

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

              {events.length === 0 ? (

                <p className="text-sm text-slate-500">
                  No upcoming events.
                </p>

              ) : (

                events.map((event) => {

                  const eventDate =
                    new Date(event.date);

                  return (

                    <div
                      key={event._id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >

                      <div className="flex gap-4">

                        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-violet-600/15 text-violet-400">

                          <span className="text-xs font-semibold">
                            {eventDate
                              .toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                }
                              )
                              .toUpperCase()}
                          </span>

                          <span className="text-2xl font-bold">
                            {eventDate.getDate()}
                          </span>

                        </div>

                        <div>

                          <h3 className="font-semibold">
                            {event.title}
                          </h3>

                          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                            <Clock size={15} />

                            {event.time}

                          </div>

                          <p className="mt-1 text-sm text-slate-500">
                            {event.location}
                          </p>

                          {event.description && (
                            <p className="mt-2 text-sm text-slate-500">
                              {event.description}
                            </p>
                          )}

                        </div>

                      </div>

                    </div>

                  );
                })

              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default StudentDashboard;