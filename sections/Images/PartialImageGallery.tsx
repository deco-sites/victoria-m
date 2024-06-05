import { ImageWidget } from "apps/admin/widgets.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import Image from "apps/website/components/Image.tsx";

interface Image {
  src: ImageWidget;
  alt?: string;
}

export interface Props {
  /** @description Título da sessão */
  title?: string;
  /** @description Ao menos 3 imagens */
  images: Image[];
  page: number;
  /** @description Botão "mostrar mais" */
  showMoreButton: {
    icon?: AvailableIcons;
    text?: string;
  };
}

export function ErrorFallback({ error }: { error?: Error }) {
  return (
    <PartialImageGallery
      title="My partial image gallery"
      images={[
        { src: "https://placehold.co/334x200?", alt: "my placehold image" },
        { src: "https://placehold.co/334x200?", alt: "my placehold image" },
        { src: "https://placehold.co/334x200?", alt: "my placehold image" },
      ]}
      page={1}
      showMoreButton={{
        icon: "Plus-circle",
        text: "",
      }}
    />
  );
}

export default function PartialImageGallery({
  title,
  images,
  showMoreButton,
  page = 1,
}: Props) {
  const shownImages = images.slice(0, page * 3);

  if (images.length < 3) {
    throw new Error("Not enough elements");
  }

  return (
    <section class="p-4 mx-auto flex flex-col gap-4 max-w-screen-xl items-center">
      {title && (
        <h2 class="text-lg font-bold text-black border-b mb-4 w-full text-center">
          {title}
        </h2>
      )}

      <ul class="flex flex-wrap justify-center gap-2 mb-2">
        {shownImages.map((pageImages: Image) => (
          <li class="w-full md:max-w-80">
            <Image
              class="w-full h-auto rounded-md hover:scale-125 transition-all hover:shadow-md cursor-pointer object-cover"
              width={334}
              height={200}
              src={pageImages.src}
              alt={pageImages.alt}
            />
          </li>
        ))}
      </ul>

      {Math.ceil(images.length / 3) > page && (
        <button
          class="flex gap-1 py-2 justify-center w-full md:w-96 bg-slate-100 rounded-md text-gray-500"
          {...usePartialSection({ props: { page: page + 1 } })}
        >
          {showMoreButton.text && <span>{showMoreButton.text}</span>}
          {showMoreButton.icon && (
            <span>{<Icon id={showMoreButton.icon || "Plus"} size={20} />}</span>
          )}
        </button>
      )}
    </section>
  );
}
