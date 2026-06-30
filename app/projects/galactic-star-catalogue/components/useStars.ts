"use client";
import { useState, useEffect } from 'react';

export type Star = {
    id: number;
    name: string;
    type: string;
    distance_ly: number;
    mass_solar?: number;
    radius_solar?: number;
    radius_km?: number;
    temperature_k?: number;
    luminosity_solar?: number;
    constellation?: string;
    description?: string;
};

export function useStars() {
    const [filteredStars, setFilteredStars] = useState<Star[]>([]);

    useEffect(() => {
        fetch('/stars.json')
            .then(res => res.json())
            .then(data => setFilteredStars(data))
            .catch(err => console.error("Failed to load stars:", err));
    }, []);

    return {
        filteredStars,
        selectStar: (id: number) => { console.log("Selected star:", id); }
    };
}
