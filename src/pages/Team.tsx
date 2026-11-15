import React, { useEffect, useRef, useState, useMemo } from "react";
import OfficerCards from "../components/officer/cards";
import Popup from "../components/officer/card-popup";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { supabase } from "../supabaseClient";
import { Officer } from "../types";
import { useSiteContent } from "../hooks/useSiteContent";
import { getImageSrc } from "../utils/imageSrc";
import {
  teamMembers as default2025Members,
  convertTeamMemberToOfficer,
  getOfficerTeam,
  sortOfficersLeaderFirst,
  TEAM_DIVISIONS,
} from "../data/team_members";

interface TeamGroup {
  teamName: string;
  officers: Officer[];
}

const TeamPage: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Officer | null>(null);
  const content = useSiteContent(
    ["team_banner_url", "team_heading_white", "team_heading_red"],
    {
      team_banner_url: "/officers/teambg2024.png",
      team_heading_white: "Meet",
      team_heading_red: "Our Officers",
    }
  );

  useEffect(() => {
    let isMounted = true;
    async function fetchOfficers() {
      try {
        const { data, error } = await supabase
          .from("officers")
          .select("*")
          .order("display_order", { ascending: true });

        if (isMounted) {
          const baseOfficers = default2025Members.map((m, idx) =>
            convertTeamMemberToOfficer(m, idx)
          );

          if (!error && data && data.length > 0) {
            const entries: Officer[] = [...baseOfficers];

            const getFirstToken = (name: string) =>
              name.toLowerCase().trim().split(/\s+/)[0] || "";

            const pickFullerName = (a: string, b: string) => {
              const aWords = a.trim().split(/\s+/).length;
              const bWords = b.trim().split(/\s+/).length;
              if (aWords !== bWords) return aWords > bWords ? a : b;
              return a.trim().length >= b.trim().length ? a : b;
            };

            data.forEach((dbOff: Officer) => {
              const dbNorm = dbOff.name.toLowerCase().trim();
              const dbFirst = getFirstToken(dbOff.name);
              const dbTeam = getOfficerTeam(dbOff.role, dbOff.team);

              const matchIdx = entries.findIndex((existing) => {
                const exNorm = existing.name.toLowerCase().trim();
                if (exNorm === dbNorm) return true;
                const exFirst = getFirstToken(existing.name);
                const exTeam = getOfficerTeam(existing.role, existing.team);
                // Match first-name-only entry with full first+last name entry in the same team
                return (
                  exFirst === dbFirst &&
                  exTeam === dbTeam &&
                  (exNorm === exFirst || dbNorm === dbFirst)
                );
              });

              if (matchIdx !== -1) {
                const existing = entries[matchIdx];
                entries[matchIdx] = {
                  ...existing,
                  ...dbOff,
                  name: pickFullerName(existing.name, dbOff.name),
                  team: dbOff.team || existing.team,
                  image_url: dbOff.image_url || existing.image_url,
                  fun_image_url: dbOff.fun_image_url || existing.fun_image_url,
                  bio: dbOff.bio || existing.bio,
                  instagram: dbOff.instagram || existing.instagram,
                  linkedin: dbOff.linkedin || existing.linkedin,
                };
              }
            });

            setOfficers(entries);
          } else {
            setOfficers(baseOfficers);
          }
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setOfficers(
            default2025Members.map((m, idx) => convertTeamMemberToOfficer(m, idx))
          );
          setLoading(false);
        }
      }
    }

    fetchOfficers();
    return () => {
      isMounted = false;
    };
  }, []);

  const groupedTeams = useMemo<TeamGroup[]>(() => {
    const map = new Map<string, Officer[]>();

    officers.forEach((officer) => {
      const teamName = getOfficerTeam(officer.role, officer.team);
      if (!map.has(teamName)) {
        map.set(teamName, []);
      }
      map.get(teamName)!.push(officer);
    });

    const groups: TeamGroup[] = [];

    TEAM_DIVISIONS.forEach((div) => {
      const officersInTeam = map.get(div.name);
      if (officersInTeam && officersInTeam.length > 0) {
        groups.push({
          teamName: div.name,
          officers: sortOfficersLeaderFirst(officersInTeam),
        });
        map.delete(div.name);
      }
    });

    map.forEach((officersInTeam, teamName) => {
      if (officersInTeam.length > 0) {
        groups.push({
          teamName,
          officers: sortOfficersLeaderFirst(officersInTeam),
        });
      }
    });

    return groups;
  }, [officers]);

  useEffect(() => {
    if (loading || groupedTeams.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    const cards = gridRef.current?.querySelectorAll(".officer-card");
    cards?.forEach((card) => observer.observe(card));
    return () => cards?.forEach((card) => observer.unobserve(card));
  }, [loading, groupedTeams]);

  return (
    <div className="mb-[70px]">
      <PageBanner src={getImageSrc(content.team_banner_url)} />
      <div className="flex justify-center my-[40px] md:my-[75px]">
        <SectionHeading
          lead={content.team_heading_white}
          emphasis={content.team_heading_red}
        />
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="text-lg text-gray-400">Loading officers...</span>
        </div>
      ) : (
        <div className="flex justify-center w-full h-full">
          <div className="w-full space-y-16" ref={gridRef}>
            {groupedTeams.map((group) => (
              <div key={group.teamName}>
                <h2 className="text-3xl font-semibold text-center text-footer md:text-4xl mb-2">
                  {group.teamName}
                </h2>
                <p className="text-center text-lg text-gray-600 mb-8 px-4">
                  {group.officers.map((member) => member.name).join(", ")}
                </p>
                <div className="flex flex-wrap justify-center gap-y-14 gap-x-[120px]">
                  {group.officers.map((member) => (
                    <div key={member.id} className="flex justify-center p-4">
                      <OfficerCards
                        member={member}
                        className="flex-grow opacity-0 officer-card"
                        onClick={() => setSelectedMember(member)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedMember && (
        <Popup
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          member={selectedMember}
        />
      )}
    </div>
  );
};

export default TeamPage;
