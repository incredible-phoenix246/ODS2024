"use client";

import { useStateCtx } from "@/context/StateCtx";
import { ShoppingCart } from "iconsax-react";
import { getCart } from "@/actions/cart";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils";
import { useSearchParams } from "next/navigation";
import { decryptString } from "@/utils";
import Link from "next/link";

const CartButton = () => {
  const [cart, setCart] = useState<number>();
  const { setShowCartModal } = useStateCtx();
  const searchParams = useSearchParams();
  const cartID = searchParams.get("cartid");
  const cartId = searchParams.get("cartId");

  const cartOP = cartId !== null ? cartId : cartID;

  const decryptedId = cartID
    ? decryptString(cartID)
    : cartId
    ? decryptString(cartId)
    : "";

  // console.log(decryptedId);

  const fetchCart = async () => {
    if (decryptedId) {
      const cartData = await getCart(decryptedId);
      setCart(cartData?.size);
    }
  };

  useEffect(() => {
    fetchCart();
    const intervalId = setInterval(() => {
      fetchCart();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [fetchCart]);

  return (
    <>
      <Link
        href={`/shop/cart/cart?cartid=${cartOP}`}
        className="border-px bg-[#E6F6EE] fixed bottom-[30px] right-[35px] !z-[99] h-[60px] w-[60px] flex items-center justify-center rounded-full p-0"
      >
        <div className="relative py-2 items-center justify-center">
          <div className="t-0 absolute left-3">
            <p
              className={cn(
                "flex h-1 w-1 items-center justify-center rounded-full  p-3 text-xs bg-red-200 text-green-600",
                cart === undefined || 0 ? "hidden" : ""
              )}
            >
              {cart}
            </p>
          </div>
          <ShoppingCart
            color="#00A651"
            variant="Bold"
            className="mt-4 h-6 w-6 self-center"
          />
        </div>
      </Link>
    </>
  );
};

export default CartButton;
