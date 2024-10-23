import React, { Suspense } from 'react';
import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import { wixClientServer } from '@/library/wixClientServer';
import Image from "next/image";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
    const wixClient = await wixClientServer();
    
    let cat;
    try {
        cat = await wixClient.collections.getCollectionBySlug(
            searchParams.cat || 'all-products'
        );
    } catch (error) {
        console.error("Error fetching collection by slug:", error);
        cat = null; // Handle error gracefully
    }

    return (
        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative '>
            {/* campaign */}
            <div className='hidden bg-pink-100 px-4 sm:flex justify-between h-64'>
                <div className='w-2/3 flex flex-col items-center justify-center gap-8'>
                    <h1 className='text-4xl font-semibold leading-[48px] text-gray-700'>
                        50% ቅናሽ እናደርጋለን <br />ጥራት ያላቸውን ምችቶቻችንን 
                    </h1>
                    <button className='rounded-3xl bg-cottex text-white w-max py-3 px-5 text-sm'>
                       አሁኑኑ ይገበያዩ
                    </button>
                </div>
                <div className='relative w-1/3'>
                    <Image 
                        src="/sweatpwoman.png" 
                        alt="Product" 
                        fill
                        sizes="30vw"
                        className="object-contain" 
                    /> 
                </div>
            </div>
            {/* filter */}
            <Filter />
            {/* products */}
            <h1 className='mt-12 text-xl font-semibold '>{cat?.collection?.name || "Products"}</h1>
            <Suspense fallback={"loading..."}>
                <ProductList 
                    categoryId={cat?.collection?._id || "00000000-000000-000000-000000000001"} 
                    searchParams={searchParams}
                    limit={8}
                    
                />
            </Suspense>
        </div>
    );
};

export default ListPage;
