import { FC } from "react";
import Text from "@/shared/ui/Text/Text";
import bannerImage from "@/shared/assets/images/banner.jpg";

const Main: FC = async () => {
  return (
    <section id="main">
      <div className="pt-60">
        <div
          style={{ backgroundImage: `url(${bannerImage.src})` }}
          className="relative h-[calc(100vh-60px)] bg-cover bg-center bg-no-repeat pb-40 before:absolute before:right-0 before:bottom-0 before:left-0 before:h-[221px] before:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#161616_96.15%)] before:shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)]"
        >
          <div className="relative z-10 container flex h-full flex-col justify-end">
            <Text size={20} className="font-semibold">
              {'Добро пожаловать в интернет-магазин "АксессуарПро"'}
            </Text>
            <Text element="h1" size={49} className="mb-20">
              АксессуарПро: Стильная Защита для Вашего Смартфона
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
