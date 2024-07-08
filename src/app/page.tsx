import HomeButtons from './_components/home-buttons';
import NavBar from './_components/navbar';

export default async function Home() {
  return (
    <div className=" flex min-h-screen w-full flex-col">
      <div>
        <NavBar />
      </div>
      <div className="flex flex-1">
        <div className="flex w-1/2 flex-col justify-center space-y-6 px-10 py-10 md:px-20 md:py-20">
          <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
            Take Control of Your Finances With Mudra
          </h1>
          <p className="text-base leading-relaxed md:text-lg">
            Welcome to Mudra, your ultimate companion for managing expenses
            effortlessly. Track your spending, set budgets, and achieve your
            financial goals with ease. Mudra helps you take control of your
            finances, ensuring every penny is well spent and well saved.
          </p>
          <HomeButtons />
        </div>
        <div className="w-1/2 bg-primary">
          {/* Brand Logo or image will come here */}
        </div>
      </div>
    </div>
  );
}
