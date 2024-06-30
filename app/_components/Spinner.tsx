type loading = {
  loading: boolean;
};

export default function SpinnerOverlay({ loading }: loading) {
  if (!loading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-600 to-transparent animate-spin"
        style={{
          maskImage:
            "radial-gradient(farthest-side,transparent calc(100% - 10px),black 0)",
          WebkitMaskImage:
            "radial-gradient(farthest-side,transparent calc(100% - 10px),black 0)",
          backgroundImage:
            "radial-gradient(farthest-side, #14b8a6 94%, transparent) top/10px 10px no-repeat, conic-gradient(transparent 30%, #14b8a6)",
        }}
      ></div>
    </div>
  );
}
