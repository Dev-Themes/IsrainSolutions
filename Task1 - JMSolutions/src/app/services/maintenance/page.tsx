import Link from "next/link";

export default function Maintenance() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-camo-black">HVAC Maintenance Plans</h1>
      <p className="text-lg text-gray-700 mb-6">
        The best way to avoid expensive repairs is through regular preventative maintenance. 
        Our comprehensive tune-ups ensure your system runs efficiently, prolongs its lifespan, and keeps your manufacturer warranty valid.
      </p>
      
      <div className="bg-camo-olive text-camo-cream p-8 rounded-xl mt-12 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-camo-gold">The Camo Maintenance Club</h2>
        <ul className="space-y-4 text-lg">
          <li className="flex items-center gap-3">
            <span className="text-camo-gold font-bold">✓</span> Bi-annual comprehensive tune-ups (Spring AC, Fall Heat)
          </li>
          <li className="flex items-center gap-3">
            <span className="text-camo-gold font-bold">✓</span> Priority scheduling for emergencies
          </li>
          <li className="flex items-center gap-3">
            <span className="text-camo-gold font-bold">✓</span> 15% discount on all repairs
          </li>
          <li className="flex items-center gap-3">
            <span className="text-camo-gold font-bold">✓</span> No overtime charges
          </li>
        </ul>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to protect your investment?</h3>
        <Link href="/contact" className="inline-block bg-camo-gold text-camo-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition-colors">
          Join Our Maintenance Club
        </Link>
      </div>
    </div>
  );
}
