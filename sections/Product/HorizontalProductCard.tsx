import type { Product } from "apps/commerce/types.ts";
import { HorizontalProductCard } from "$store/components/product/HorizontalProductCard.tsx";
import Image from "apps/website/components/Image.tsx";

interface Props {
  products?: Product[] | null;
  imageAnimate?: boolean;
  maxSize:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
}

export function ErrorFallback({ error }: { error?: Error }) {
  console.log({ error });

  return (
    <div class="container bg-gray-300 text-center items-center md:flex md:flex-row rounded p-5 mt-3 xl:max-w-5xl">
      <Image
        src="https://placehold.co/246x164"
        width={246}
        height={164}
        class="bg-gray-300 rounded mx-auto lg:mr-8 md:w-1/4 hover:scale-110"
      />
      <div class={"flex flex-col max-w-96 m-auto"}>
        <h3 class={"font-bold text-lg"}>Error</h3>
        <p>
          An error occurred. Try again later.
        </p>
        <a class={"btn"} href="/culturas">Saiba Mais</a>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div class="container bg-gray-300 items-center md:flex rounded p-5 mt-3 xl:max-w-5xl">
      <Image
        src="https://placehold.co/246x164"
        width={246}
        height={164}
        class="rounded md:w-1/4"
      />
      <p>Loading fallback</p>
    </div>
  );
}

export default function SectionHorizontalCard({
  products,
  imageAnimate = true,
  maxSize,
}: Props) {
  if (!products) return null;

  return (
    <div
      class={`flex flex-col container bg-gray-300 text-center rounded p-5 mt-3 md:flex-row xl:${maxSize}`}
      data-deco="view-product"
    >
      {products.map((product) => (
        <HorizontalProductCard product={product} imageAnimate={imageAnimate} />
      ))}
    </div>
  );
}
