import { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}
