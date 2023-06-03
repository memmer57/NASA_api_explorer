import { Kanit } from 'next/font/google'
import '../styles/globals.scss'
import Link from 'next/link'
import Image from 'next/image'

const inter = Kanit({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
    title: 'NASA API Explorer',
    description:
        'NASA API Explorer is a web application that allows you to explore the NASA API. You can see the NASA image of the day, and learn more about active satellites.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Link href={'/'} className="homepage-button">
                    <Image
                        src={'/images/NASA.svg'}
                        alt="NASA logo"
                        width={112}
                        height={33}
                    />
                </Link>
                <main>{children}</main>
            </body>
        </html>
    )
}
