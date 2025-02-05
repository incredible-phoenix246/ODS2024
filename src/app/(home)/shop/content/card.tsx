"use client";

import React from "react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useStateCtx } from "@/context/StateCtx";

const ShopCard = ({ id, image, name, price, discount }: Product) => {
  const { setShowProductModal, setSelectedProductId } = useStateCtx();

  const discountedAmount = price * (discount / 100);
  const discountedPrice = (price - discountedAmount).toFixed(2);

  const trimmedName =
    name &&
    name.split(" ").slice(0, 3).join(" ") +
      (name.split(" ").length > 3 ? "..." : "");

  return (
    <>
      <div className="flex flex-col max-w-[400px] min-h-[390px] max-h-[400px] rounded-2xl bg-white border-solid border border-[color:var(--Foundation-stroke-stroke-300,#EBEBEB)]">
        <Image
          src={image!}
          alt="ods shop"
          width={305}
          height={215}
          priority
          className="w-full border-t rounded-t-2xl max-w-[305px] max-h-[215px] object-cover aspect-[1.39] "
        />
        <div className="flex flex-col px-4 py-3 w-full shadow-sm min-h-[171px] gap-2">
          <div className="flex gap-2 justify-between">
            <div className="flex flex-col flex-1">
              <h3 className="text-base font-semibold">{trimmedName}</h3>
              <div className="flex items-center text-xs gap-1 max-w-[137px]">
                {/* <p className="">{rating}</p> */}

                <Image src="/star.svg" alt="star" width={18} height={16} />
                <p>-</p>
                {/* <p> {totalReviews}</p> */}
                {/* {hasReviews && <p>{reviews!.length} Reviews</p>} */}
              </div>
            </div>
            <div className="justify-center self-start px-1.5 max-h-[28px] max-w-[58px] py-1 text-xs leading-5 text-gray-200 whitespace-nowrap rounded aspect-[2.07] bg-[#466850]">
              {discount}% Off
            </div>
          </div>
          <div className="flex gap-1 items-center max-h-[28px] max-w-[147px] mt-3.5 text-xl font-semibold text-[#282828]">
            <div>
              <span className="text-lg">₦</span>
              <span className="text-xl font-semibold">{discountedPrice}</span>
            </div>
            <span className="text-xs line-through">{price}</span>
          </div>
          <button
            onClick={() => {
              setSelectedProductId(id!);
              setShowProductModal(true);
            }}
            className="justify-center items-center px-16 py-3.5 mt-3 text-lg leading-5 text-green-600 whitespace-nowrap bg-white rounded-xl border-t border-r-4 border-b-4 border-l border-solid border-b-[color:var(--Foundation-Primary-color-primary-color-500,#00A651)] border-l-[color:var(--Foundation-Primary-color-primary-color-500,#00A651)] border-r-[color:var(--Foundation-Primary-color-primary-color-500,#00A651)] border-t-[color:var(--Foundation-Primary-color-primary-color-500,#00A651)]"
          >
            View Product
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopCard;
