import { cn } from "@/lib/utils";

type ContentHeaderProps = {
  title: string;
  description: string;
};

export default function ContentHeader({
  title,
  description,
}: ContentHeaderProps) {
  return (
    <div>
      <h1
        className={cn(
          "mb-4 text-4xl font-bold md:text-5xl",
          "text-heading font-serif",
          "transition-all duration-300",
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          "text-lg md:text-xl",
          "text-blockquote",
          "transition-all duration-300",
        )}
      >
        {description}
      </p>
    </div>
  );
}
