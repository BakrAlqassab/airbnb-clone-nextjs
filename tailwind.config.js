module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
  safelist: [
    "bg-red-500", // Add any specific class names you know should be preserved
    "text-center", // Example: dynamically generated class
    "flex",
    "w-full",
    "absolute",
    "relavent",
  ],
};
