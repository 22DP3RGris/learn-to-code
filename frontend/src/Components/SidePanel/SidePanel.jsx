import './SidePanel.css';
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBook, faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function SidePanel() {
    const [isHidden, setIsHidden] = useState(true);
    const sidePanelRef = useRef(null);
    const sidePanelListRef = useRef(null);

    const navigate = useNavigate();

    const handleBtnClick = () => {
        setIsHidden(!isHidden);
    };

    const handleNavigation = (path) => {
        setIsHidden(true);
        navigate(path);
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
                            <li className='side-panel-item' onClick={() => handleNavigation('/programming-languages')}>
                                <FontAwesomeIcon icon={faBook} className='side-panel-item-icon'/>
                                <div className='side-panel-item-title'>TEORIJA</div>
                            </li>
                            <li className='side-panel-item'>
                                <FontAwesomeIcon icon={faScrewdriverWrench} className='side-panel-item-icon'/>
                                <div className='side-panel-item-title'>WORK IN PROGRESS</div>
                            </li>
                            <li className='side-panel-item'>
                                <FontAwesomeIcon icon={faScrewdriverWrench} className='side-panel-item-icon'/>
                                <div className='side-panel-item-title'>WORK IN PROGRESS</div>
                            </li>
                            <li className='side-panel-item'>
                                <FontAwesomeIcon icon={faScrewdriverWrench} className='side-panel-item-icon'/>
                                <div className='side-panel-item-title'>WORK IN PROGRESS</div>
                            </li>
                        </ul>
                    </aside>
                )}
            </div>
            {isHidden && (
            <div onClick={handleBtnClick} className="side-panel-btn">
                <FontAwesomeIcon icon={faArrowRight} className='side-panel-icon'/>
            </div>)}
        </div>
    );
}

export default SidePanel;