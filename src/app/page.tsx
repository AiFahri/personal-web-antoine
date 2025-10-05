export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <h1 className="font-bold text-4xl">Welcome to Website Antoine Battle</h1>
      </main>
      <footer className="row-start-3 text-sm text-gray-500">
        &copy; 2025 Antoine Battle. All rights reserved.
      </footer>
    </div>
  );
}
