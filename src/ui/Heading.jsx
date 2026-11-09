function Heading({ count, fieldName, validate = 'false' }) {
  return (
    <div className="md:mb-6 mb-2 flex items-center justify-between">
      <div className="mx-2">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 ">
          {validate && 'All'} {fieldName}
        </h1>
        {validate && (
          <p className="mt-1 text-sm text-gray-500 hidden md:block">
            Manage your {fieldName} and availability
          </p>
        )}
      </div>
      {validate && (
        <span className="rounded-full  px-3 py-1 text-sm font-medium text-gray-700">
          Total {count} {fieldName}
        </span>
      )}
    </div>
  );
}

export default Heading;
