import { SiteHeader } from "@/components/site-header"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <SiteHeader />
      <div className="flex-1">{children}</div>
    </>
  )
}