import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const SizeAvatar = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar size="sm">
        <AvatarImage  src="" alt="dashcode" />
        <AvatarFallback> PR </AvatarFallback>
      </Avatar>
      <Avatar size="base" color="primary">
        <AvatarImage  src="" alt="dashcode" />
        <AvatarFallback> LI </AvatarFallback>
      </Avatar>
      <Avatar size="md" color="success">
        <AvatarImage  src="" alt="dashcode" />
        <AvatarFallback> SU </AvatarFallback>
      </Avatar>
      <Avatar size="lg" color="info">
        <AvatarImage  src="" alt="dashcode" />
        <AvatarFallback> PR </AvatarFallback>
      </Avatar>
      <Avatar size="xl" color="warning">
        <AvatarImage  src="" alt="dashcode" />
        <AvatarFallback> SR </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default SizeAvatar;