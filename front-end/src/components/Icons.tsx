import {
  AiOutlinePrinter as IconPrinter,
  AiOutlineMobile as IconMobile,
  AiOutlineDesktop as IconDesktop,
  AiOutlineFileText as IconOther,
} from 'react-icons/ai';

export function IconMapping(name: string) {
  if (name === 'PC') return IconDesktop;
  else if (name === 'MOBILE') return IconMobile;
  else if (name === 'OTHER') return IconOther;

  return IconPrinter;
}

export { IconPrinter, IconDesktop, IconMobile, IconOther };
