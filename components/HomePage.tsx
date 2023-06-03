import './HomePage.scss'
import Card from './shared/Card'

export default function HomePage() {
    return (
        <section>
            <h1>NASA API explorer</h1>
            <p className="card-container-header">What would you like to see?</p>
            <div className="card-container">
                <Card
                    href="/imageOfTheDay"
                    imageSrc="/images/Nebula.jpg"
                    imageAlt="Nebula ring"
                    header="NASA image of the day"
                    description="Discover awe-inspiring daily images capturing the wonders of space. Immerse yourself in the breathtaking views from NASA's telescopes and spacecraft."
                />
                <Card
                    href="/asteroids"
                    imageSrc="/images/asteroid.jpeg"
                    imageAlt="ISS"
                    header="Learn about asteroids passing by Earth"
                    description="Explore near-Earth asteroids, their composition, impact, and upcoming encounters. Expand your knowledge today!"
                />
            </div>
        </section>
    )
}
