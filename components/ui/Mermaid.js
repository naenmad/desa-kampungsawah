"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "loose",
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    nodeSpacing: 40,
    rankSpacing: 55,
  },
  themeVariables: {
    primaryColor: "#059669",
    primaryTextColor: "#ffffff",
    lineColor: "#10b981",
  }
});

export default function Mermaid({ chart }) {
  const uniqueId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const { svg: renderedSvg } = await mermaid.render(`mermaid-${uniqueId}`, chart);
        if (!cancelled) {
          setSvg(renderedSvg);
          setError("");
        }
      } catch {
        if (!cancelled) {
          setSvg("");
          setError("Bagan organisasi gagal dimuat.");
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, uniqueId]);

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
      <div className="mx-auto min-w-[720px] max-w-full flex justify-center">
        {error ? (
          <p className="py-6 text-center text-xs text-gray-400">{error}</p>
        ) : (
          <div className="w-full [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none" dangerouslySetInnerHTML={{ __html: svg }} />
        )}
      </div>
    </div>
  );
}