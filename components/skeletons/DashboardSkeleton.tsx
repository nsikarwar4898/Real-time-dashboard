type SkeletonBlockProps = {
  height?: string;
  width?: string;
};

const SkeletonBlock = ({ height = 'h-6', width = 'w-full' }: SkeletonBlockProps) => (
  <div className={`bg-gray-200 rounded ${height} ${width} animate-pulse`} />
);

export const SummarySkeleton = () => (
  <div className="space-y-2 ">
    <SkeletonBlock width="w-1/2" height="h-5" />
    <SkeletonBlock width="w-full" height="h-10" />
    <SkeletonBlock width="w-full" height="h-10" />
  </div>
);
