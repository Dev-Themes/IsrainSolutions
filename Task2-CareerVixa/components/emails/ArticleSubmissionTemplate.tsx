import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Preview, Section, Heading, Hr } from '@react-email/components';

interface ArticleSubmissionTemplateProps {
  name?: string;
  articleTitle: string;
  categoryName?: string;
  dashboardUrl: string;
  previewUrl?: string;
}

export const ArticleSubmissionTemplate: React.FC<Readonly<ArticleSubmissionTemplateProps>> = ({
  name = 'there',
  articleTitle,
  categoryName,
  dashboardUrl,
  previewUrl,
}) => (
  <Html>
    <Head />
    <Preview>Your CareerVixa article submission has been received</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandHeader}>
          <Text style={brandLogo}>CareerVixa</Text>
          <Text style={brandSubtitle}>Executive Career Intelligence</Text>
        </Section>
        <Hr style={headerHr} />
        <Heading style={h1}>Article Received for Review</Heading>
        <Text style={text}>Hi {name},</Text>
        <Text style={text}>
          Thank you for submitting your guest article to <strong>CareerVixa</strong>! We have received your submission and it is now queued for editorial review.
        </Text>

        <Section style={cardSection}>
          <Text style={cardTitle}>Submission Summary</Text>
          <Text style={cardItem}><strong>Title:</strong> {articleTitle}</Text>
          {categoryName && (
            <Text style={cardItem}><strong>Category:</strong> {categoryName}</Text>
          )}
          <Text style={cardItem}>
            <strong>Status:</strong>{' '}
            <span style={statusBadge}>Pending Review</span>
          </Text>
        </Section>

        <Text style={sectionTitle}>What happens next:</Text>
        <Text style={bulletText}>
          &bull; Our editorial team will review your submission for career relevance, original authorship, factual accuracy, and formatting.
        </Text>
        <Text style={bulletText}>
          &bull; Guest articles never publish automatically. Once approved, your article will be published to CareerVixa.
        </Text>
        <Text style={bulletText}>
          &bull; If our editors require revisions, you will be notified and can update your draft from your dashboard.
        </Text>

        <Section style={btnContainer}>
          <Link href={dashboardUrl} style={button}>
            View in Dashboard
          </Link>
        </Section>

        {previewUrl && (
          <Text style={subText}>
            You can also preview your private draft formatting at{' '}
            <Link href={previewUrl} style={linkStyle}>
              your preview page
            </Link>.
          </Text>
        )}

        <Hr style={hr} />

        <Text style={footer}>
          Best regards,<br />
          The CareerVixa Editorial Team
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '28px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  maxWidth: '580px',
};

const brandHeader = {
  padding: '0 40px',
  margin: '0 0 16px',
};

const brandLogo = {
  color: '#0f172a',
  fontSize: '20px',
  fontWeight: '800',
  letterSpacing: '-0.5px',
  margin: '0',
  lineHeight: '24px',
};

const brandSubtitle = {
  color: '#64748b',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.8px',
  margin: '2px 0 0',
};

const headerHr = {
  borderColor: '#f1f5f9',
  margin: '16px 40px 24px',
};

const h1 = {
  color: '#0f172a',
  fontSize: '22px',
  fontWeight: '700',
  lineHeight: '32px',
  margin: '0 0 16px',
  padding: '0 40px',
};

const text = {
  color: '#334155',
  fontSize: '15px',
  lineHeight: '24px',
  padding: '0 40px',
  margin: '8px 0',
};

const sectionTitle = {
  color: '#0f172a',
  fontSize: '15px',
  fontWeight: '600',
  padding: '0 40px',
  margin: '16px 0 8px',
};

const bulletText = {
  color: '#475569',
  fontSize: '14px',
  lineHeight: '22px',
  padding: '0 40px',
  margin: '4px 0',
};

const cardSection = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '16px 20px',
};

const cardTitle = {
  color: '#0f172a',
  fontSize: '14px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 8px',
};

const cardItem = {
  color: '#334155',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '4px 0',
};

const statusBadge = {
  backgroundColor: '#fef3c7',
  color: '#92400e',
  padding: '2px 8px',
  borderRadius: '4px',
  fontWeight: '600',
  fontSize: '12px',
};

const btnContainer = {
  textAlign: 'center' as const,
  padding: '24px 0 12px',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 28px',
};

const subText = {
  color: '#64748b',
  fontSize: '13px',
  textAlign: 'center' as const,
  padding: '0 40px',
  margin: '8px 0',
};

const linkStyle = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '28px 40px',
};

const footer = {
  color: '#94a3b8',
  fontSize: '13px',
  padding: '0 40px',
  lineHeight: '20px',
};
