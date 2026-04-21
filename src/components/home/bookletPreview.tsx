import React from "react";
import { useSiteContent } from "../../hooks/useSiteContent";

interface CanvaPreviewProps {
  width?: string;
  height?: string;
}

const CanvaPreview: React.FC<CanvaPreviewProps> = ({
  width = "100%",
  height = "600px",
}) => {
  const content = useSiteContent(
    ["home_booklet_title", "home_booklet_link_url", "home_booklet_embed_url"],
    {
      home_booklet_title: "New Students Booklet",
      home_booklet_link_url:
        "https://www.canva.com/design/DAGG1vUJC5M/EzHcDifJjS5rL2imbr-gMA/view?utm_content=DAGG1vUJC5M&utm_campaign=designshare&utm_medium=embeds&utm_source=link",
      home_booklet_embed_url:
        "https://www.canva.com/design/DAGG1vUJC5M/EzHcDifJjS5rL2imbr-gMA/view?embed",
    }
  );

  // Split title into words — first word(s) gray, last word red, to preserve original style
  const words = content.home_booklet_title.trim().split(/\s+/);
  const lastWord = words.pop() ?? "";
  const firstWords = words.join(" ");

  return (
    <div style={{ width, height }}>
      <a
        href={content.home_booklet_link_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-4xl md:text-5xl"
      >
        {firstWords && (
          <span className="font-semibold text-footer">{firstWords} </span>
        )}
        <span className="font-bold text-red">{lastWord}</span>
      </a>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "0",
          paddingTop: "129.4118%",
          paddingBottom: "0",
          boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
          marginTop: "1.6em",
          marginBottom: "0.9em",
          overflow: "hidden",
          borderRadius: "8px",
          willChange: "transform",
        }}
      >
        <iframe
          loading="lazy"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            border: "none",
            padding: "0",
            margin: "0",
          }}
          src={content.home_booklet_embed_url}
          allowFullScreen
          allow="fullscreen"
          title={content.home_booklet_title}
        />
      </div>
    </div>
  );
};

export default CanvaPreview;
