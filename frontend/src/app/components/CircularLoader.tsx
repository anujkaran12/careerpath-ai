type Props = {
  label?: string;
};

export default function CircularLoader({ label = "Loading" }: Props) {
  return (
    <div className="flex min-h-[220px] items-center justify-center">
      <div
        aria-label={label}
        role="status"
        className="h-10 w-10 animate-spin rounded-full border-2 border-(--border-secondary) border-t-(--accent)"
      />
    </div>
  );
}
