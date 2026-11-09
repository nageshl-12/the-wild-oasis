import Heading from '../ui/Heading';
import { useSettings } from '../features/settings/useSettings';

import SettingForm from '../features/settings/SettingForm';
import Spinner from '../ui/Spinner';
import ResourceNotFound from '../ui/ResourceNotFound';

function Settings() {
  const { settings, isPending } = useSettings();
  if (isPending) return <Spinner />;
  if (!settings.length && !isPending)
    return <ResourceNotFound resource="Settings" />;
  return (
    <div className="relative animate-fade-in-up flex h-[calc(100dvh-9.625rem)] flex-col overflow-hidden bg-gray-50 px-2 md:h-dvh md:px-2">
      {/* Header - Original Position */}
      <div className="shrink-0 space-y-3 py-3">
        <Heading
          fieldName="Settings"
          count={Object.keys(settings[0]).length - 1}
        />
      </div>
      <SettingForm settings={settings[0]} />
    </div>
  );
}

export default Settings;
