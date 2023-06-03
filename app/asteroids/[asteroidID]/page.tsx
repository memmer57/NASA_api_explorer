import AsteroidDetail from '@/components/AsteroidDetail'

export interface IAsteroidProps {
    params: {
        asteroidID: string
    }
}

export default function Home({ params }: IAsteroidProps) {
    return <AsteroidDetail asteroidId={params.asteroidID} />
}
