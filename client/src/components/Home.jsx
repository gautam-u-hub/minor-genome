import React from 'react';
import "./Home.css"
import NavBar from './Navbar';
import useAuth from './hooks/useAuth';
function Home() {
  const { username } = useAuth().auth;

  return (
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header className="mb-auto">
        <div>
          <h3 className="float-md-left mb-0">GeneZone</h3>
          <nav className="nav nav-masthead justify-content-center float-md-right">
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
            <br />

            {!username ? (
              <>
                <a className="nav-link" href="/logout">
                  Logout
                </a>
                <br />
                <a className="nav-link" href="/Main">
                  upload fasta{" "}
                </a>
                <br />
                <a className="nav-link" href="/Get">
                  Dashboard{" "}
                </a>
                <br />
                <a className="nav-link" href="/Share">
                  Share
                </a>
              </>
            ) : (
              <>
                <a className="nav-link" href="/login">
                  Login
                </a>
                <br />
                <a className="nav-link" href="/register">
                  Register
                </a>
                <br />
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="px-3">
        <h1>YelpCamp</h1>
        <p className="lead">
          Welcome to YelpCamp!
          <br />
          Jump right in and explore our many campgrounds.
          <br />
          Feel free to share some of your own and comment on others!
        </p>
        <a
          href="/campgrounds"
          className="btn btn-lg btn-secondary font-weight-bold border-white bg-white"
        >
          View Campgrounds
        </a>
      </main>
      <footer className="mt-auto text-white-50">
        <p>&copy; 2020</p>
      </footer>
    </div>
  );
}

export default Home;
