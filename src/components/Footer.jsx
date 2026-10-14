function Footer() {
  return (
    // Display the current year automatically.
    <footer className="bg-white border-top">
      <div className="container py-3 text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Sjöbo Books.
        </p>
      </div>
    </footer>
  );
}

export default Footer;