import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const AvatarShape = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar shape="circle"  color="primary">
        <AvatarImage src="" alt="dashcode" />
        <AvatarFallback> LI </AvatarFallback>
      </Avatar>
      <Avatar shape="square" >
        <AvatarImage src="" alt="dashcode" />
        <AvatarFallback> PR </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarShape;