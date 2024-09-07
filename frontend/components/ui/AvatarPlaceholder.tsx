import Image from "next/image";

const AvatarPlaceholder = () => {
  return (
    <Image
      src={"https://avatar.iran.liara.run/public"}
      width={31}
      height={31}
      className="rounded-lg object-cover"
      alt="Avatar placeholder"
    />
  );
};

export default AvatarPlaceholder;
