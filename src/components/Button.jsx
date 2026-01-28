export default function Button({ children, ...props }) {
  return (
    <button className="btn-newsletter" {...props}>
      {children}
    </button>
  );
}
