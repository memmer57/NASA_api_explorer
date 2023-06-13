'use client'

import './ImageOfTheDay.scss'
import React, { useState } from 'react'
import axios from 'axios'
import { apiKey } from '@/helpers/API'

export default function ImageOfTheDay() {
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [randomDate, setRandomDate] = useState('')
    const [imageInfo, setImageInfo] = useState('')

    function clearStates() {
        setImageUrl('')
        setRandomDate('')
        setImageInfo('')
    }

    const fetchImageOfTheDay = async () => {
        clearStates()
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        const data = await fetchFromAPI(url)
        setImageUrl(data.url)
        setImageInfo(data.explanation)
    }

    const fetchRandomImage = async () => {
        clearStates()
        const startDate = new Date('1995-06-16')
        const endDate = new Date()
        const randomDate = new Date(
            startDate.getTime() +
                Math.random() * (endDate.getTime() - startDate.getTime())
        )
            .toISOString()
            .split('T')[0]
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`
        const data = await fetchFromAPI(url)
        setImageUrl(data.url)
        setRandomDate(randomDate)
        setImageInfo(data.explanation)
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
            <h1>NASA image of the day</h1>

            <div className="button-container">
                <button onClick={fetchImageOfTheDay}>
                    Request today's image
                </button>
                <button onClick={fetchRandomImage}>Request random image</button>
            </div>
            {loading && <p>Loading...</p>}
            {randomDate && <p>Random date: {randomDate}</p>}
            {imageUrl && (
                <>
                    {imageUrl.includes('youtube.com') ? (
                        <iframe src={imageUrl}></iframe>
                    ) : (
                        <img
                            src={imageUrl}
                            className="image-of-day"
                            alt="NASA Image of the Day"
                        />
                    )}
                </>
            )}
            {imageInfo && <p>{imageInfo}</p>}
        </section>
    )
}
