import { NavLink } from "react-router-dom";

export default function DatabasePage() {
  return (
    <>
      <nav className="fixed top-14 flex left-110 w-full bg-[#202123] shadow-md border-b border-black z-[900]">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="flex space-x-8 h-16 items-center">
            <li>
              <NavLink
                to="/database"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-lg font-medium ${
                    isActive ? "text-white" : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Screenshots
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/database/videos"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-lg font-medium ${
                    isActive ? "text-white" : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Recordings
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
