function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-8 py-6">
      <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Shop.ma</p>
      </div>
    </footer>
  );
}

export default Footer;