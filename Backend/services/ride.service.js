const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

const getFare = async (pickup,destination) =>{
    if (!pickup || !destination) {
        throw new Error('Invalid Pickup or Destination Address');
    }
    const distanceTime= await mapService.getDistanceTime(pickup,destination);

    const baseFare = {
        auto: 3,
        car: 5,
        motorcycle: 2
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fare = {
        auto: baseFare.auto + (perKmRate.auto * parseInt(distanceTime.distance,10)) + (perMinuteRate.auto * parseInt(distanceTime.duration,10)),
        car: baseFare.car + (perKmRate.car * parseInt(distanceTime.distance,10)) + (perMinuteRate.car * parseInt(distanceTime.duration,10)),
        motorcycle: baseFare.motorcycle + (perKmRate.motorcycle * parseInt(distanceTime.distance,10)) + (perMinuteRate.motorcycle * parseInt(distanceTime.duration,10))
    };

    return fare;
};

const getOTP = (num)=>{
    const generateOTP = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();    
    return otp;
    }
    return generateOTP(num);
}

const createRide = async ({user, pickup, destination, vehicleType})=>{
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
    const fare = await getFare(pickup, destination);
    const ride=rideModel.create({
        user,
        pickup,
        destination,
        otp: getOTP(6),
        fare: fare[vehicleType]
    });
    return ride;
};

module.exports = {
    getFare,
    createRide
};