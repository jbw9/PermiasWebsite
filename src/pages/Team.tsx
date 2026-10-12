import React, { useEffect, useRef, useState } from "react";
import OfficerCards from "../components/officer/cards";
import Popup from "../components/officer/card-popup";
import PageBanner from "../components/PageBanner";
import SectionHeading from "../components/SectionHeading";
import { supabase } from "../supabaseClient";
import { Officer } from "../types";
import { useSiteContent } from "../hooks/useSiteContent";
import { getImageSrc } from "../utils/imageSrc";

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
    supabase
      .from("officers")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setOfficers(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || officers.length === 0) return;

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
  }, [loading, officers]);

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
          <div className="w-full" ref={gridRef}>
            <div className="flex flex-wrap justify-center gap-y-14 gap-x-[120px]">
              {officers.map((member) => (
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
