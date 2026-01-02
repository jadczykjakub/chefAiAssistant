const MaterialIcon = ({ name, className }: { name: string; className?: string }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontFamily: 'Material Symbols Outlined' }}
  >
    {name}
  </span>
);

export default MaterialIcon;
