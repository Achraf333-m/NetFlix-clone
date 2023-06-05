function Footer() {
  return (
    <div className="h-[280px] flex flex-col">
      <div className="flex justify-center mb-8 ">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain h-50 w-50"
        />
      </div>
      <ul className="flex justify-center items-center space-x-2 md:space-x-4 mb-10">
        <li className="linkHover">Home</li>
        <li className="linkHover">Account</li>
        <li className="linkHover">Movies</li>
        <li className="linkHover">TV Shows</li>
        <li className="linkHover">Contact Us</li>
      </ul>

      <h2 className="text-center text-[#e5e5e5]">All Rights Reserved</h2>
    </div>
  );
}

export default Footer;
