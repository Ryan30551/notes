import React from "react";

const Header = ({ handleToggleDarkMode }) => {
    return(
        <div className="header">
            <h1>Sticky Note App</h1>
            <button 
                onClick={() => 
                    handleToggleDarkMode(
                        (previousDarkMode) => !previousDarkMode 
                    )
                }
                className='save'
            >
                Light or Dark Mode
            </button>
        </div>
    );
};

export default Header;