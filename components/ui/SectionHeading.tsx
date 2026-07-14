type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

const alignStyles = {
  left: "items-start text-left",
  center: "items-center text-center",
};

export default function SectionHeading({
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={[
      "flex flex-col gap-2",
      alignStyles[align],
      className,
    ].filter(Boolean).join(" ")}>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
      {description ? <p className="text-sm text-gray-500 max-w-2xl">{description}</p> : null}
    </div>
  );
}