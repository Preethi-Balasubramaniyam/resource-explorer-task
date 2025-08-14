export default function Loader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 w-full">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="border rounded p-4 shadow bg-white flex flex-col gap-2 animate-pulse h-full min-h-[220px]"
        >
          {/* Card skeleton shape */}
        </div>
      ))}
    </div>
  );
}
