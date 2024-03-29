import Image from 'next/image';
import Link from 'next/link';

import { MainNav } from '@/components/mainNav';
import { UtilityNav } from '@/components/utilityNav';
import { MenuBar } from '@/components/menuBar';

import getCategories from '@/services/get-categories';
import getProducts from '@/services/get-products';

export const NavBar = async () => {
  const categories = await getCategories();
  const products = await getProducts({});

  return (
    <div className="flex h-[90px] w-full flex-row items-center justify-between border-b px-4 lg:px-10">
      <MenuBar data={categories} />
      <Link href="/">
        <Image
          alt="logo"
          width={190}
          height={56}
          src="/logo.svg"
          className="h-auto w-auto"
        />
      </Link>
      <MainNav data={categories} />
      <UtilityNav data={products} />
    </div>
  );
};
