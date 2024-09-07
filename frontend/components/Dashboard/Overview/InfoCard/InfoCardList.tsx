import { OVERVIEW_INFOS } from "@/constants";
import InfoCardItem from "./InfoCardItem";

const InfoCardList = () => {
  return (
    <div className="flex flex-start gap-2 overflow-x-scroll">
      {OVERVIEW_INFOS.map((_info) => (
        <InfoCardItem
          description={_info.description}
          src={_info.src}
          title={_info.title}
          key={_info.title}
        />
      ))}
    </div>
  );
};

export default InfoCardList;
