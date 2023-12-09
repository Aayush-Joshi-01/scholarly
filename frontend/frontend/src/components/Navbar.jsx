import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles, colors } from "../style";
import { navLinks } from "../constants";
import { menu, close } from "../assets";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Navbar = ({username,setUsername}) => {
  const [active, setActive] = useState("");
  const [toggle,setToggle] = useState(false);
  const navigateTo = useNavigate();
  return (
    <nav
      className={`${styles.paddingX}
        w-full
        flex
        items-center
        py-5 fixed top-0
        z-20 bg-[#040014]
    `}
    >
      <div className="w-full flex justify-between items-center max-w-7x1 mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <img src={logo} alt="logo" className="w-9 h-9 object-contain" /> */}
          <p className="text-white text-[18px] font-bold cursor-pointer flex ml-10">
            Scholarly &nbsp;<span className="sm:block hidden">|&nbsp; Scholarship Portal</span>
          </p>
        </Link>
        {username ? <div className=" flex items-center justify-end">
          <div><span className="text-gray-400 px-2 xxxs:hidden xs:hidden s:hidden">{username}</span></div>
          <li
              className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer list-none px-5 xxxs:hidden"
              onClick={() => {
                localStorage.removeItem('token');
                setUsername('');
              }}
            >
              <a>Log out</a>
            </li>
          </div> : <><ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => {
                navigateTo(`/${link.id}`)
                setActive(`${link.title}`)
              }}
            >
              <a>{link.title}</a>
            </li>
          ))}
        </ul></>}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          ></img>
          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            {username ? <div><span>{username}</span><li
              className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer list-none px-5"
              onClick={() => {
                localStorage.removeItem('token');
                setUsername('');
              }}
            >
              <a>Log out</a>
            </li></div> : <div><ul className="list-none flex justify-end items-start flex-col gap-4">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } font-medium text-[16px] font-poppins cursor-pointer`}
              onClick={() => {setActive(link.title); setToggle(!toggle); navigateTo(`/${link.id}`);}}
            >
              <a>{link.title}</a>
            </li>
          ))}
        </ul></div>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
