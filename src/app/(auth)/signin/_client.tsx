'use client';

import { signIn } from 'next-auth/react';
import {
  DiscordLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons';

const SignInButtons = () => {
  return (
    <section className="flex flex-col gap-3">
      <DiscordLoginButton
        onClick={async () => {
          await signIn('discord', { callbackUrl: '/home' });
        }}
      />
      <GoogleLoginButton
        onClick={async () => {
          await signIn('google', { callbackUrl: '/home' });
        }}
      />
      <GithubLoginButton
        onClick={async () => {
          await signIn('github', { callbackUrl: '/home' });
        }}
      />
    </section>
  );
};

export default SignInButtons;
