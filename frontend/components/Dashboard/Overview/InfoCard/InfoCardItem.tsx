import Image from "next/image";

interface IProps {
  src: string;
  title: string;
  description: string;
}
const InfoCardItem = ({ src, title, description }: IProps) => {
  return (
    <div className="bor-3 p-[var(--Size-S)] h-[123px] bg-[--white] min-w-[350px] flex-between gap-4">
      <Image alt={title} src={src} width={77} height={61} />
      <div className="flex flex-col gap-1">
        <p className="text-[--gray-8]">{title}</p>
        <p className="text-sm text-[--gray-9]">{description}</p>
      </div>
    </div>
  );
};

export default InfoCardItem;
