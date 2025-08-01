type SkeletonBlockProps = {
  height?: string;
  width?: string;
};

const SkeletonBlock = ({ height = 'h-6', width = 'w-full' }: SkeletonBlockProps) => (
  <div className={`bg-gray-200 rounded ${height} ${width} animate-pulse`} />
);

export const SummarySkeleton = () => (
  <div className="space-y-10 pt-2 flex px-4 flex-col items-start  h-full">
    <SkeletonBlock width="w-1/2" height="h-10" />
    <SkeletonBlock width="w-full" height="h-15" />
    <SkeletonBlock width="w-full" height="h-15" />
  </div>
);
