const cloudinary = require("cloudinary").v2;
require('dotenv').config()

 exports.cloudineryConnect = () => {
    try{
        cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
    }
     catch (error) {
		console.log( "Eroor While Connecting To Cloudinery => " , error);
	}
}