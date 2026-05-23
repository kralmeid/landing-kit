export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div
        className="w-10 h-10 border-2 border-black border-t-transparent animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
