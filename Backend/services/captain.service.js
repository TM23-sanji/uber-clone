const captainModel=require('../models/captain.model');

module.exports.createCaptain=async({
    firstname,lastname,email,password,color,plate,capacity,vehicleType
})=>{
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain= captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain
};

// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E5ZGIxZmNmZGUxM2FhZjM5Yjc1MWIiLCJpYXQiOjE3MzkxODQ5MjcsImV4cCI6MTczOTI3MTMyN30.bK79f4O0D6e66lR8WgTJ2i8WPQOZMiic1NpYzKmNFmo",
// "captain":{"fullname":{"firstname":"test_captain_firstname","lastname":"test_captain_lastname"},"email":"test_email@gmail.com","password":"$2b$10$WThAZbiecMfyyQKsbXDJBeWrLrGNcGqgg4N1kbKM78nxUsjIPPa02",
// "status":"inactive","vehicle":{"color":"red","plate":"MP 04 XY 6204","capacity":3,"vehicleType":"car"},"_id":"67a9db1fcfde13aaf39b751b","__v":0}}