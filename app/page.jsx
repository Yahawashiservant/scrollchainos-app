import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>ScrollChainOS Portal</h1>
      <p>Your Sovereign Operations Console</p>
      <ul>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
    </div>
  );
}
