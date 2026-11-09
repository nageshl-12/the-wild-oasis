function NoActivity() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-3">🏨</span>

      <p className="font-medium text-gray-700">No activity today</p>

      <p className="text-sm text-gray-400 mt-1">
        Guest check-ins and check-outs will appear here.
      </p>
    </div>
  );
}

export default NoActivity;
