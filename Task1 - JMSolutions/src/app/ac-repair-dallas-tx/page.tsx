export default function CityRepairPage() {
  const serviceType = "AC Repair";
  const cityName = "Dallas";

  return (
    <div className="py-24 px-4 max-w-5xl mx-auto text-center">
      <div className="mb-8 inline-flex items-center justify-center p-6 bg-js-light rounded-full shadow-inner border border-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-js-blue"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-js-navy">
        Expert {serviceType} in <span className="text-js-orange">{cityName}, TX</span>
      </h1>
      
      <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
        When your system breaks down in {cityName}, you need a fast, reliable, and professional team. 
        JS Comfort Solutions provides same-day and 24/7 emergency {serviceType.toLowerCase()} services to restore your comfort quickly and efficiently.
      </p>
      
      <div className="bg-js-navy text-white p-12 rounded-3xl shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-js-orange opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-js-light">Why Choose Us in {cityName}?</h2>
          <ul className="text-left space-y-5 mb-10 text-lg font-medium max-w-md mx-auto">
            <li className="flex items-center gap-3"><span className="text-js-orange text-xl">✓</span> Honest, transparent diagnostics</li>
            <li className="flex items-center gap-3"><span className="text-js-orange text-xl">✓</span> 24/7 Emergency Response</li>
            <li className="flex items-center gap-3"><span className="text-js-orange text-xl">✓</span> Commercial Refrigeration Experts</li>
            <li className="flex items-center gap-3"><span className="text-js-orange text-xl">✓</span> Fast, same-day repairs</li>
          </ul>
          
          <a href="tel:8328472817" className="inline-block bg-js-orange text-white font-bold py-4 px-12 rounded-full text-xl hover:bg-orange-600 transition-colors shadow-lg">
            Call Now for Service in {cityName}
          </a>
        </div>
      </div>
    </div>
  );
}