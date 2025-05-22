"use client";
import ProductCard from "@/entities/ProductCard/ui/ProductCard";
import { requester } from "@/shared/requester/requester";
import Slider from "@/shared/ui/Slider/Slider";
import Text from "@/shared/ui/Text/Text";
import { ACCESS_TOKEN } from "@/shared/variables/variables";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await requester.get("api/profile/");
      return data;
    },
  });

  useEffect(() => {
    const busketsString = localStorage.getItem("busket");
    if (busketsString) {
      setProducts(JSON.parse(busketsString));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) router.push("/");
  }, []);
  return (
    <div className="min-h-screen pt-60 pb-60">
      <section className="container pt-[30px]">
        <div className="flex flex-col gap-[20px]">
          <Text element="h2" size={31}>
            {"Профиль"}
          </Text>
          <div className="flex items-center gap-[20px]">
            <Image
              src={
                "https://salih.kg/static/media/noImage.6a21f9f8d634ae1081cd7dd19de64830.svg"
              }
              width={150}
              height={150}
              alt="logo"
            />
            <div>
              <Text element="h2" size={25}>
                {data?.username}
              </Text>
              <Text element="h2" size={25}>
                {data?.email}
              </Text>
            </div>
          </div>
          {products.length > 0 && (
            <div className="mt-[30px] flex flex-col gap-[15px]">
              <Text element="h2" size={25}>
                {"Мои продукты"}
              </Text>
              <div>
                <Slider name="prd" spaceBetween={10} slidesPerView="auto">
                  {products?.map((product, key) => (
                    <ProductCard
                      key={key}
                      setBusket={setProducts}
                      busket={"Delete"}
                      {...product}
                    />
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
