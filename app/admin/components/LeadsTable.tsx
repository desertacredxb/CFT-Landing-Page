"use client";

import { useEffect, useMemo, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LeadsTable() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 10;

  const [confirmAction, setConfirmAction] = useState<any>(null);

  /* ---------------- Fetch Leads ---------------- */

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API}/api/leads`);
      const data = await res.json();

      setLeads(data.leads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  console.log(leads);

  /* ---------------- Filters ---------------- */

  const filteredLeads = useMemo(() => {
    let filtered = [...leads];

    /* Search */

    if (search) {
      filtered = filtered.filter(
        (lead) =>
          lead.fullName.toLowerCase().includes(search.toLowerCase()) ||
          lead.email.toLowerCase().includes(search.toLowerCase()) ||
          lead.phone.includes(search),
      );
    }

    /* Date Filter */

    if (fromDate && toDate) {
      filtered = filtered.filter((lead) => {
        const created = new Date(lead.createdAt);
        return (
          created >= new Date(fromDate) &&
          created <= new Date(toDate + "T23:59")
        );
      });
    }

    return filtered;
  }, [search, fromDate, toDate, leads]);

  /* ---------------- Pagination ---------------- */

  const totalPages = Math.ceil(filteredLeads.length / perPage);

  const paginatedLeads = filteredLeads.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  /* ---------------- Delete ---------------- */

  const deleteLead = async (id: string) => {
    await fetch(`${API}/api/leads/${id}`, { method: "DELETE" });
    fetchLeads();
  };

  /* ---------------- Update Status ---------------- */

  const updateStatus = async (id: string, accountStatus: string) => {
    await fetch(`${API}/api/leads/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountStatus }),
    });

    fetchLeads();
  };

  const updateLeadStatus = async (id: string, status: string) => {
    await fetch(`${API}/api/leads/lead-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchLeads();
  };

  /* ---------------- Confirm Handler ---------------- */

  const handleConfirm = async () => {
    if (!confirmAction) return;

    if (confirmAction.type === "delete") {
      await deleteLead(confirmAction.id);
    }

    if (confirmAction.type === "accountStatus") {
      await updateStatus(confirmAction.id, confirmAction.value);
    }

    if (confirmAction.type === "leadStatus") {
      await updateLeadStatus(confirmAction.id, confirmAction.value);
    }

    setConfirmAction(null);
  };

  /* ---------------- Export CSV ---------------- */

  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "City",
      "Account Status",
      "Created Date",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.fullName,
      lead.email,
      `${lead.countryCode} ${lead.phone}`,
      lead.city,
      lead.accountStatus,
      new Date(lead.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");

    link.href = encodeURI(csvContent);
    link.download = "leads.csv";

    document.body.appendChild(link);

    link.click();
  };

  /* ---------------- Skeleton Loader ---------------- */

  if (loading) {
    return (
      <div className="space-y-3 p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-12 animate-pulse rounded bg-[var(--cft-bg-surface)]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="p-2 bg-[var(--cft-bg-surface)] border border-[var(--cft-border)] rounded"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 bg-[var(--cft-bg-surface)] border border-[var(--cft-border)] rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 bg-[var(--cft-bg-surface)] border border-[var(--cft-border)] rounded"
        />

        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] cursor-pointer"
        >
          Export CSV
        </button>
      </div>

      {/* No Leads */}

      {filteredLeads.length === 0 && (
        <div className="p-10 text-center text-[var(--cft-text-muted)]">
          No leads found.
        </div>
      )}

      {/* Table */}

      {filteredLeads.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-[var(--cft-border)]">
            <thead className="bg-[var(--cft-bg-card)]">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">City</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Account Status</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-t border-[var(--cft-border)]"
                >
                  <td className="p-3">{lead.fullName}</td>

                  <td className="p-3">{lead.email}</td>

                  <td className="p-3">
                    {lead.countryCode} {lead.phone}
                  </td>

                  <td className="p-3">{lead.city}</td>

                  <td className="p-3">
                    <select
                      value={lead.accountStatus}
                      onChange={(e) =>
                        setConfirmAction({
                          type: "accountStatus",
                          id: lead._id,
                          value: e.target.value,
                        })
                      }
                      className="bg-[var(--cft-bg-surface)] p-2 rounded"
                    >
                      <option>In Process</option>
                      <option>Demo Shared</option>
                      <option>ID Created</option>
                    </select>
                  </td>

                  <td className="p-3">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        setConfirmAction({
                          type: "leadStatus",
                          id: lead._id,
                          value: e.target.value.toLowerCase(),
                        })
                      }
                      className="bg-[var(--cft-bg-surface)] p-2 rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="p-3">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        setConfirmAction({
                          type: "delete",
                          id: lead._id,
                        })
                      }
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex gap-2 justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded cursor-pointer"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {/* Confirmation Modal */}

      {confirmAction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-[var(--cft-bg-card)] p-6 rounded-lg border border-[var(--cft-border)] w-[350px] text-center space-y-4">
            <h3 className="text-lg font-semibold">Confirm Action</h3>

            <p className="text-[var(--cft-text-muted)]">
              Are you sure you want to proceed?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 rounded border border-[var(--cft-border)] cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
