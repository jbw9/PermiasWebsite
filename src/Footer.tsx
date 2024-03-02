import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="flex items-center bg-footer text-white mx-auto justify-between">
            <div className="m-10">
                <div className="text-3xl">Contact Us</div>
                <div>Couldn't find what you're looking for?</div>
                <div>Contact us through email to get in touch!</div>
                <a href="mailto:permias.uiuc@gmail.com" className="text-blue-500 hover:underline">permias.uiuc@gmail.com</a>
            </div>
            <div className="flex">
                <img 
                    src={ process.env.PUBLIC_URL + "/footer/whatsapp.svg"}
                    alt="Whatsapp Logo"
                    width={50}
                    className="mx-10"
                />
                <img 
                    src={ process.env.PUBLIC_URL + "/footer/instagram.svg"}
                    alt="Instagram Logo"
                    width={50}
                    className="mx-10"
                />
                <img 
                    src={ process.env.PUBLIC_URL + "/footer/facebook.svg"}
                    alt="Facebook Logo"
                    width={50}
                    className="mx-10"
                />
            </div>
            <div className="m-10 items-end">
                <div className="text-xl">New Student?</div>
                <div><a href="">Apply Here!</a></div>
                <div><a href="">Events</a></div>
            </div>
        </div>
    )
}

export default Footer