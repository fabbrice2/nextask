import React from "react";

function Header({ title, email }) {
  return (
    <div className="header px-6 py-3 flex items-center justify-between">
      <div className="logo">
        <svg
          className="w-10 h-10 svg stroke-2 stroke-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M415.44 512h-95.11L212.12 357.46v91.1L125.69 512H28V29.82L68.47 0h108.05l123.74 176.13V63.45L386.69 0h97.69v461.5zM38.77 35.27V496l72-52.88V194l215.5 307.64h84.79l52.35-38.17h-78.27L69 13zm82.54 466.61l80-58.78v-101l-79.76-114.4v220.94L49 501.89h72.34zM80.63 10.77l310.6 442.57h82.37V10.77h-79.75v317.56L170.91 10.77zM311 191.65l72 102.81V15.93l-72 53v122.72z" />
        </svg>
      </div>
      <div className="flex md:hidden cursor-pointer text-[#BBBAA6]">
        {title ? <p>{title}</p> : null}
        {email ? <p>{email}</p> : null} 
      </div>
    </div>
  );
}

export default Header;
