'use client'

import './Asteroids.scss'
import { apiKey } from '@/helpers/API'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Link from 'next/link'
import axios from 'axios'

export default function Asteroids() {
    const options: any = [
        { value: 'distance', label: 'Distance' },
        { value: 'velocity', label: 'Velocity' },
        { value: 'diameter', label: 'Estimated Diameter' },
    ]

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [sortBy, setSortBy] = useState<any>(options[0])

    useEffect(() => {
        fetchAsteroidList()
    }, [])

    const fetchAsteroidList = async () => {
        setData([])
        const todayDate = new Date().toISOString().split('T')[0]
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${todayDate}&end_date=${todayDate}&api_key=${apiKey}`
        const data = await fetchFromAPI(url)
        setData(data)
    }

    const sortAsteroids = (asteroids: any[]) => {
        const property =
            sortBy.value === 'distance'
                ? 'miss_distance'
                : sortBy.value === 'velocity'
                ? 'relative_velocity'
                : 'estimated_diameter'
        if (property === 'estimated_diameter') {
            return asteroids.sort(
                (a, b) =>
                    b.estimated_diameter.kilometers.estimated_diameter_max -
                    a.estimated_diameter.kilometers.estimated_diameter_max
            )
        } else if (property === 'relative_velocity') {
            return asteroids.sort(
                (a, b) =>
                    b.close_approach_data[0][property].kilometers_per_hour -
                    a.close_approach_data[0][property].kilometers_per_hour
            )
        } else {
            return asteroids.sort(
                (a, b) =>
                    a.close_approach_data[0][property].kilometers -
                    b.close_approach_data[0][property].kilometers
            )
        }
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

    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            width: 230,
            backgroundColor: '#333',
            borderColor: state.isFocused ? 'white' : 'grey',
            boxShadow: state.isFocused ? '0 0 0 1px grey' : 'none',
            '&:hover': {
                borderColor: state.isFocused ? 'white' : 'grey',
            },
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused ? '#666' : '#222',
            color: '#fff',
            '&:hover': {
                backgroundColor: state.isFocused ? '#666' : '#444',
            },
        }),
        singleValue: (base: any) => ({
            ...base,
            color: '#fff',
        }),
        placeholder: (base: any) => ({
            ...base,
            color: '#ccc',
        }),
        indicatorSeparator: (base: any) => ({
            ...base,
            backgroundColor: '#666',
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
            color: '#fff',
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: '#222',
            width: 230,
        }),
    }

    return (
        <section className="asteroids">
            <h1>Asteroids</h1>
            <br />
            <div>
                <label htmlFor="sortBy">Sort by:</label>
                <Select
                    defaultValue={sortBy}
                    onChange={setSortBy}
                    options={options}
                    styles={customStyles}
                />
            </div>
            <br />
            <p>Today's close approaches:</p>
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
                                const sortedAsteroids = sortAsteroids(asteroids)
                                console.log(sortBy)
                                return sortedAsteroids.map((asteroid: any) => (
                                    <tr key={asteroid.id}>
                                        <td>
                                            <Link
                                                href={
                                                    '/asteroids/' + asteroid.id
                                                }
                                            >
                                                {asteroid.name}
                                            </Link>
                                        </td>
                                        <td>
                                            {
                                                asteroid.close_approach_data[0]
                                                    .miss_distance.kilometers
                                            }
                                        </td>
                                        <td>
                                            {
                                                asteroid.close_approach_data[0]
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
                                ))
                            }
                        )}
                    </tbody>
                </table>
            )}
        </section>
    )
}
