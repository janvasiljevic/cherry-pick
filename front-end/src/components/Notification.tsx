import { Tag, Avatar, TagLabel, useColorModeValue } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

interface INotifProps {
  notifs: number;
}

export const NotificationBadge = ({ notifs }: INotifProps) => {
  const bg = useColorModeValue("badge.light", "badge.dark");
  const text = useColorModeValue("text.light", "text.dark");

  return (
    <Tag size="lg" borderRadius="full" m={3} backgroundColor={bg} color={text}>
      <FaBell/>
      <TagLabel paddingLeft={2} opacity={0.5}>
        {notifs}
      </TagLabel>
    </Tag>
  );
};
