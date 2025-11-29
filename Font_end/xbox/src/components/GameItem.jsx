export default function GameItem({ title, category, image, rating }) {
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
             <h3 className="text-white text-lg font-semibold">{title}</h3>
             <p className="text-gray-300 text-sm">Category: {category}</p>
           </div>
   
           {/* Rating Stars */}
           <div className="text-yellow-400">
             {"★".repeat(Math.round(rating))}
             {"☆".repeat(5 - Math.round(rating))}
           </div>
         </div>
       </div>
     );
   }
   