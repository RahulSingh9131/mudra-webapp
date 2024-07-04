import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { getServerAuthSession } from '@/server/auth';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import SignInButtons from './_client';

export const metadata: Metadata = {
  title: `Sign in to ${siteConfig.name}`,
  description: `Sign in to your ${siteConfig.name} account`,
  openGraph: {
    title: `Sign in to ${siteConfig.name}`,
    description: `Sign in to your ${siteConfig.name} account`,
  },
};

export default async function SigninPage() {
  const session = await getServerAuthSession();
  if (session) {
    redirect('/home');
  }

  return (
    <div className="container relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="absolute top-4 flex w-full flex-row justify-between px-4 md:top-8">
        <Button
          asChild
          className="z-20 flex items-center bg-transparent text-lg font-medium text-primary transition-colors hover:bg-accent lg:text-primary-foreground lg:hover:bg-primary-foreground/10 lg:hover:text-primary-foreground"
        >
          <Link href="/">
            {/* <Logo className="mr-2 size-6" /> */}
            {siteConfig.name}
          </Link>
        </Button>
      </div>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-primary-foreground dark:border-r lg:flex">
        <div className="absolute inset-0 h-full bg-primary" />

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatum suscipit, soluta neque eos repellendus dignissimos odio
              tenetur quia tempore optio quidem necessitatibus. Ex tempora
              aliquam temporibus excepturi. Distinctio, fugit autem.
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
          </div>

          <SignInButtons />
        </div>
      </div>
    </div>
  );
}
