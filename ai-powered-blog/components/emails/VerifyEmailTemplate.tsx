import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Preview, Section, Heading, Hr } from '@react-email/components';

interface VerifyEmailTemplateProps {
  name?: string;
  verifyUrl: string;
}

export const VerifyEmailTemplate: React.FC<Readonly<VerifyEmailTemplateProps>> = ({
  name = 'there',
  verifyUrl,
}) => (
  <Html>
    <Head />
    <Preview>Verify your email address for CareerVixa</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandHeader}>
          <Text style={brandLogo}>CareerVixa</Text>
          <Text style={brandSubtitle}>Executive Career Intelligence</Text>
        </Section>
        <Hr style={headerHr} />
        <Heading style={h1}>Welcome to CareerVixa</Heading>
        <Text style={text}>Hi {name},</Text>
        <Text style={text}>
          Thank you for joining CareerVixa! To complete your registration and start publishing articles, please verify your email address by clicking the link below:
        </Text>
        <Section style={btnContainer}>
          <Link href={verifyUrl} style={button}>
            Verify Email
          </Link>
        </Section>
        <Text style={text}>
          If you didn't create an account with us, you can safely ignore this email.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Best regards,<br />The CareerVixa Team
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f8fafc',
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

const btnContainer = {
  textAlign: 'center' as const,
  padding: '24px 0',
};

const button = {
  backgroundColor: '#1e40af',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '15px',
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
  padding: '0 40px',
  lineHeight: '20px',
  margin: '0',
};
