import { useState } from "react";

function ResponsiveIframe({
  url,
  height = 800,
  width = 800,
}: {
  url: string;
  height: number;
  width: number;
}) {
  const [_width, setWidth] = useState(width); // Initial mobile width
  const [_height, setHeight] = useState(height); // Initial mobile width

  const handleWidthChange = (event: any) => {
    setWidth(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <p className="text-sm text-zinc-400">{`[${_width}, ${_height}][w, h]`}</p>
      <iframe
        src={url}
        width={_width}
        height={_height}
        title="Responsive Preview"
        className="rounded overflow-hidden"
      />
    </div>
  );
}

export default ResponsiveIframe;
