const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <footer className="footer">
        <p className="footer_p">&copy;{` ${year} designed by Ahmad Yusuf`}</p>
    </footer>
  )
}

export default Footer
