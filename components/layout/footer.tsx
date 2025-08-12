export function Footer() {
  return (
    <footer className="bg-background py-12 text-center text-sm text-muted">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} Pronto Software LLC. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
