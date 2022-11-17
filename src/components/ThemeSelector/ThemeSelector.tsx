import { useContext, useState } from 'react';

import { SettingsContext } from '../../contexts/settings/settings.context';

const themes = [
  'light',
  'dark',
  'synthwave',
  'retro',
  'valentine',
  'luxury',
  'dracula',
  'night',
];

const ThemeSelector = () => {
  const settingsContext = useContext(SettingsContext);
  const [selectedTheme, setSelectedTheme] = useState(
    settingsContext?.selectedTheme
  );

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheme(event.target.value);
    settingsContext?.dispatchChangeTheme(event.target.value);
  };
  return (
    <select
      value={selectedTheme}
      onChange={handleThemeChange}
      className="select-bordered select-accent select select-sm max-w-xs select-none font-medium capitalize  "
    >
      {themes.map((theme) => (
        <option className="font-medium " key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

export { ThemeSelector };
