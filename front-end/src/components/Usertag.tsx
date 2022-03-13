import { Tag, Avatar, TagLabel } from '@chakra-ui/react';
import React from 'react';

export const UserTag = () => {
  return (
    <Tag size="lg" colorScheme="green" borderRadius="full" m={3}>
      <TagLabel>Segun</TagLabel>
    </Tag>
  );
};
