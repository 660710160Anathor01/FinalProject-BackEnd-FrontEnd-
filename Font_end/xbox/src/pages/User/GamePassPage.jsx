import React from "react";
export default function GamePassPage() {
     return (
          <div className="flex min-h-screen bg-black text-white">



               {/* Main Content */}
               <div className="flex-1 p-8">
                    {/* Banner */}
                    <div
                         className="w-full h-64 rounded-3xl bg-cover bg-center"
                         style={{
                              backgroundImage:
                                   "url('/images/xbox/xboxgamepage1.jpg')",
                         }}
                    >
                         <div className="bg-black/40 w-full h-full rounded-3xl p-10 flex flex-col justify-end items-end text-right">
                              <h1 className="text-3xl font-bold">Qbox's Game Pass</h1>
                              <p className="text-xl">1 Month</p>
                         </div>

                    </div>


                    {/* Content */}
                    <div className="mt-10 flex justify-between items-start px-60">
  {/* Left Button Section */}
  <div className="space-y-6">
    <button className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-xl text-xl font-bold shadow-lg">
      BUY
      <div className="text-sm font-light">140 bath/month</div>
    </button>

    <div className="text-yellow-400 px-6 py-3 rounded-xl text-xl font-extrabold w-fit">
      ▶ JOIN NOW!!!
    </div>
  </div>

  {/* Right Features */}
  <div className="pr-5">
     <h1>การสมัครใช้งานจะดำเนินการต่อไปโดยอัตโนมัติ</h1>
    <ul className="space-y-3 text-lg">
      <li>• เกมส์คุณภาพระดับพรีเมียมหลายร้อยเกม</li>
      <li>• รับเกมออกใหม่ตั้งแต่วันแรก</li>
      <li>• ข้อเสนอและส่วนลดสำหรับสมาชิก</li>
    </ul>
  </div>
</div>

               </div>
          </div>
     );
}