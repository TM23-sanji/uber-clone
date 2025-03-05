const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');
const getFare = async (pickup,destination) =>{
    if (!pickup || !destination) {
        throw new Error('Invalid Pickup or Destination Address');
    }
    const distanceTime= await mapService.getDistanceTime(pickup,destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
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
        auto: baseFare.auto + (perKmRate.auto * parseFloat(distanceTime.distance)) + (perMinuteRate.auto * parseFloat(distanceTime.duration)),
        car: baseFare.car + (perKmRate.car * parseFloat(distanceTime.distance)) + (perMinuteRate.car * parseFloat(distanceTime.duration)),
        motorcycle: baseFare.motorcycle + (perKmRate.motorcycle * parseFloat(distanceTime.distance)) + (perMinuteRate.motorcycle * parseFloat(distanceTime.duration))
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
module.exports.createRide = async ({user, pickup, destination, vehicleType})=>{
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

