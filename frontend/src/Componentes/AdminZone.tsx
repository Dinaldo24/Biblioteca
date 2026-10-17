import TableComponents from "./TableComponents"
import { DropdownMenuDemo } from "./DropMenyZone"
import { AvatarDemo } from "./AvatarZone"
import Viscardo from "../assets/Font/ViscardoAndGuamzn.jpg"
import { IoBookSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
let Tags = [
    { nombre: 'libros', icono: <IoBookSharp></IoBookSharp> },
    { nombre: 'dashboard', icono: <MdSpaceDashboard></MdSpaceDashboard> },

]

const AdminZone = () => {
    const { pathname } = useLocation()

    return (
        <div className="min-h-screen grid grid-cols-[15%_1fr]">
            <div className="border">
                <div className="flex justify-between items-center border p-2 bg-gray-200/10">
                    <img className="w-15 h-15 object-cover rounded-full items-center  object-center" src={Viscardo} ></img>
                    <p className="text-[11px] mx-4 font-semibold hidden md:block"> Juan Pablo Vizcardo y Guzman</p>
                </div>
                {
                    Tags.map((item, index) => {
                        return (
                            <NavLink to={`/adminZone/${item.nombre}`} key={index}

                                className={({ isActive }) =>
                                    `
                              ${isActive ? "bg-[#E0E7FF]" : "hover:bg-[#F2F0FE]"}
                                flex   
                            items-center gap-2 m-2 
                            border-none cursor-pointer justify-between  p-2 rounded-md 
                                `
                                }>

                                <p>{item.nombre}</p>
                                {item.icono}
                            </NavLink>
                        )
                    })
                }

            </div>
            <div>
                <div className="">
                    <div className="flex justify-end p-2    bg-gray-100">
                        <DropdownMenuDemo  ></DropdownMenuDemo>
                    </div>

                    <Outlet></Outlet>
                    {/* <TableComponents></TableComponents> */}
                </div>
            </div>


        </div>
    )
}

export default AdminZone




