import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquareWarning,
  CalendarDays,
  Megaphone,
  LogOut,
  CheckCircle,
  Clock,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/complaints")
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/complaints/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const updatedComplaint = await response.json();

      if (response.ok) {
        setComplaints((currentComplaints) =>
          currentComplaints.map((complaint) =>
            complaint._id === updatedComplaint._id
              ? updatedComplaint
              : complaint
          )
        );
      } else {
        alert(updatedComplaint.message || "Failed to update complaint");
      }
    } catch (error) {
      console.error("Update complaint error:", error);
      alert("Unable to connect to server");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-900 md:block">
        <div className="flex items-center gap-3 border-b border-white/10 p-6">
          <div className="rounded-xl bg-violet-600 p-2">
            <LayoutDashboard size={22} />
          </div>

          <div>
            <h1 className="font-bold">Smart Campus</h1>
            <p className="text-xs text-slate-500">
              Admin Portal
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

      <main className="md:ml-64">
        <header className="border-b border-white/10 bg-slate-950/80 px-6 py-5">
          <p className="text-sm text-slate-400">
            Admin Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold">
            Campus Management
          </h1>
        </header>

        <div className="space-y-8 p-6">
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                    (complaint) => complaint.status === "Pending"
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
                    (complaint) => complaint.status === "Resolved"
                  ).length
                }
              </h2>
            </div>
          </section>

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
                          Category: {complaint.category}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Student:{" "}
                          {complaint.studentId?.name || "Unknown"}
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
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;