import React from "react";
import Image from "next/image";
import { CartItemWithProduct } from "@/actions/cart";
import { AddCircle, MinusCirlce, Trash } from "iconsax-react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  handleDeleteItem: (productId: string) => Promise<void>;
  handleIncreaseQuantity: (productId: string) => Promise<void>;
  handleDecreaseQuantity: (productId: string) => Promise<void>;
}

const productCard = ({
  cartItem: { product, quantity },
  handleDeleteItem,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: CartEntryProps) => {
  const calculateDiscountedPrice = (
    originalPrice: number,
    discount: number
  ): number => {
    const discountedAmount = (originalPrice * discount) / 100;
    const discountedPrice = originalPrice - discountedAmount;
    return discountedPrice;
  };

  const trimmedName =
    product.name &&
    product.name.split(" ").slice(0, 3).join(" ") +
      (product.name.split(" ").length > 3 ? "..." : "");

  return (
    <div>
      <section className="max-w-[538px] hidden md:inline">
        <div className="flex gap-5 flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-[34%]">
            <Image
              src={product.image}
              alt={product.name}
              width={305}
              height={215}
              priority
              className="w-full rounded-2xl max-w-[305px]  max-h-[215px] object-cover aspect-[1.39] "
            />
          </div>
          <div className="flex flex-col w-full md:w-[66%]">
            <div className="flex flex-col mt-4">
              <div className="flex gap-0 justify-between whitespace-nowrap">
                <div className="grow my-auto text-2xl font-semibold leading-6 text-zinc-800 font-montserrat">
                  {trimmedName}
                </div>
                {/* <div className="grow justify-center p-1 text-base leading-5 rounded bg-stone-100 text-neutral-600">
              {variant}
            </div> */}
              </div>
              <div className="flex gap-5 justify-between max-w-[344px] max-h-[32px] mt-5">
                <div className="max-w-[201px] flex items-center justify-between gap-4">
                  <button onClick={() => handleDecreaseQuantity(product.id)}>
                    <MinusCirlce
                      size="21"
                      className="bg-zinc-100 border-solid rounded-full"
                    />
                  </button>
                  <div className="flex gap-4 justify-between text-base whitespace-nowrap">
                    <div className="flex gap-1 justify-between max-w-[133px] max-h-[32px] font-nunito">
                      <span className="h-8 text-center rounded w-[31px] bg-zinc-100 text-neutral-600">
                        {quantity}
                      </span>
                      <span className="font-semibold leading-7 text-center self-center h-8 rounded font-nunito w-[100px] bg-zinc-100 text-zinc-800">
                        ₦{" "}
                        {calculateDiscountedPrice(
                          product.price,
                          product.discount
                        ).toFixed(2)}
                      </span>
                    </div>
                    <button 
                    onClick={() => handleIncreaseQuantity(product.id)}
                    >
                      <AddCircle
                        size="21"
                        className="bg-zinc-100 border-solid rounded-full"
                      />
                    </button>
                  </div>
                </div>
                <button
                  className="flex justify-center items-center aspect-square"
                  onClick={() => handleDeleteItem(product.id)}
                >
                  <Trash size="21" color="#FF0000" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default productCard;



