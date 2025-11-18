"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [constitution, setConstitution] = useState({});
  const [witness, setWitness] = useState([]);
  const [ordinances, setOrdinances] = useState([]);

  const safeArray = (x) => (Array.isArray(x) ? x : []);

  const load = async () => {
    try {
      const c = await fetch("/api/constitution").then(r => r.json());
      const w = await fetch("/api/witness").then(r => r.json());
      const o = await fetch("/api/ordinances").then(r => r.json());

      setConstitution(c || {});
      setWitness(safeArray(w));
      setOrdinances(o || []);
    } catch (e) {
      console.error("Dashboard load error", e);
    }
  };

  useEffect(() => {
    load();
    const int = setInterval(load, 2000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="p-5 border border-gray-700 rounded-xl bg-gray-900 shadow-lg">
        <h2 className="text-xl mb-2">⚖ Constitution</h2>
        <pre className="text-sm opacity-80">{JSON.stringify(constitution, null, 2)}</pre>
      </div>

      <div className="p-5 border border-gray-700 rounded-xl bg-gray-900 shadow-lg">
        <h2 className="text-xl mb-2">👁 Witness Logs (Live)</h2>
        <div className="text-sm opacity-80 whitespace-pre-wrap">
          {witness.join("\n")}
        </div>
      </div>

      <div className="p-5 border border-gray-700 rounded-xl bg-gray-900 shadow-lg">
        <h2 className="text-xl mb-2">📜 Ordinances Engine</h2>
        <pre className="text-sm opacity-80">{JSON.stringify(ordinances, null, 2)}</pre>
      </div>
    </div>
  );
}
