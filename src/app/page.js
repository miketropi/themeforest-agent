import Image from "next/image";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home({ searchParams }) {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const origin = `${protocol}://${host}`;

  const { code } = await searchParams; 
  if ( code ) {
    // redirect to /callback
    redirect(`${origin}/callback?code=${code}`);
    return null;
  }
  
  const authorizationUrl = `https://api.envato.com/authorization?response_type=code&client_id=${ process.env.NEXT_PUBLIC_TF_APP_CLIENT_ID }&redirect_uri=${ process.env.NEXT_PUBLIC_TF_APP_REDIRECT_URI }`

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">ThemeForest Agent</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect with your Envato account to continue</p>
        </div>
        
        <div className="w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <Image
              className="mb-6"
              src="/next.svg"
              alt="ThemeForest Agent"
              width={120}
              height={30}
              priority
            />
            
            <a
              className="w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#81b441] text-white gap-2 hover:bg-[#72a139] font-medium text-sm sm:text-base h-12 px-5"
              href={ authorizationUrl }
              rel="noopener noreferrer"
            >
              Login with Envato
            </a>
            
            <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <span>© 2025 ThemeForest Agent</span>
        <a className="hover:underline hover:underline-offset-4" href="#">Terms</a>
        <a className="hover:underline hover:underline-offset-4" href="#">Privacy</a>
        <a className="hover:underline hover:underline-offset-4" href="#">Help</a>
      </footer>
    </div>
  );
}
