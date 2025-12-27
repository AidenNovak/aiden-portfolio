interface MetricBadgeProps {
  value: string;
  label: string;
}

export function MetricBadge({ value, label }: MetricBadgeProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg min-w-[120px]">
      <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {value}
      </span>
      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
        {label}
      </span>
    </div>
  );
}
