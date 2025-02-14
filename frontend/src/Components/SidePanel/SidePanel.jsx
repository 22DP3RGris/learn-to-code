import './SidePanel.css';
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

function SidePanel() {
    const [isHidden, setIsHidden] = useState(true);
    const sidePanelRef = useRef(null);
    const sidePanelListRef = useRef(null);

    const handleBtnClick = () => {
        setIsHidden(!isHidden);
    };

    return (
        <div className="side-panel-container">
            {!isHidden && (
                <div className="overlay" onClick={handleBtnClick}></div>
            )}
            <div className="side-panel" ref={sidePanelRef}>
                {!isHidden && (
                    <aside>
                        <ul ref={sidePanelListRef} className='side-panel-list'>
                            <li className='side-panel-item'>Work in progress</li>
                            <li className='side-panel-item'>Work in progress</li>
                            <li className='side-panel-item'>Work in progress</li>
                            <li className='side-panel-item'>Work in progress</li>
                        </ul>
                    </aside>
                )}
            </div>
            {isHidden && (
            <div onClick={handleBtnClick} className="side-panel-btn">
                <FontAwesomeIcon icon={faArrowRight } className='side-panel-icon'/>
            </div>)}
        </div>
    );
}

export default SidePanel;