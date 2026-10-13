import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Preview, Section, Heading, Hr } from '@react-email/components';

interface ArticleDecisionTemplateProps {
  name?: string;
  articleTitle: string;
  articleId: string;
  articleSlug?: string;
  status: 'PUBLISHED' | 'APPROVED' | 'CHANGES_REQUESTED' | 'REJECTED' | string;
  reviewNotes?: string | null;
  dashboardUrl: string;
  articleUrl?: string;
}

export const ArticleDecisionTemplate: React.FC<Readonly<ArticleDecisionTemplateProps>> = ({
  name = 'there',
  articleTitle,
  articleId,
  articleSlug,
  status,
  reviewNotes,
  dashboardUrl,
  articleUrl,
}) => {
  const isPublished = status === 'PUBLISHED' || status === 'APPROVED';
  const isChangesRequested = status === 'CHANGES_REQUESTED';
  const isRejected = status === 'REJECTED';

  const previewText = isPublished
    ? `Great news! Your article "${articleTitle}" is published on CareerVixa`
    : isChangesRequested
    ? `Editorial revisions requested for "${articleTitle}"`
    : `Update on your CareerVixa submission: "${articleTitle}"`;

  const headingText = isPublished
    ? '🎉 Your Article Has Been Published!'
    : isChangesRequested
    ? '📝 Editorial Feedback & Revisions Requested'
    : 'Update on Your Submission';

  const statusBadgeStyle = isPublished
    ? statusBadgeGreen
    : isChangesRequested
    ? statusBadgeOrange
    : statusBadgeRed;

  const statusLabel = isPublished
    ? 'Published'
    : isChangesRequested
    ? 'Changes Requested'
    : isRejected
    ? 'Rejected'
    : status.replace('_', ' ');

  const primaryUrl = isPublished && articleUrl ? articleUrl : dashboardUrl;
  const buttonLabel = isPublished && articleUrl
    ? 'View Live Article'
    : isChangesRequested
    ? 'Edit & Resubmit Article'
    : 'View in Dashboard';

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={brandHeader}>
            <Text style={brandLogo}>CareerVixa</Text>
            <Text style={brandSubtitle}>Editorial & Publishing CMS</Text>
          </Section>
          <Hr style={headerHr} />
          <Heading style={h1}>{headingText}</Heading>
          <Text style={text}>Hi {name},</Text>

          {isPublished && (
            <Text style={text}>
              Congratulations! Our editorial team has reviewed and approved your guest article for publication on <strong>CareerVixa</strong>. It is now live for readers worldwide!
            </Text>
          )}

          {isChangesRequested && (
            <Text style={text}>
              Thank you for submitting your article to <strong>CareerVixa</strong>. Our editorial team has reviewed your submission and would love to publish it once a few revisions are made.
            </Text>
          )}

          {isRejected && (
            <Text style={text}>
              Thank you for sharing your article with <strong>CareerVixa</strong>. After careful editorial review, we are unable to publish your submission at this time.
            </Text>
          )}

          <Section style={cardSection}>
            <Text style={cardTitle}>Submission Details</Text>
            <Text style={cardItem}><strong>Title:</strong> {articleTitle}</Text>
            <Text style={cardItem}>
              <strong>Status:</strong>{' '}
              <span style={statusBadgeStyle}>{statusLabel}</span>
            </Text>
          </Section>

          {reviewNotes && (
            <Section style={feedbackSection}>
              <Text style={feedbackTitle}>Editorial Review Notes</Text>
              <Text style={feedbackText}>{reviewNotes}</Text>
            </Section>
          )}

          {isChangesRequested && (
            <Text style={subText}>
              You can make the requested changes right from your contributor editor and resubmit your draft for review whenever you are ready.
            </Text>
          )}

          <Section style={btnContainer}>
            <Link href={primaryUrl} style={button}>
              {buttonLabel}
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Best regards,<br />
            The CareerVixa Editorial Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

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

const subText = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '22px',
  padding: '0 40px',
  margin: '12px 0',
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
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 12px 0',
};

const cardItem = {
  color: '#475569',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '4px 0',
};

const feedbackSection = {
  backgroundColor: '#fffbeb',
  border: '1px solid #fde68a',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '16px 20px',
};

const feedbackTitle = {
  color: '#92400e',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
};

const feedbackText = {
  color: '#78350f',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const statusBadgeGreen = {
  display: 'inline-block',
  padding: '2px 8px',
  backgroundColor: '#dcfce7',
  color: '#166534',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '600',
};

const statusBadgeOrange = {
  display: 'inline-block',
  padding: '2px 8px',
  backgroundColor: '#ffedd5',
  color: '#9a3412',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '600',
};

const statusBadgeRed = {
  display: 'inline-block',
  padding: '2px 8px',
  backgroundColor: '#fee2e2',
  color: '#991b1b',
  borderRadius: '9999px',
  fontSize: '12px',
  fontWeight: '600',
};

const btnContainer = {
  textAlign: 'center' as const,
  padding: '24px 40px 16px',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 28px',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '28px 40px 20px',
};

const footer = {
  color: '#94a3b8',
  fontSize: '13px',
  lineHeight: '20px',
  padding: '0 40px',
  margin: '0',
};
