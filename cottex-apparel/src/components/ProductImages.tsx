'use client'; 
import React, { useState } from 'react';
import Image from 'next/image'; 
const ProductImages = ({ items }: { items: any }) => {
    const [index, setIndex] = useState(0);

    return (
        <div className="flex flex-col items-center">
            {/* Main Image */}
            <div className="w-full h-[500px] relative max-w-2xl">
                <Image 
                    src={items[index].image?.url} 
                    alt="" 
                    className="object-cover rounded-md"
                    fill
                    sizes='50vw'
                />
            </div>
            
            {/* Thumbnails */}
            <div className="flex justify-center gap-4 mt-8 max-w-2xl w-full">
                {items.map((item: any, i: number) => (
                    <div 
                        className={`w-1/4 h-24 relative cursor-pointer ${
                            i === index ? 'ring-2 ring-cottex' : ''
                        }`} 
                        key={item._id} 
                        onClick={() => setIndex(i)}
                    >
                        <Image 
                            src={item.image?.url} 
                            alt={`Thumbnail ${i + 1}`} 
                            className="object-cover rounded-md"
                            fill
                            sizes='30vw'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;
