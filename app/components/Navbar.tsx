import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to = "/">
      <p className="text-2xl font-bold text-gradient">CAREERLYTIC</p>
      </Link>
      <Link to = "/upload" className="hidden sm:flex primary-button w-fit">
      Upload Resume
      </Link>
      <Link to = "/upload" className="sm:hidden primary-button w-fit">
      <img src="/icons/add.svg" alt="logo" className="size-6" />
      </Link>
    </nav>
  )
}

export default Navbar