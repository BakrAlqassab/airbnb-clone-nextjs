import { IconType } from "react-icons";
interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  Icon: IconType;
}
export default function CategoryInput({
  onClick,
  selected,
  label,
  Icon,
}: CategoryInputProps) {
  return (
    <div
      className={`rounded-xl p-4 border-2 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? "border-black" : "border-neutral-200"} `}
      onClick={() => onClick(label)}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}
