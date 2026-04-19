import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const RoundedAvatar = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar rounded="sm"  color="primary">
        <AvatarImage src="" alt="dashcode" />
        <AvatarFallback> LI </AvatarFallback>
      </Avatar>
      <Avatar rounded="md"  >
        <AvatarImage src="" alt="dashcode" />
        <AvatarFallback> PR </AvatarFallback>
      </Avatar>
      <Avatar rounded="lg"  color="secondary">
        <AvatarImage src="" alt="dashcode" />
        <AvatarFallback> SH </AvatarFallback>
      </Avatar>
      <Avatar rounded="full"  color="success">
        <AvatarImage src="" alt="avatar image" />
        <AvatarFallback> SU </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default RoundedAvatar;