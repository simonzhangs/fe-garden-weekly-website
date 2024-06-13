import clsx from 'clsx';

type Color = "pink" | "blue" | "green" | "yellow";

const colorConfigs: Record<Color, { theme: string; variant: string }> = {
  blue: { theme: "theme-blue", variant: 'bg-theme-blue' },
  pink: { theme: "theme-pink", variant: 'bg-theme-pink' },
  green: { theme: "theme-green", variant: 'bg-theme-green' },
  yellow: { theme: "theme-yellow", variant: 'bg-theme-yellow' },
};

export function ColorCircles() {
  const handleThemeChange = (theme: string) => {
    document.documentElement.className = theme;
  };

  return (
    <div className="flex space-x-4">
      {(Object.keys(colorConfigs) as Color[]).map((color) => (
        <button
          key={color}
          className={clsx('w-6 h-6 rounded-full', `${colorConfigs[color].variant}`)}
          onClick={() => handleThemeChange(colorConfigs[color].theme)}
        />
      ))}
    </div>
  );
}
