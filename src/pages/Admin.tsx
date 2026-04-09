import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import AdminLogin from "../components/admin/AdminLogin";
import AnalyticsTab from "../components/admin/AnalyticsTab";
import PastEventsTab from "../components/admin/PastEventsTab";
import UpcomingEventsTab from "../components/admin/UpcomingEventsTab";
import OfficersTab from "../components/admin/OfficersTab";
import SiteContentTab from "../components/admin/SiteContentTab";

type Tab = "analytics" | "past-events" | "upcoming-events" | "officers" | "site-content";

const tabs: { id: Tab; label: string }[] = [
  { id: "analytics", label: "Analytics" },
  { id: "upcoming-events", label: "Upcoming Events" },
  { id: "past-events", label: "Past Events" },
  { id: "officers", label: "Officers" },
  { id: "site-content", label: "Site Content" },
];

const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("upcoming-events");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={process.env.PUBLIC_URL + "/mainLogo.png"}
              alt="Permias Logo"
              className="h-8"
            />
            <span className="font-semibold text-footer text-lg">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">
              {session.user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-800 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? "border-red text-red"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "past-events" && <PastEventsTab />}
        {activeTab === "upcoming-events" && <UpcomingEventsTab />}
        {activeTab === "officers" && <OfficersTab />}
        {activeTab === "site-content" && <SiteContentTab />}
      </div>
    </div>
  );
};

export default AdminPage;
