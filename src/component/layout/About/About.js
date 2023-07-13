import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {

    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/drrybvx2x/image/upload/v1688279790/avatars/sgn96767saonpuytlhh0.jpg"
                            alt="Founder"
                        />
                        <Typography>Abhishek Pandey</Typography>

                        <span>
                            An Ecommerce web application
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;