function Header({ title, subtitle, darkMode }) {
  return (
    <header className="mb-6">
      <h1
        className={`text-3xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h1>

      <p
        className={`mt-2 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {subtitle}
      </p>
    </header>
  );
}

export default Header;