import * as React from 'react';
import { Html, Head, Body, Container, Text, Link, Preview, Section, Heading, Hr } from '@react-email/components';

interface ResetPasswordTemplateProps {
  name?: string;
  resetUrl: string;
}

export const ResetPasswordTemplate: React.FC<Readonly<ResetPasswordTemplateProps>> = ({
  name = 'there',
  resetUrl,
}) => (
  <Html>
    <Head />
    <Preview>Reset your CareerVixa password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandHeader}>
          <Text style={brandLogo}>CareerVixa</Text>
          <Text style={brandSubtitle}>Executive Career Intelligence</Text>
        </Section>
        <Hr style={headerHr} />
        <Heading style={h1}>Reset Your Password</Heading>
        <Text style={text}>Hi {name},</Text>
        <Text style={text}>
          Someone recently requested a password change for your CareerVixa account. If this was you, you can set a new password here:
        </Text>
        <Section style={btnContainer}>
          <Link href={resetUrl} style={button}>
            Reset Password
          </Link>
        </Section>
        <Text style={text}>
          If you don't want to change your password or didn't request this, just ignore and delete this message.
        </Text>
        <Text style={text}>
          To keep your account secure, please don't forward this email to anyone. This link will expire in 24 hours.
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
