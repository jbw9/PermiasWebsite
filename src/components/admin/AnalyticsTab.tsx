import React, { useEffect, useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { supabase } from "../../supabaseClient";
import { LinkClick, PageView } from "../../types";

const GEO_URL = process.env.PUBLIC_URL + "/world-110m.json";

// --- helpers ---

function ctLastNDates(n: number): string[] {
  const dates: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return "🌐";
  const offset = 127397;
  return Array.from(code.toUpperCase())
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + offset))
    .join("");
}

interface DailyStats {
  date: string;
  views: number;
  unique: number;
}

interface CountryStats {
  country: string;
  country_code: string;
  count: number;
  lat: number;
  lon: number;
}

// --- sub-components ---

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-semibold text-footer mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function Sparkline({ data, color, height = 48 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-px" style={{ height }}>
      {data.map((v, i) => (
        <div key={i} className="relative flex-1 group h-full flex items-end">
          <div
            className="w-full rounded-sm transition-all"
            style={{
              height: `${Math.max(4, (v / max) * 100)}%`,
              backgroundColor: color,
              opacity: v === 0 ? 0.15 : 1,
            }}
          />
        </div>
      ))}
    </div>
  );
}

// --- main ---

const AnalyticsTab: React.FC = () => {
  const [views, setViews] = useState<PageView[]>([]);
  const [clicks, setClicks] = useState<LinkClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [tooltip, setTooltip] = useState<{ name: string; count: number } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const [viewsRes, clicksRes] = await Promise.all([
      supabase
        .from("page_views")
        .select("*")
        .gte("timestamp", since.toISOString())
        .order("timestamp", { ascending: false }),
      supabase
        .from("link_clicks")
        .select("*")
        .order("count", { ascending: false }),
    ]);

    if (viewsRes.data) setViews(viewsRes.data);
    if (clicksRes.data) setClicks(clicksRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // --- derived data ---
  const dates = ctLastNDates(30);

  const dailyData: DailyStats[] = dates.map((date) => {
    const dayViews = views.filter((v) => v.timestamp.startsWith(date));
    const unique = new Set(dayViews.map((v) => v.visitor_id)).size;
    return { date, views: dayViews.length, unique };
  });

  const totalViews = views.length;
  const uniqueVisitors = new Set(views.map((v) => v.visitor_id)).size;
  const todayViews = dailyData[dailyData.length - 1]?.views ?? 0;

  const pageCounts: Record<string, number> = {};
  views.forEach((v) => { pageCounts[v.path] = (pageCounts[v.path] || 0) + 1; });
  const topPage = Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0];

  // Country aggregation for map
  const countryMap: Record<string, CountryStats> = {};
  views.forEach((v) => {
    if (!v.country_code) return;
    if (!countryMap[v.country_code]) {
      countryMap[v.country_code] = {
        country: v.country,
        country_code: v.country_code,
        count: 0,
        lat: v.latitude,
        lon: v.longitude,
      };
    }
    countryMap[v.country_code].count++;
  });
  const countryStats = Object.values(countryMap).sort((a, b) => b.count - a.count);
  const maxCountry = countryStats[0]?.count || 1;

  const handleReset = async () => {
    if (!window.confirm("Reset all link click counts to 0?")) return;
    setResetting(true);
    await supabase.from("link_clicks").update({ count: 0 }).gt("count", -1);
    await fetchData();
    setResetting(false);
  };

  if (loading) {
    return <p className="text-gray-400 py-10 text-center">Loading analytics...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-footer">Analytics</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Page Views (30d)" value={fmt(totalViews)} />
        <StatCard
          label="Unique Visitors (30d)"
          value={fmt(uniqueVisitors)}
          sub={`${totalViews > 0 ? Math.round((uniqueVisitors / totalViews) * 100) : 0}% of views`}
        />
        <StatCard label="Today's Views" value={fmt(todayViews)} />
        <StatCard
          label="Top Page"
          value={topPage ? topPage[0] : "—"}
          sub={topPage ? `${fmt(topPage[1])} views` : undefined}
        />
      </div>

      {/* Visitor sparkline */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm font-medium text-gray-700 mb-3">Daily Visitors — Last 30 Days</p>
        {totalViews === 0 ? (
          <p className="text-sm text-gray-400">No visits recorded yet.</p>
        ) : (
          <div className="space-y-2">
            <Sparkline data={dailyData.map((d) => d.unique)} color="#34d399" height={48} />
            <Sparkline data={dailyData.map((d) => d.views)} color="#93c5fd" height={32} />
            <div className="flex gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-2 rounded-sm" style={{ background: "#34d399" }} />
                Unique visitors
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-2 rounded-sm" style={{ background: "#93c5fd" }} />
                Page views
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>{dates[0]}</span>
              <span>{dates[dates.length - 1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* World map */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-sm font-medium text-gray-700 mb-3">Visitor Locations</p>
        {countryStats.length === 0 ? (
          <p className="text-sm text-gray-400">No geo data yet — visitors will appear here once tracked.</p>
        ) : (
          <>
            <div className="rounded-lg overflow-hidden" style={{ background: "#f8fafc" }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 120, center: [0, 20] }}
                style={{ width: "100%", height: "auto" }}
              >
                <ZoomableGroup zoom={1}>
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#E2E8F0"
                          stroke="#CBD5E1"
                          strokeWidth={0.3}
                          style={{
                            default: { outline: "none" },
                            hover: { outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                  {countryStats.map((c) =>
                    c.lat && c.lon ? (
                      <Marker
                        key={c.country_code}
                        coordinates={[c.lon, c.lat]}
                        onMouseEnter={() => setTooltip({ name: c.country, count: c.count })}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        <circle
                          r={Math.max(3, Math.sqrt(c.count / maxCountry) * 18)}
                          fill="#EF4444"
                          fillOpacity={0.6}
                          stroke="#fff"
                          strokeWidth={0.8}
                          style={{ cursor: "pointer" }}
                        />
                      </Marker>
                    ) : null
                  )}
                </ZoomableGroup>
              </ComposableMap>
            </div>
            {tooltip && (
              <div className="text-xs text-gray-600 mt-1 text-center">
                {tooltip.name} — {fmt(tooltip.count)} view{tooltip.count !== 1 ? "s" : ""}
              </div>
            )}

            {/* Top countries table */}
            <div className="mt-4 space-y-2">
              {countryStats.slice(0, 8).map((c) => (
                <div key={c.country_code} className="flex items-center gap-3 text-sm">
                  <span className="text-lg w-6 text-center">{countryCodeToFlag(c.country_code)}</span>
                  <span className="w-36 truncate text-gray-700">{c.country || c.country_code}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-red h-2 rounded-full"
                      style={{ width: `${Math.max((c.count / maxCountry) * 100, 2)}%` }}
                    />
                  </div>
                  <span className="text-gray-500 w-10 text-right">{fmt(c.count)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Link clicks */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-700">Link Clicks</p>
          <button
            onClick={handleReset}
            disabled={resetting}
            className="text-xs bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-200 transition disabled:opacity-50"
          >
            {resetting ? "Resetting..." : "Reset Counts"}
          </button>
        </div>
        {clicks.length === 0 ? (
          <p className="text-sm text-gray-400">No link clicks tracked yet.</p>
        ) : (
          <div className="space-y-3">
            {clicks.map((item) => {
              const maxClicks = clicks[0]?.count || 1;
              return (
                <div key={item.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium capitalize text-gray-700">{item.link_name}</span>
                    <span className="text-gray-500">{fmt(item.count)} clicks</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-red h-2 rounded-full"
                      style={{ width: `${Math.max((item.count / maxClicks) * 100, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsTab;
