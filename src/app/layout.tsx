import RootProvider from "./rootProvider"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}