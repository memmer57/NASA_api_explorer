'use client'

import './Asteroids.scss'
import { apiKey } from '@/helpers/API'
import React, { useState } from 'react'
import axios from 'axios'

export default function Asteroids() {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const fetchAsteroidList = async () => {
        setData([])
        const todayDate = new Date().toISOString().split('T')[0]
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${todayDate}&end_date=${todayDate}&api_key=${apiKey}`
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
            <h1>Asteroids</h1>
            <div className="button-container">
                <button onClick={fetchAsteroidList}>
                    Fetch list of today's near Earth asteroids
                </button>
            </div>
            {loading && <p>Loading...</p>}

            {data.near_earth_objects && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Distance (km)</th>
                            <th>Velocity (km/h)</th>
                            <th>Estimated Diameter (km)</th>
                            <th>Is potentially hazardous</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data.near_earth_objects).map(
                            (asteroids: any) => {
                                return asteroids.map((asteroid: any) => {
                                    return (
                                        <tr key={asteroid.id}>
                                            <td>{asteroid.name}</td>
                                            <td>
                                                {
                                                    asteroid
                                                        .close_approach_data[0]
                                                        .miss_distance
                                                        .kilometers
                                                }
                                            </td>
                                            <td>
                                                {
                                                    asteroid
                                                        .close_approach_data[0]
                                                        .relative_velocity
                                                        .kilometers_per_hour
                                                }
                                            </td>
                                            <td>
                                                {
                                                    asteroid.estimated_diameter
                                                        .kilometers
                                                        .estimated_diameter_max
                                                }
                                            </td>
                                            <td>
                                                {asteroid.is_potentially_hazardous_asteroid
                                                    ? 'Yes'
                                                    : 'No'}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        )}
                    </tbody>
                </table>
            )}
        </section>
    )
}
