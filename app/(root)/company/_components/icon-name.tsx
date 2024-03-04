"use client"

import { Icon } from '@iconify/react';

export const IconName = ({ name }: { name: string }) => {
  return (
    <Icon icon={name} width="24" height="24" />
  )
}
