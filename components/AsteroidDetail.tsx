'use client'

import './AsteroidDetail.scss'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { apiKey } from '@/helpers/API'

interface IProps {
    asteroidId: string
}

export default function AsteroidDetail(props: IProps) {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAsteroidDetail()
    }, [])

    const fetchAsteroidDetail = async () => {
        setData([])
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0')
        const currentDate = `${year}-${month}-${day}`

        const url = `https://api.nasa.gov/neo/rest/v1/neo/${props.asteroidId}?api_key=${apiKey}&start_date=${currentDate}&end_date=${currentDate}`
        const data = await fetchFromAPI(url)
        setData(data)
    }

    async function fetchFromAPI(url: string) {
        setLoading(true)
        try {
            const response = await axios.get(url)
            const { data } = response
            setLoading(false)
            console.log(data)
            return data
        } catch (error) {
            console.error('Error:', error)
            setLoading(false)
            return ''
        }
    }

    return (
        <section>
            <h1>Asteroid Detail</h1>
            <div className="button-container">
                <Link href="/asteroids" className="button">
                    Back to asteroid list
                </Link>
            </div>
            {loading && <p>Loading...</p>}
            {data.name && (
                <>
                    <h2>{data.name}</h2>
                    <h5>General info</h5>
                    <p>ID : {data.id}</p>
                    <p>
                        Estimated diameter :{' '}
                        {
                            data.estimated_diameter.kilometers
                                .estimated_diameter_max
                        }{' '}
                        km
                    </p>
                    <p>
                        Is potentially hazardous:{' '}
                        {data.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                    </p>
                    <h5>Close Approach info</h5>
                    {data.close_approach_data &&
                    data.close_approach_data.length > 0 ? (
                        <>
                            {data.close_approach_data.map((approach: any) => {
                                const today = new Date()
                                const year = today.getFullYear()
                                const month = String(
                                    today.getMonth() + 1
                                ).padStart(2, '0')
                                const day = String(today.getDate()).padStart(
                                    2,
                                    '0'
                                )
                                const currentDate = `${year}-${month}-${day}`

                                if (
                                    approach.close_approach_date === currentDate
                                ) {
                                    return (
                                        <>
                                            <p>
                                                Close Approach Date:{' '}
                                                {approach.close_approach_date}
                                            </p>
                                            <p>
                                                Relative Velocity:{' '}
                                                {
                                                    approach.relative_velocity
                                                        .kilometers_per_hour
                                                }{' '}
                                                km/h
                                            </p>
                                            <p>
                                                Miss Distance:{' '}
                                                {
                                                    approach.miss_distance
                                                        .kilometers
                                                }{' '}
                                                km
                                            </p>
                                        </>
                                    )
                                }

                                return null
                            })}
                        </>
                    ) : (
                        <p>No close approach data available for today</p>
                    )}
                    <h5>Orbital info</h5>
                    <p>
                        Orbiting body :{' '}
                        {data.close_approach_data[0].orbiting_body}
                    </p>
                    <p>
                        Orbital period : {data.orbital_data.orbital_period} days
                    </p>
                    <p>
                        First observation date :{' '}
                        {data.orbital_data.first_observation_date}
                    </p>
                    <p>
                        Last observation date :{' '}
                        {data.orbital_data.last_observation_date}
                    </p>
                    <p>
                        Orbit determination date :{' '}
                        {data.orbital_data.orbit_determination_date}
                    </p>
                    <p>
                        Orbital class description :{' '}
                        {data.orbital_data.orbit_class.orbit_class_description}
                    </p>
                </>
            )}
        </section>
    )
}
