import React from "react";
import Logout from "../logout";

function NavBar() {
  return (
    <nav>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Note App</h1>
        <Logout />
      </div>
    </nav>
  );
}

export default NavBar;
