export default function QuantumCard({ title, children }) {
  return (
    <div className="border border-zinc-800 rounded-xl p-6 bg-black/40 backdrop-blur-md shadow-inner shadow-purple-900/20">
      <h2 className="text-xl mb-3 font-semibold tracking-wide">{title}</h2>
      <div className="text-sm text-zinc-300 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}
