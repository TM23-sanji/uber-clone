const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: address,
                format: "json",
                limit: 1,
            },
        });

        if (response.data.length === 0) {
            throw new Error("Address not found");
        }

        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        return null;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }
    
    try {
        const apiKey = process.env.MAPS_API;
        if (typeof origin === "string") {
            origin = await this.getAddressCoordinates(origin);
        }
        if (typeof destination === "string") {
            destination = await this.getAddressCoordinates(destination);
        }
        
        const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
            params: {
                api_key: apiKey,
                start: `${origin.lng},${origin.lat}`,
                end: `${destination.lng},${destination.lat}`
        }});
            if (!response.data.features || response.data.features.length === 0) {
                throw new Error("No route data found");
            }    

            const route = response.data.features[0]; // Access the first feature
            const summary = route.properties.summary;
    
            if (!summary) {
                throw new Error("Summary not found in response");
            }
    
            const distanceKm = (summary.distance / 1000).toFixed(2); // Convert meters to km
            const durationMin = (summary.duration / 60).toFixed(2); // Convert seconds to minutes
    
            return {
                distance: `${distanceKm} km`,
                duration: `${durationMin} min`,
            };
    
        }   catch (error) {
        console.error("Error fetching distance and time:", error.message);
        return null;
    }

};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input){
        throw new Error("Input is required");
    }
    const apiKey=process.env.MAPS_API;
    try {
        const response = await axios.get("https://api.openrouteservice.org/geocode/autocomplete", {
            params: {
                api_key: apiKey,
                text: input,
                size:3
            },
        });

        if (!response.data.features || response.data.features.length === 0) {
            throw new Error("No suggestions found");
        }

        return response.data.features.map((feature) => ({
            label: feature.properties.label,
            coordinates: {
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0],
            },
        }));
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error.message);
        return [];
    }
};