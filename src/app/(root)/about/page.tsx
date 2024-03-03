import Link from "next/link";

export default function about() {
  return (
    <div className="min-h-screen flex flex-col items-center text-white bg-gray-950 pt-44">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">About</h1>
      </div>
      
      <div className="max-w-md text-center">
        <p className="text-lg mb-4">
          A project by <a href="https://github.com/Valx01P" className="text-blue-500">Valx01P</a>, ie me, Pablo Valdes :D
        </p>
        <p className="text-lg mb-4">
          This website was made using Next.js, Tailwind CSS, and the Polygon.io Stock API, among other important dependencies and technologies.
        </p>
        <p className="text-base mb-4">
          If the stock chart is not working for you, it&apos;s likely because the API endpoint has reached it&apos;s rate limit, and you&apos;ll have to wait for it to refresh.
        </p>
        <p className="text-base mb-4">
          Furthermore, yes I&apos;m aware the application is not fully mobile responsive as this was not my aim for this project. I wanted to focus on the functionality, however I guarantee all future projects will be fully mobile responsive.
        </p>
        <p className="text-sm">
          Thank you for checking out this practice project. This is my favorite project so far.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}