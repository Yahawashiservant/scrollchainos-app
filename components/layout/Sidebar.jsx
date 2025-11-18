import { Shield, Scale, Eye, FileText, Home } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 h-screen p-6 bg-black/40 backdrop-blur-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">ScrollChainOS</h1>

      <nav className="space-y-4 text-lg">
        <NavItem icon={<Home size={20} />} label="Dashboard" href="/dashboard" />
        <NavItem icon={<Scale size={20} />} label="Constitution" href="/constitution" />
        <NavItem icon={<Eye size={20} />} label="Witness Logs" href="/witness" />
        <NavItem icon={<FileText size={20} />} label="Ordinances" href="/ordinances" />
        <NavItem icon={<Shield size={20} />} label="Sovereign Engine" href="/sovereign" />
      </nav>
    </aside>
  );
}

function NavItem({ icon, label, href }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-900 transition"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
