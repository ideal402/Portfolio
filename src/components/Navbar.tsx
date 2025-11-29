"use client"

import React, {useState} from "react";
import {motion} from "framer-motion" 
import style from "./navbar.module.css"

export default function Navbar(){

    const [isMenuOpen, setMeunOpen] = useState(false);

    const handleMenuToggle = () => {
        setMeunOpen(!isMenuOpen);
    };

    const menuVarient = {
        closed: {x : "100%"},
        open: {x: 0},
    };

    return(
        <>
            <div className={style.navContainer}>
                <p className={style.text}>MENU</p>
                <button 
                    className={style.toggle}
                    onClick={handleMenuToggle}
                ></button>
            </div>
            <motion.ul 
                className={style.menu}
                initial="closed"
                animate={isMenuOpen ? "open" : "closed"}
                variants={menuVarient}
                transition={{type:"tween", duration: 0.4}}
            >   
                <li className={style.menuItem}>
                    1st
                </li>
                <li className={style.menuItem}>
                    2nd
                </li>
                <li className={style.menuItem}>
                    3rd
                </li>
            </motion.ul>
        </>
    )
};