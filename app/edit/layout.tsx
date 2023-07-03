interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col" suppressHydrationWarning={true} >
      {children}
    </div>
  )
}