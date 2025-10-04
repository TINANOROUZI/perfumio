"use client";

type Props = {
  name: string;
  active: boolean;
  onClick: () => void;
};

export function BrandBadge({ name, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-sm ${
        active ? "bg-black text-white border-black" : "border-black/10"
      }`}
    >
      {name}
    </button>
  );
}
