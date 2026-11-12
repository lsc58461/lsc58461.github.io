import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SmoothAnchors } from "@/components/SmoothAnchors";

const sans = Space_Grotesk({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-latin",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lsc58461.github.io"),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.intro,
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.intro,
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${sans.variable} ${mono.variable} h-full`}
    >
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothAnchors />
        {children}
        {/* GA4 — 배포 빌드에서만(로컬 next dev 방문은 통계에 안 섞이게) */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {/* ?notrack=1 로 한 번 열면 그 브라우저는 통계에서 빠짐(내 방문 제외), ?notrack=0 으로 해제.
                  문의 링크 클릭은 contact_click(method=email|phone|soomgo|kmong|kakao) — 주소·번호는 보내지 않음 */}
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
try{var nt=new URLSearchParams(location.search).get('notrack');if(nt==='1')localStorage.setItem('ga_optout','1');if(nt==='0')localStorage.removeItem('ga_optout');if(localStorage.getItem('ga_optout')==='1')window['ga-disable-${SITE.gaId}']=true;}catch(e){}
gtag('js',new Date());gtag('config','${SITE.gaId}');
document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;if(!a)return;var h=a.getAttribute('href')||'';var m=h.indexOf('mailto:')===0?'email':h.indexOf('tel:')===0?'phone':h.indexOf('soomgo.com')>-1?'soomgo':h.indexOf('kmong.com')>-1?'kmong':(h.indexOf('open.kakao.com')>-1||h.indexOf('pf.kakao.com')>-1)?'kakao':null;if(m)gtag('event','contact_click',{method:m});},true);`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
