import Text from "../Text/Text";
import { cn } from "@/shared/helpers/helpers";

interface Props<T> {
  list: T[];
  page: T;
  setPage: (page: T) => void;
  className?: string;
}

const Navigation = <T extends string>({
  list,
  page,
  setPage,
  className,
}: Props<T>) => {
  return (
    <div
      className={cn(
        "border-secondary-bright relative flex border-b-2 pb-[11px]",
        className,
      )}
    >
      {list.map((nav) => (
        <Text
          key={nav}
          size={16}
          element="button"
          onClick={() => setPage(nav)}
          className={cn("clickable-text flex-auto text-center capitalize", {
            "text-main font-bold": page === nav,
          })}
        >
          {nav}
        </Text>
      ))}
      <div
        style={{
          width: `${100 / list.length}%`,
          left: `${(list.findIndex((currPage) => currPage === page) / list.length) * 100}%`,
        }}
        className="bg-main animate-def absolute bottom-[-2px] h-[2px]"
      ></div>
    </div>
  );
};

export default Navigation;
