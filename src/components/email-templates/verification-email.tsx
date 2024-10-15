import { EMAIL_IMAGE_URL } from '@/lib/constants';
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type VerificationEmailProps = {
  verificationEmailLink?: string;
};

export const VerificationEmail = ({ verificationEmailLink }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>KanvaBoard verify your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={EMAIL_IMAGE_URL} width="40" height="33" alt="KanvaBoard" />
          <Section>
            <Text style={text}>
              Click on the following link to verify your email and continue using your account:
            </Text>
            <Button style={button} href={verificationEmailLink}>
              Verify email
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
};

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
};

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px',
};
