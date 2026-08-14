import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  MessageSquareWarning,
  CalendarDays,
  Megaphone,
  Search,
  LogOut,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";

const API_URL =
  "https://obscure-space-enigma-q76pp7r69649f9qw4-5000.app.github.dev";

function FacultyDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [lostFoundItems, setLostFoundItems] = useState([]);

  // Event states
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  // Announcement states
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [announcementDate, setAnnouncementDate] = useState("");
  const [announcementCategory, setAnnouncementCategory] =
    useState("General");

  // Fetch complaints and lost & found
  useEffect(() => {
    fetch(`${API_URL}/api/complaints`)
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });

    fetch(`${API_URL}/api/lost-found`)
      .then((response) => response.json())
      .then((data) => {
        setLostFoundItems(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching lost and found:",
          error
        );
      });
  }, []);

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `${API_URL}/api/complaints/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setComplaints((current) =>
          current.map((complaint) =>
            complaint._id === data._id
              ? {
                  ...complaint,
                  status: data.status,
                }
              : complaint
          )
        );
      } else {
        alert(
          data.message ||
            "Failed to update complaint"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  // Update Lost & Found status
  const updateLostFoundStatus = async (
    id,
    status
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/api/lost-found/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLostFoundItems((current) =>
          current.map((item) =>
            item._id === data._id
              ? data
              : item
          )
        );
      } else {
        alert(
          data.message ||
            "Failed to update item"
        );
      }
    } catch (error) {
      console.error(
        "Update lost and found error:",
        error
      );

      alert("Unable to connect to server");
    }
  };

  // Create event
  const handleEventSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: eventTitle,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event created successfully!");

        setEventTitle("");
        setEventDate("");
        setEventTime("");
        setEventLocation("");
        setEventDescription("");
      } else {
        alert(
          data.message ||
            "Failed to create event"
        );
      }
    } catch (error) {
      console.error(
        "Create event error:",
        error
      );

      alert("Unable to connect to server");
    }
  };

  // Create announcement
  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/api/announcements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: announcementTitle,
            message: announcementMessage,
            date:
              announcementDate ||
              new Date().toISOString(),
            category: announcementCategory,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          "Announcement created successfully!"
        );

        setAnnouncementTitle("");
        setAnnouncementMessage("");
        setAnnouncementDate("");
        setAnnouncementCategory("General");
      } else {
        alert(
          data.message ||
            "Failed to create announcement"
        );
      }
    } catch (error) {
      console.error(
        "Create announcement error:",
        error
      );

      alert("Unable to connect to server");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}

      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 md:block">

        <div className="flex items-center gap-3 border-b border-white/10 p-6">

          <div className="rounded-xl bg-violet-600 p-2">
            <LayoutDashboard size={22} />
          </div>

          <div>

            <h1 className="font-bold">
              Smart Campus
            </h1>

            <p className="text-xs text-slate-500">
              Faculty Portal
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
            href="#complaints"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <MessageSquareWarning size={19} />
            Complaints
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
            href="#lost-found"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <Search size={19} />
            Lost & Found
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

      {/* Main */}

      <main className="md:ml-64">

        {/* Header */}

        <header className="border-b border-white/10 bg-slate-950/80 px-6 py-5">

          <p className="text-sm text-slate-400">
            Faculty Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            Campus Management
          </h1>

        </header>

        <div className="space-y-8 p-6">

          {/* Statistics */}

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <MessageSquareWarning className="text-orange-400" />

              <p className="mt-4 text-sm text-slate-400">
                Total Complaints
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {complaints.length}
              </h2>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <Clock className="text-blue-400" />

              <p className="mt-4 text-sm text-slate-400">
                Pending
              </p>

              <h2 className="mt-1 text-3xl font-bold">

                {
                  complaints.filter(
                    (complaint) =>
                      complaint.status ===
                      "Pending"
                  ).length
                }

              </h2>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <CheckCircle className="text-green-400" />

              <p className="mt-4 text-sm text-slate-400">
                Resolved
              </p>

              <h2 className="mt-1 text-3xl font-bold">

                {
                  complaints.filter(
                    (complaint) =>
                      complaint.status ===
                      "Resolved"
                  ).length
                }

              </h2>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

              <Search className="text-violet-400" />

              <p className="mt-4 text-sm text-slate-400">
                Lost & Found
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {lostFoundItems.length}
              </h2>

            </div>

          </section>

          {/* Complaints */}

          <section id="complaints">

            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Manage Complaints
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review and update student complaints
              </p>

            </div>

            <div className="space-y-4">

              {complaints.length === 0 ? (

                <p className="text-sm text-slate-500">
                  No complaints found.
                </p>

              ) : (

                complaints.map((complaint) => (

                  <div
                    key={complaint._id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >

                    <div className="flex flex-col justify-between gap-4 md:flex-row">

                      <div>

                        <h3 className="font-semibold">
                          {complaint.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {complaint.description}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          Category:{" "}
                          {complaint.category}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Student:{" "}
                          {complaint.studentId?.name ||
                            "Unknown"}
                        </p>

                      </div>

                      <select
                        value={complaint.status}
                        onChange={(e) =>
                          updateStatus(
                            complaint._id,
                            e.target.value
                          )
                        }
                        className="h-fit rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white outline-none"
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                      </select>

                    </div>

                  </div>

                ))

              )}

            </div>

          </section>

          {/* Events */}

          <section id="events">

            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Create Event
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add a new campus event for students
              </p>

            </div>

            <form
              onSubmit={handleEventSubmit}
              className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >

              <input
                type="text"
                placeholder="Event title"
                value={eventTitle}
                onChange={(e) =>
                  setEventTitle(e.target.value)
                }
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />

              <div className="grid gap-4 md:grid-cols-2">

                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) =>
                    setEventDate(e.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                />

                <input
                  type="text"
                  placeholder="Time e.g. 10:00 AM"
                  value={eventTime}
                  onChange={(e) =>
                    setEventTime(e.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                />

              </div>

              <input
                type="text"
                placeholder="Location"
                value={eventLocation}
                onChange={(e) =>
                  setEventLocation(e.target.value)
                }
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />

              <textarea
                placeholder="Event description"
                value={eventDescription}
                onChange={(e) =>
                  setEventDescription(
                    e.target.value
                  )
                }
                required
                rows="4"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500"
              >

                <Plus size={18} />

                Create Event

              </button>

            </form>

          </section>

          {/* Announcements */}

          <section id="announcements">

            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Create Announcement
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Share important information with students
              </p>

            </div>

            <form
              onSubmit={handleAnnouncementSubmit}
              className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >

              <input
                type="text"
                placeholder="Announcement title"
                value={announcementTitle}
                onChange={(e) =>
                  setAnnouncementTitle(
                    e.target.value
                  )
                }
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />

              <textarea
                placeholder="Announcement message"
                value={announcementMessage}
                onChange={(e) =>
                  setAnnouncementMessage(
                    e.target.value
                  )
                }
                required
                rows="4"
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
              />

              <div className="grid gap-4 md:grid-cols-2">

                <input
                  type="date"
                  value={announcementDate}
                  onChange={(e) =>
                    setAnnouncementDate(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                />

                <select
                  value={announcementCategory}
                  onChange={(e) =>
                    setAnnouncementCategory(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                >

                  <option value="General">
                    General
                  </option>

                  <option value="Academic">
                    Academic
                  </option>

                  <option value="Exam">
                    Exam
                  </option>

                  <option value="Event">
                    Event
                  </option>

                  <option value="Important">
                    Important
                  </option>

                </select>

              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500"
              >

                <Plus size={18} />

                Create Announcement

              </button>

            </form>

          </section>

          {/* Lost & Found */}

          <section id="lost-found">

            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Manage Lost & Found
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review and update reported lost and
                found items
              </p>

            </div>

            <div className="space-y-4">

              {lostFoundItems.length === 0 ? (

                <p className="text-sm text-slate-500">
                  No lost or found items reported.
                </p>

              ) : (

                lostFoundItems.map((item) => (

                  <div
                    key={item._id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >

                    <div className="flex flex-col justify-between gap-4 md:flex-row">

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="font-semibold">
                            {item.itemName}
                          </h3>

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

                        <p className="mt-1 text-xs text-slate-500">
                          Student:{" "}
                          {item.studentId?.name ||
                            "Unknown"}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          Date:{" "}
                          {new Date(
                            item.date
                          ).toLocaleDateString()}
                        </p>

                      </div>

                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateLostFoundStatus(
                            item._id,
                            e.target.value
                          )
                        }
                        className="h-fit rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white outline-none"
                      >

                        <option value="Active">
                          Active
                        </option>

                        <option value="Claimed">
                          Claimed
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                      </select>

                    </div>

                  </div>

                ))

              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default FacultyDashboard;