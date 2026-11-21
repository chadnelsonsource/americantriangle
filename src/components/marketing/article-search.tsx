import { Button } from "@/components/ui/button";
import { fieldControl } from "@/components/ui/fields";

export function ArticleSearch({ id, defaultValue }: { id: string; defaultValue?: string }) {
  return (
    <form action="/insights/search" className="grid max-w-xl gap-2">
      <label className="text-sm font-medium" htmlFor={id}>
        Search articles
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input id={id} name="q" type="search" defaultValue={defaultValue} placeholder="Published titles" className={fieldControl} />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </div>
    </form>
  );
}
