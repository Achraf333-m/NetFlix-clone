import Link from "next/link";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import Dropdown from "./Dropdown";

function Header() {

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true)
            }
            else {
                setScrolled(false)
            }
        }


        window.addEventListener("scroll", handleScroll) 

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])


  return (
    <header className={`${scrolled ? 'bg-[#141414]' : 'bg-transparent'} transition duration-1000 ease-in-out `}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden md:flex space-x-4">
          <li className="headerlink">Home</li>
          <li className="headerlink">Movies</li>
          <li className="headerlink">Series</li>
          <li className="headerlink">New Releases</li>
          <li className="headerlink">My List</li>
        </ul>
      </div>

      <div className="flex space-x-4 text-sm font-light items-center lg:text-xl">
        <BsSearch className="h-6 w-6 hidden sm:inline" />
        <p className="hidden lg:inline cursor-default">Kids</p>
        <FaBell className="h-6 w-6 hidden" />
        {/* <Link href="/account"> */}
          
          <Dropdown />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;
