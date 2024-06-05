import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductVote from "$store/islands/ProductVote.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

interface Props {
  product: Product;
  imageAnimate: boolean;
}

export function HorizontalProductCard({ product, imageAnimate }: Props) {
  const { price = 0 } = useOffer(product.offers);

  const WIDTH = 200;
  const HEIGHT = 279;

  return (
    <div class="flex flex-col w-full md:flex-row mt-3 gap-4 border border-slate-200 rounded-lg px-8">
      <div class="overflow-hidden w-52 h-72 flex items-center">
        <Image
          src={product?.image?.at(0)?.url || `https://placehold.co/${WIDTH}x${HEIGHT}`}
          width={WIDTH}
          height={HEIGHT}
          class={`my-auto ${imageAnimate ? "hover:scale-125" : ""}`}
        />
      </div>

      <div class="flex-auto flex flex-col justify-center gap-3 text-left py-8">
        <h2 class="truncate text-base text-black lg:text-2xl justify-start uppercase font-bold font-mono">
          {product.name}
        </h2>
        <p class="truncate text-slate-500">
          {product.description}
        </p>
        <div class="text-lg font-bold">
          {formatPrice(price)}
        </div>
      </div>

      <div class="flex flex-col justify-between gap-4 bg-white py-8">
        <ProductVote productId={product.productID} />
        <AddToCartButtonVTEX
          eventParams={{
            items: [{
              item_url: product.url,
              quantity: 1,
              item_name: product.name!,
            }],
          }}
          productID={product.productID}
          seller={"1"}
        />
      </div>
    </div>
  );
};