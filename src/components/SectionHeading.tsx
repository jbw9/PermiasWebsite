import React from "react";

interface SectionHeadingProps {
  lead: string;
  emphasis: string;
  className?: string;
}

// Two-tone heading used across pages: navy lead word(s), red emphasis.
const SectionHeading: React.FC<SectionHeadingProps> = ({
  lead,
  emphasis,
  className,
}) => (
  <div className={className}>
    <span className="text-4xl font-semibold md:text-5xl text-footer">
      {lead}{" "}
    </span>
    <span className="text-4xl font-bold md:text-5xl text-red">{emphasis}</span>
  </div>
);

export default SectionHeading;
