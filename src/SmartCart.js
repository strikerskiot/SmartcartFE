import React from 'react';
import './SmartCart.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from React Router
import TimelineItem from './TimelineItem';

const SmartCart = () => {
    return (
        <div className="page-wrapper">
            <div className="section-hero">
                <div className="background-layer"></div>
                <div className="hero-nav">
                    <a href="/" target="_blank" className="relume-link w-inline-block">
                        <div className="smartcart-logo-primary w-embed">
                            {/* SVG Logo can be included here */}
                        </div>
                        <div className="smartcart-logo-secondary w-embed">
                            {/* SVG Logo can be included here */}
                        </div>
                    </a>
                    <div className="hero-nav_button-wrapper">
                        <Link to="/login" className="button-icon-small-secondary margin-right-small mobile-margin-right-zero w-inline-block">
                            {/* <img src="bluecart.jpeg" loading="lazy" alt="" className="button-icon" /> */}
                            <div>🛒Login</div>
                        </Link>
                        <Link to="/signup" className="button-icon-small hide-mobile w-inline-block">
                            {/* <img src="https://assets.website-files.com/60dd72519d9f9f67690ae425/60de769c3e6065e46ac83768_clone-icon-white.svg" loading="lazy" alt="" className="button-icon" /> */}
                            <div>🛒Signup</div>
                        </Link>
                    </div>
                </div>
                <div className="container">
                    <div className="padding-vertical-xxlarge">
                        <div className="timeline-hero_heading-wrapper">
                            <h1>
                                Smart <span className="text-underline">Cart</span>
                            </h1>
                            <div className="margin-bottom-medium">
                                <h4>Smart cart System</h4>
                            </div>
                            <p className="paragraph-large"><b>Our Mission</b><br />
                                Our mission is to revolutionize urban logistics by reducing human effort and increasing efficiency in load transport through advanced technology and smart design.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-timeline-heading">
                <div className="container">
                    <div className="padding-vertical-xlarge">
                        <div className="timeline-main_heading-wrapper">
                            <div className="margin-bottom-medium">
                                <h2>Smart Cart Stations</h2>
                            </div>
                            <h5 className="paragraph-large">Our Cart<br /><br />Dropping Stations</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-timeline">
                <div className="container">
                    <div className="timeline_component">
                        {/* Timeline items can be mapped here */}

                        <TimelineItem block="A" description="Near Step" />
                        <TimelineItem block="B" description="Near COE" />
                        <TimelineItem block="C" description="Enter C & D Block" />
                        <TimelineItem block="D" description="Near Small Canteen" />
                        <TimelineItem block="Library" description="Library" />
                        <TimelineItem block="Girls-Hostel" description="Girls-Hostel" />
                        <TimelineItem block="Boys-Hostel" description="Boys-Hostel" />
                        <TimelineItem block="MBA-Block" description="MBA-Block" />
                        <TimelineItem block="Food Court" description="Food Court" />
                        <TimelineItem block="Parking" description="Parking" />
                        <TimelineItem block="Ground" description="Ground" />
                    </div>
                </div>
            </div>

            <div className="section-footer">
                <div className="background-layer"></div>
                <div className="container">
                    <div className="padding-vertical-footer">
                        <div className="footer_text-wrapper">
                            <div className="margin-bottom-small">
                                <h2>Join Us</h2>
                            </div>
                            <div className="margin-bottom-medium">
                                <h4>Stay With Smart Cart</h4>
                            </div>
                            <div className="margin-bottom-large">
                                <p className="paragraph-large">If you are interested in our Smart Cart System or want to collaborate, please get in touch with us. Together, we can create a smarter, more efficient future for urban transportation.</p>
                            </div>
                            <div className=" button-wrapper">
                                <a href="mailto:titansstratagem@gmail.com" className="button-icon-small margin-right-small w-inline-block">
                                    <img src="https://assets.website-files.com/60dd72519d9f9f67690ae425/60de750855e62d9dada3b400_email-icon-white.svg" loading="lazy" alt="" className="button-icon" />
                                    <div>Enquiry</div>
                                    
                                    

                                </a>
                                <a href="tel:+91 6381 521 917" className="button-icon-small-secondary w-inline-block">
                                    {/* <img src=".." loading="lazy" alt="" className="button-icon" /> */}
                                    <div>📞Contact Us</div>
                                </a>
                            </div>
                        </div>
                        <div className="footer_credits-wrapper">
                            
                            {/* <p className="text-link text-light-grey privacy-policy">
                                <a href="+91 6381 521 917" target="_blank" rel="noopener noreferrer" className="text-link text-light-grey" aria-label="Privacy Policy">...</a>
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartCart;

