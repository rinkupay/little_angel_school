
// Generate Otp
exports.generateOtp = () =>{
    let otp = "";
    const length = 6;
    for(let i = 0 ; i < length; i ++ ){
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}