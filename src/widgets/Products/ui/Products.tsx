"use client";

import { FC, useEffect, useState } from "react";
import ProductCard from "@/entities/ProductCard/ui/ProductCard";
import SwiperPagination from "@/shared/ui/SwiperPagination/SwiperPagination";
import Text from "@/shared/ui/Text/Text";
import { IProduct } from "@/shared/types/types";
import { useQuery } from "@tanstack/react-query";
import { requester } from "@/shared/requester/requester";
import ProductSkeleton from "@/entities/ProductCard/ui/ProductSkeleton";
import "swiper/css";

const Products: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [buskets, setBuskets] = useState<any[]>([]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await requester<IProduct[]>("api/products/")).data,
  });

  useEffect(() => {
    const busketsString = localStorage.getItem("busket");
    if (busketsString) {
      setBuskets(JSON.parse(busketsString));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("busket", JSON.stringify(buskets));
  }, [buskets]);
  return (
    <section
      id="products"
      className="max-640:pt-[22px] max-640:pb-[28px] container-custom mx-auto !max-w-[1292px] px-[16px] pt-[32px] pb-[34px]"
    >
      <Text size={20} element="h2">
        Our Products
      </Text>

      <div className="mt-30 flex flex-wrap gap-20">
        {isLoading
          ? Array.from({ length: 5 }, (_, key) => <ProductSkeleton key={key} />)
          : products?.map((product, key) => (
              <ProductCard
                key={key}
                busket={"Save"}
                setBusket={setBuskets}
                {...product}
              />
            ))}
      </div>

      <SwiperPagination swiper="products" />
    </section>
  );
};

export default Products;
