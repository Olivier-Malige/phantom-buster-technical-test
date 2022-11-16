type FilterButtonProps = {
  isActive: boolean;
  name: string;
  onClick: (name: string, isActive: boolean) => void;
};

const FilterButton = ({ name, isActive, onClick }: FilterButtonProps) => (
  <button
    className={`flex select-none gap-2 text-base ${
      isActive ? 'font-bold' : 'font-normal'
    }`}
    onClick={() => onClick(name, isActive)}
  >
    <span>{name}</span>
    {isActive && (
      <input
        type="checkbox"
        defaultChecked
        className="checkbox-primary checkbox checkbox-xs self-center "
      />
    )}
  </button>
);

export { FilterButton };
