import '../globals.css'
export const metadata = {
  title: 'I Know You Know ',
  description: 'I Know You Know is a multidisciplinary creative studio',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
