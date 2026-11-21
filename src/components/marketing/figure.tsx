import Image from "next/image";

export function EditorialFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  if (!src.startsWith("/images/")) {
    throw new Error("Editorial images must be files under /images.");
  }
  return (
    <figure>
      <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-line">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 72rem) 72rem, calc(100vw - 3rem)" loading="lazy" />
      </div>
      <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted">{caption}</figcaption>
    </figure>
  );
}
