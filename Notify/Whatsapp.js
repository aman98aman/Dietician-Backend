const sendWhatsappMessage = async(campaignName, phoneNumber, name, params) => {
    try{
        await axios.post(process.env.API_SENSY_HOST,{
            "apiKey": process.env.API_SENSY_KEY,
            "campaignName": campaignName,
            "destination": phoneNumber,
            "userName": name,
            "templateParams": params
        })
    }catch(e){
        console.log(user,e);
    }
}
module.exports = sendWhatsappMessage