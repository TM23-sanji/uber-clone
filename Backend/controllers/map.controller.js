const mapsService = require('../services/maps.service');
const {validationResult} = require('express-validator');

module.exports.getCoordinates= async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const {address} = req.query;
        const coordinates = await mapsService.getAddressCoordinates(address);
        if(!coordinates){
            res.status(404).send("Address not found");
        }
        res.status(200).json(coordinates);
    } catch(error){
        console.error("Error fetching coordinates:", error.message);
        res.status(500).send("Internal server error");
    }
}

module.exports.getDistanceTime = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const {origin, destination} = req.query;
        const originCoordinates = await mapsService.getAddressCoordinates(origin);
        const destinationCoordinates = await mapsService.getAddressCoordinates(destination);
        if(!originCoordinates || !destinationCoordinates){
            return res.status(404).send("Origin or destination not found");
        }
        const distanceTime = await mapsService.getDistanceTime(originCoordinates, destinationCoordinates);
        if(!distanceTime){
            return res.status(404).send("Distance and time not found");
        }
        return res.status(200).json(distanceTime)
        
} catch(err){
    console.error("Error fetching distance and time:", err.message);
    return res.status(500).send("Internal server error");
}}

module.exports.getAutoCompleteSuggestions = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const {input} = req.query;
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        if(!suggestions){
            return res.status(404).send("Suggestions not found");
        }
        return res.status(200).json(suggestions);
    } catch(err){
        console.error("Error fetching suggestions:", err.message);
        return res.status(500).send("Internal server error");
    }
};