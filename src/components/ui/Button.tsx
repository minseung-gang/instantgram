type Props = {
  text: string;
  onClick: () => void;
  className: string;
  disabled?: boolean;
  isLoading?: boolean;
};
export default function Button({
  text,
  onClick,
  className,
  disabled = false,
  isLoading = false,
}: Props) {
  return (
    <button className={className} onClick={() => onClick()} disabled={disabled}>
      <span className={`${isLoading ? 'invisible' : ''}`}>{text}</span>
    </button>
  );
}
