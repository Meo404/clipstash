import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import SideDrawer from './SideDrawer/SideDrawer';

export default function Navigation() {

    const [mobileMenu, setMobileMenu] = useState(false);

    function mobileMenuHandler() {
        setMobileMenu(!mobileMenu);
    }

    return (
        <React.Fragment>
            <TopNavbar mobileMenuHandler={mobileMenuHandler} />
            <SideDrawer
                mobileMenu={mobileMenu}
                mobileMenuHandler={mobileMenuHandler}
            />
        </React.Fragment>
    );
}