// // components/ThemeToggle.tsx
// "use client";

// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
// import { Sun, Moon, Laptop } from "lucide-react";

// export default function ThemeToggle() {
//   const { theme, setTheme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;

//   const current = theme === "system" ? resolvedTheme : theme;

//   return (
//     <div className="flex gap-2 items-center">
//       <button
//         onClick={() => setTheme("light")}
//         aria-pressed={current === "light"}
//         className={`p-2 rounded-xl ${
//           current === "light"
//             ? "bg-gray-300 dark:bg-gray-600"
//             : "bg-gray-200 dark:bg-gray-700"
//         }`}
//       >
//         <Sun className="w-5 h-5 text-yellow-500" />
//       </button>

//       <button
//         onClick={() => setTheme("dark")}
//         aria-pressed={current === "dark"}
//         className={`p-2 rounded-xl ${
//           current === "dark"
//             ? "bg-gray-300 dark:bg-gray-600"
//             : "bg-gray-200 dark:bg-gray-700"
//         }`}
//       >
//         <Moon className="w-5 h-5 text-blue-500" />
//       </button>

//       <button
//         onClick={() => setTheme("system")}
//         aria-pressed={theme === "system"}
//         className={`p-2 rounded-xl ${
//           theme === "system"
//             ? "bg-gray-300 dark:bg-gray-600"
//             : "bg-gray-200 dark:bg-gray-700"
//         }`}
//       >
//         <Laptop className="w-5 h-5 text-gray-500 dark:text-gray-300" />
//       </button>
//     </div>
//   );
// }


// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Pick what we *see* as current
  const current = theme === "system" ? resolvedTheme : theme;

  // Click handler → cycles through themes
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {theme === "system" ? (
        <Laptop className="w-5 h-5 text-gray-500 dark:text-gray-300" />
      ) : current === "light" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-500" />
      )}
    </button>
  );
}
