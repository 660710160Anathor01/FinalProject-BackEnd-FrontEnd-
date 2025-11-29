import { NavLink } from "react-router-dom";

export default function GameItem({id, title, category, image, rating }) {
     return (
       <div className="flex gap-4 bg-[#2f3a56] p-4 rounded-xl mb-4 shadow-lg">
         {/* Thumbnail */}
         <img
           src={image}
           alt={title}
           className="w-24 h-24 object-cover rounded-xl"
         />
   
         <div className="flex flex-col justify-between w-full">
           {/* Title + Category */}
           <div>
           <NavLink to={`game/${id}`}
              className={({ isActive }) => 
                `text-white hover:text-gray-200 transition-colors font-medium ${
                  isActive ? 'text-viridian-600 border-b-2 border-viridian-600' : ''
                }`
              }
            >
              <h3 className="text-white text-lg font-semibold">{title}</h3>
            </NavLink>
             
             <p className="text-gray-300 text-sm">Category: {category}</p>
           </div>
         </div>
       </div>
     );
   }
   