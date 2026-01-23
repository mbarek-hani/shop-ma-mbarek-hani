function Footer() {
  return (
    <footer className="border-t mt-8 py-6">
      <div className="max-w-6xl mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Shop.ma</p>
      </div>
    </footer>
  );
}

export default Footer;