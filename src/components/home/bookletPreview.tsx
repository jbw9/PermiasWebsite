import React from "react";

interface CanvaPreviewProps {
  width?: string;
  height?: string;
}

const CanvaPreview: React.FC<CanvaPreviewProps> = ({
  width = "100%",
  height = "600px",
}) => {
  return (
    <div style={{ width, height }}>
      <a
        href="https://www.canva.com/design/DAGG1vUJC5M/EzHcDifJjS5rL2imbr-gMA/view?utm_content=DAGG1vUJC5M&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
        target="_blank"
        rel="noopener noreferrer"
        className="text-4xl md:text-5xl"
      >
        <span className="font-semibold text-footer">New {""}</span>
        <span className="font-bold text-red">Students {""}</span>
        <span className="font-semibold text-footer">Booklet</span>
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
          src="https://www.canva.com/design/DAGG1vUJC5M/EzHcDifJjS5rL2imbr-gMA/view?embed"
          allowFullScreen
          allow="fullscreen"
          title="New Students Booklet"
        />
      </div>
    </div>
  );
};

export default CanvaPreview;
