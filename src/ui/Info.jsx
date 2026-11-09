function Info({ icon: Icon, label, value, image }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} className="mt-0.5 shrink-0 text-gray-400" />

      <div>
        <p className="text-xs text-gray-500">{label}</p>

        <div className="mt-1 flex items-center gap-2">
          {image && (
            <img
              src={image}
              alt=""
              className="h-4 w-6 rounded-sm object-cover"
            />
          )}

          <p className="break-all text-sm font-medium text-gray-800">
            {value || 'Not available'}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Info;
