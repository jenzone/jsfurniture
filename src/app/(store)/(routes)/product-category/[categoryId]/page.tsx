import getProducts from '@/services/get-products';
import getCategory from '@/services/get-category';
import getBrands from '@/services/get-brands';
import getSizes from '@/services/get-sizes';
import getColors from '@/services/get-color';

import { Container } from '@/components/ui/container';
import { Banner } from '@/components/ui/banner';

import { Filter } from './components/filter';
import { FilterList } from './components/filterList';
import { MobileFilter } from './components/mobileFilter';
import { ViewFilter } from './components/view';
import { ProductList } from './components/productList';
import { Sort } from './components/sort';

interface ProductCategoryProps {
  searchParams: {
    brandId: string;
    sizeId: string;
    colorId: string;
  };
  params: {
    categoryId: string;
  };
}

export default async function ProductCategory({
  searchParams,
  params,
}: ProductCategoryProps) {
  const products = await getProducts({
    categoryId: params.categoryId,
    brandId: searchParams.brandId,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
  });

  const category = await getCategory(params.categoryId);
  const brands = await getBrands();
  const sizes = await getSizes();
  const colors = await getColors();

  return (
    <main>
      <Banner title={category.name} imageUrl={category.banner.imageUrl} />
      {/* top options mobile */}
      <div className="block overflow-y-auto lg:hidden">
        <div className="flex flex-row">
          <Sort />
          <MobileFilter
            brands={brands}
            sizes={sizes}
            colors={colors}
            products={products}
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <span>{products.length} Products</span>
          <ViewFilter />
        </div>
      </div>
      {/* top options desktop */}
      <Container>
        <div className="hidden items-center justify-between py-5 lg:flex">
          <div className="flex items-center space-x-4">
            <span>View as</span> <ViewFilter />
          </div>
          <span>{products.length} Products</span>
          <div className="flex items-center space-x-4">
            <span>SORT BY:</span> <Sort />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex space-x-4">
          {/* filter */}
          <div className="hidden min-w-[280px] pr-4 lg:block">
            <FilterList
              valueKeys={['brandId', 'sizeId', 'colorId']}
              brands={brands}
              sizes={sizes}
              colors={colors}
            />
            <Filter
              valueKey="brandId"
              name="Brands"
              data={brands}
              products={products}
            />
            <Filter
              valueKey="sizeId"
              name="Sizes"
              data={sizes}
              products={products}
            />
            <Filter
              valueKey="colorId"
              name="Colors"
              data={colors}
              products={products}
            />
          </div>
          <ProductList data={products} />
        </div>
      </Container>
    </main>
  );
}
