import React from "react";
import Link from "next/link"; 
import Image from "next/image";
const Footer = () => {
    return ( 
        <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-24">
            {/*top */}
            <div className="flex flex-col md:flex-row justify-between gap-24">
            {/*left */}
            <div className="lg:w-1/4  w-full md:w-1/2 flex flex-col gap-8">
            <Link href="/">
            <div className="text-2xl tracking-wide">COTTEX APPAREL</div>
            </Link> 
            <p>Addis Ababa, near Bole Medhanialem</p>
            <span className="font-semibold">cottex@gmail.com</span>
            <span className="font-semibold">+12596849500</span>
            <div className="flex gap-6">
            <Image src="/facebook.png" alt="" width={20} height={20}/>
            <Image src="/instagram.png" alt="" width={20} height={20}/>
            <Image src="/youtube.png" alt="" width={20} height={20}/>
            <Image src="/telegram.png" alt="" width={20} height={20}/>
            </div>
            </div>
            {/*center */}
            <div className="hidden lg:flex justify-between w-1/2 ">
            <div className="flex flex-col justify-between">
                <h1 className="font-medium text-lg">COMPANY</h1>
                <div className="flex flex-col gap-6">
                    <Link href="">About Us</Link>
                    <Link href="">Careers</Link>
                    <Link href="">Blog</Link>
                    <Link href="">Contact Us</Link>

                </div>
            </div>
            <div className="flex flex-col justify-between">
                <h1 className="font-medium text-lg">SHOP</h1>
                <div className="flex flex-col gap-6">
                    <Link href="">New Arivals</Link>
                    <Link href="">Men</Link>
                    <Link href="">Women</Link>
                    <Link href="">All Products</Link>

                </div>
            </div>
            <div className="flex flex-col justify-between">
                <h1 className="font-medium text-lg">HELP</h1>
                <div className="flex flex-col gap-6">
                    <Link href="">Customer Service</Link>
                    <Link href="">My Account</Link>
                    <Link href="">Find a Store</Link>
                    <Link href="">Legal & Privacy</Link>

                </div>
            </div>
              </div>
            {/*right */}
            <div className="w-full md:w-1/2 flex flex-col gap-8">
            <h1 className="font-medium text-lg">SUBSCRIBE</h1>
            <p>be the first to get the latest news about trends, promotion and much more!</p>
            <div className="flex"> 
                <input 
            type="text"
             placeholder="Email address"
             className="p-4 w-3/4"/>
             <button className="w-1/4 bg-cottex text-white">JOIN</button>
             </div>
             <span className="font-semibold">Secure Payments</span>
             <div className="flex justify-between ">
             <Image src="/telebirr.png" alt="" width={40} height={20} style={{ width: "auto", height: "auto" }} />
            <Image src="/cbebir.png" alt="" width={40} height={20} style={{ width: "auto", height: "auto" }} />
            <Image src="/mpesa.png" alt="" width={40} height={20} style={{ width: "auto", height: "auto" }} />
            <Image src="/ebirr.png" alt="" width={40} height={20} style={{ width: "auto", height: "auto" }} />
             
             </div>
            </div>
          
        </div>
        {/*bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
            <div className="">@ 2024 Modernizing Cottex Apparel</div>
            <div className="flex flex-col gap-8 md:flex-row">
                <div className="">
                    <span className="text-gray-700 mr-4">Language</span>
                    <span className="font-medium">Ethiopia|Amharic</span> 
                </div>
                <div className="">
                    <span className="text-gray-700 mr-4">Currency</span>
                    <span className="font-medium">ETB</span>
                </div>

            </div>
        </div>
        </div>
     );
}
 
export default Footer;