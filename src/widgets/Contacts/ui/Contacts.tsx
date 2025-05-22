import { FC } from "react";
import Image from "next/image";
import phoneIcon from "@/shared/assets/images/icons/phone.svg";
import phoneBlackIcon from "@/shared/assets/images/icons/phone-black.svg";
import emailIcon from "@/shared/assets/images/icons/email.svg";
import Button from "@/shared/ui/Button/Button";
import Text from "@/shared/ui/Text/Text";

const Contacts: FC = async () => {
  const contacts = {
    map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2923.5481510057675!2d74.58453147680073!3d42.882380371149125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec81bf79c52b1%3A0xbe5200874d51edf6!2z0JbRg9GB0YPQvyDQkdCw0LvQsNGB0LDQs9GL0L0g0LDRgtGL0L3QtNCw0LPRiyDQmtGL0YDQs9GL0Lcg0KPQu9GD0YLRgtGD0Log0YPQvdC40LLQtdGA0YHQuNGC0LXRgtC4!5e0!3m2!1sru!2skg!4v1747817262471!5m2!1sru!2skg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    address: "Жусуп Баласагын атындагы Кыргыз Улуттук университети",
    phonenumber: "9999999999",
    email: "example@gmail.com",
  };

  return (
    <section
      id="contacts"
      className="bg-bg-secondary max-640:pt-[28px] max-640:pb-20 py-40"
    >
      <div className="container">
        <Text element="h2" size={20}>
          Contact & Map
        </Text>
        <div className="max-tb:flex-col mt-[16px] flex overflow-hidden rounded-[21px]">
          {contacts?.map && (
            <div
              dangerouslySetInnerHTML={{ __html: contacts.map }}
              className="max-640:[&_iframe]:max-h-[186px] max-tb:flex-auto flex-[0_1_620px] [&_iframe]:max-h-[271px] [&_iframe]:w-full"
            />
          )}
          <div className="max-640:py-20 max-640:px-[16px] max-tb:min-w-0 min-w-[401px] flex-auto shrink-0 bg-black px-[28px] pt-[28px] pb-20">
            <Text element="h3" size={16} className="font-bold">
              {contacts?.address}
            </Text>
            <a
              href={`tel:${contacts?.phonenumber}`}
              className="text-main-bright mt-[24px] mb-[12px] flex items-center gap-[4px]"
            >
              <Image src={phoneIcon} alt="phone" />
              <Text size={16}>{contacts?.phonenumber}</Text>
            </a>
            <a
              href="mailto:maksimkhon@gmail.com"
              className="text-main-bright flex items-center gap-[4px]"
            >
              <Image src={emailIcon} alt="email" />
              <Text size={16}>{contacts?.email}</Text>
            </a>
            <Button
              element="a"
              href={`tel:${contacts?.phonenumber}`}
              className="mt-20 flex w-full items-center justify-center gap-[11px] py-[14px] uppercase"
            >
              <Image src={phoneBlackIcon} alt="phone-black" />
              <Text size={16}>Call Now</Text>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
