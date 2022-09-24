export default function Footer() {
    const dataYear = new Date().getFullYear();
    return (
      <footer className="footer">
        <p className="footer__copyright">&copy; {dataYear}. Гуляев Серёжа</p>
      </footer>
    )
}
