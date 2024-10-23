import Link from "next/link";
import { wixClientServer } from '@/library/wixClientServer';
import DOMPurify from 'isomorphic-dompurify';
import Pagination from './Pagination';
import { products } from "@wix/stores";
import Image from "next/image";

const PRODUCT_PER_PAGE = 15;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
 
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
 
}) => {
  const wixClient = await wixClientServer();

  
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq('collectionIds', categoryId)
    .hasSome("productType", searchParams?.type ? [searchParams.type] : ["physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0);

  if(searchParams?.sort){
    const [sortType, sortBy] = searchParams.sort.split(" ");
  
    if(sortType === "asc"){
      productQuery.ascending(sortBy);
    }
    if(sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }
  const res = await productQuery.find();
  
 

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-center flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="w-full h-80 relative">
            <Image
              src={product.media?.mainMedia?.image?.url || "/sweatmale.png"}
              alt={product.name || "Product Image"}
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || "/sweatmale.png"}
                alt={product.name || "Product Image"}
                fill
                sizes="25vw"
                className="absolute top-0 left-0 object-cover w-full h-full rounded-md z-20 opacity-0 hover:opacity-100 transition-opacity ease-in-out duration-500"
              />
            )}
          </div>
          <div className="flex justify-between mt-4">
            <span className="font-medium">{product.name}</span>
            <span>{product.price?.price}br</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <button className="rounded-2xl ring-1 ring-cottex text-cottex w-max py-2 px-4 text-xs hover:bg-cottex hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
       {searchParams?.cat || searchParams?.name ? (
        <Pagination
         currentPage={searchParams?.page || 0} 
         hasPrev={searchParams?.page > 0}
         hasNext={res.items.length === (limit || PRODUCT_PER_PAGE)}
        />
      ) :null} 
    </div>
  );
};

export default ProductList;
