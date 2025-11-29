import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// 📌 Mock function
function fetchOrderFromDB() {
     return new Promise((resolve) => {
          setTimeout(() => {
               resolve({
                    order_id: "ORD-2025-0012",
                    order_date: "2025-11-20",
                    price: 140,
                    customer_id: "CUST-7788",
               });
          }, 800); // simulate delay
     });
}

export default function BillTemplate() {
     const [order, setOrder] = useState(null);

     useEffect(() => {
          fetchOrderFromDB().then((data) => setOrder(data));
     }, []);

     if (!order) {
          return (
               <div className="fixed inset-0 bg-black/40 flex items-center justify-center text-white text-xl">
                    Loading...
               </div>
          );
     }

     return (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
               {/* BILL CONTENT */}
               <div className="bg-white w-full p-4 rounded-xl shadow-xl max-w-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                         <div className="flex items-center gap-4">
                              <div className="text-sm text-slate-700">
                                   <p className="font-semibold text-slate-800 mb-1">Bill From</p>
                                   <p className="text-slate-600 mb-4">{order.customer_id}</p>
                              </div>
                         </div>

                         <div className="text-right">
                              <h2 className="text-3xl font-bold">BILL</h2>
                              <p className="text-sm">Bill# {order.order_id}</p>
                              <p className="text-md font-semibold text-red-600">Balance Due: ${order.price}</p>
                         </div>
                    </div>

                    {/* Bill From + Dates */}
                    <div className="text-sm text-slate-700 mb-6">


                         {/* date */}
                         <div className="mt-6 w-60 text-slate-700 text-sm">
                              <div className="flex justify-between py-1">
                                   <span className="font-semibold">Bill Date:</span>
                                   <span>{order.order_date}</span>
                              </div>
                              <div className="flex justify-between py-1 font-semibold">
                                   <span className="font-semibold">Due Date:</span>
                                   <span>{order.order_date}</span>
                              </div>
                              <div className="flex justify-between py-1">
                                   <span className="font-semibold">Terms:</span>
                                   <span>Due on Receipt</span>
                              </div>
                         </div>
                    </div>

                    {/* Table */}
                    <table className="w-full border-collapse overflow-hidden rounded-xl">
                         <thead>
                              <tr className="bg-purple-900 text-white text-left">
                                   <th className="p-3">#</th>
                                   <th className="p-3">Item & Description</th>
                                   <th className="p-3">Qty</th>
                                   <th className="p-3">Rate</th>
                                   <th className="p-3">Amount</th>
                              </tr>
                         </thead>
                         <tbody className="text-slate-700">
                              <tr className="border-b">
                                   <td className="p-3">1</td>
                                   <td className="p-3">Xbox Game Pass 1 month</td>
                                   <td className="p-3">1</td>
                                   <td className="p-3">{order.price}</td>
                                   <td className="p-3">{order.price}</td>
                              </tr>
                         </tbody>
                    </table>

                    {/* Totals */}
                    <div className="mt-6 w-60 ml-auto text-slate-700 text-sm">
                         <div className="flex justify-between py-1">
                              <span>Sub Total</span>
                              <span>{order.price.toFixed(2)}</span>
                         </div>
                         <div className="flex justify-between py-1 font-semibold">
                              <span>Total</span>
                              <span>{order.price.toFixed(2)}</span>
                         </div>
                         <div className="flex justify-between py-1">
                              <span>Balance Due</span>
                              <span>{order.price.toFixed(2)}</span>
                         </div>
                    </div>

                    <NavLink
                         to="/user"
                         className={({ isActive }) =>
                              `text-white hover:text-gray-200 transition-colors font-medium ${isActive ? "text-viridian-600 border-b-2 border-viridian-600" : ""
                              }`
                         }
                    >
                         <button className="w-full bg-green-600 hover:bg-purple-700 text-white py-2 rounded-lg mt-4">
                              Approve
                         </button>
                    </NavLink>
               </div>
          </div>
     );
}