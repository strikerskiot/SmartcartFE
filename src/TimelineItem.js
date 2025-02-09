import React from 'react';

const TimelineItem = ({ block, description }) => {
    return (
        <div className="timeline_item">
            <div className="timeline_left">
                <div className="timeline_date-text">{block}</div>
            </div>
            <div className="timeline_centre">
                <div className="timeline_circle"></div>
            </div>
            <div className="timeline_right">
                <div className="margin-bottom-medium">
                    <div className="timeline_text">{description}</div>
                </div>
                {/* Additional content can be added here */}
                {/* <div className="timeline_progress">
                    <div
                        data-w-id="d5abcf1f-3370-3eea-ccfd-66f076babfdd"
                        className="timeline_progress-bar"
                        style={{ willChange: 'opacity', opacity: 2 }}
                    ></div>
                </div> */}
            </div>
        </div>
    );
};

export default TimelineItem;
