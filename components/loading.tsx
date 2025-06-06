

export default function Loading() {
  return (
    /* From Uiverse.io by devAaus */
    <div className="flex-col gap-4 w-full flex items-center justify-center min-h-[60vh]">
      <div className="w-20 h-20 border-4 border-transparent text-black text-4xl animate-spin flex items-center justify-center border-t-black rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-black text-2xl animate-spin flex items-center justify-center border-t-black rounded-full"></div>
      </div>
    </div>
  );
}
