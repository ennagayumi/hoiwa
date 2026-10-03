import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`logo${light ? " logo--light" : ""}`} href="/" aria-label="帆岩（ほいわ）ホーム">
      <svg viewBox="0 0 44 44" role="img" aria-label="帆岩 シンボル">
        <path d="M7 5h6v34H7zM31 5h6v34h-6zM13 18h18v7H13z" />
        <path className="logo__accent" d="M31 5 13 18V5z" />
      </svg>
      <span className="logo__name"><strong><span>帆</span><span>岩</span></strong><small><span>H</span><span>O</span><span>I</span><span>W</span><span>A</span></small></span>
    </Link>
  );
}
