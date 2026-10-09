import { Card } from '@/components/ui/Card';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/schema';

export function FaqCard({ faqs, url }: { faqs: any[]; url: string }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <Card className="flex flex-col h-fit p-6 md:p-8">
      <JsonLd data={faqSchema(faqs, url)} />
      <h3 className="text-2xl font-bold mb-8 text-fg-1">AC Repair FAQs</h3>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h4 className="text-lg font-bold text-ice mb-2">{faq.question}</h4>
            <p className="text-fg-2 text-base">{faq.answer}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
