type Props = {
  label?: string;
};

export default function CircularLoader({ label = "Loading" }: Props) {
  return (
    <div
      aria-label={label}
      role="status"
      className="h-10 w-10 animate-spin rounded-full border-2 border-(--border-secondary) border-t-(--accent)"
    />
  );
}
