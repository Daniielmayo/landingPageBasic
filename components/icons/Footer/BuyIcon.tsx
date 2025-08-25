// icon:card-outline | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from "react";

function IconCardOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M104 96 H408 A56 56 0 0 1 464 152 V360 A56 56 0 0 1 408 416 H104 A56 56 0 0 1 48 360 V152 A56 56 0 0 1 104 96 z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={60}
        d="M48 192h416M128 300h48v20h-48z"
      />
    </svg>
  );
}

export default IconCardOutline;
