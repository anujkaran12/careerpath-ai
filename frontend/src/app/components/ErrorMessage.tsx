type Props = {
  message: string;
  title?: string;
  className?: string;
};

export default function ErrorMessage({
  message,
  title = "Something went wrong",
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-lg border border-(--danger) bg-(--bg-secondary) p-4 ${className}`}
      role="alert"
    >
      <p className="text-sm font-medium text-(--danger)">{title}</p>
      <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
        {message}
      </p>
    </div>
  );
}
