import { useContext, useState } from 'react';

import { SettingsContext } from '../../contexts/settings/settings.context';

const themes = [
  'light',
  'dark',
  'cupcake',
  'synthwave',
  'retro',
  'valentine',
  'halloween',
  'lofi',
  'wireframe',
  'luxury',
  'dracula',
  'night',
  'winter',
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
      className="select-primary select max-w-xs select-none"
    >
      {themes.map((theme) => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

export { ThemeSelector };
