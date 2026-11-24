import { socialImage, socialImageAlt, socialImageContentType, socialImageSize } from "@/components/seo/social-image";

export const alt = socialImageAlt;
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return socialImage();
}
