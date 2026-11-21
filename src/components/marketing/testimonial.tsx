export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/** Published only when a real person has approved the words. This list is empty on purpose. */
export const publishedTestimonials: readonly Testimonial[] = [];

export function TestimonialList({ items }: { items: readonly Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li key={`${item.name}-${item.quote}`} className="surface p-6">
          <blockquote className="text-lg leading-7">“{item.quote}”</blockquote>
          <p className="mt-4 text-sm text-muted">
            {item.name}, {item.role}
          </p>
        </li>
      ))}
    </ul>
  );
}
