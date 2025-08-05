type SkeletonBlockProps = {
  height?: string;
  width?: string;
  className?: string;
};

const SkeletonBlock = ({
  height = 'h-6',
  width = 'w-full',
  className = '',
}: SkeletonBlockProps) => (
  <div className={`bg-gray-200 rounded animate-pulse ${height} ${width} ${className}`} />
);

export const SummarySkeleton = () => {
  const blocks = [
    { width: 'w-1/2', height: 'h-10' },
    { width: 'w-full', height: 'h-15' },
    { width: 'w-full', height: 'h-15' },
  ];

  return (
    <div className="space-y-10 pt-2 px-4 flex flex-col items-start h-full">
      {blocks.map((block, index) => (
        <SkeletonBlock key={index} {...block} />
      ))}
    </div>
  );
};
